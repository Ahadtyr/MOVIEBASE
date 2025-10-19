'use server';

/**
 * @fileOverview AI-powered movie recommendation based on viewing history.
 *
 * - recommendMovie - A function that recommends a movie based on user viewing history.
 * - RecommendMovieInput - The input type for the recommendMovie function.
 * - RecommendMovieOutput - The return type for the recommendMovie function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { searchMulti } from '@/lib/tmdb';
import type { Movie, TVShow } from '@/lib/types';

const RecommendMovieInputSchema = z.object({
  viewingHistory: z
    .string()
    .describe('The viewing history of the user as a string.'),
});
export type RecommendMovieInput = z.infer<typeof RecommendMovieInputSchema>;

const PromptOutputSchema = z.object({
  title: z
    .string()
    .describe('The title of a real, officially released movie or TV show to recommend.'),
  reason: z
    .string()
    .describe('A brief explanation of why this movie/show is being recommended based on the viewing history.'),
});

const RecommendedItemSchema = z.object({
  id: z.number(),
  title: z.string().optional(),
  name: z.string().optional(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  overview: z.string(),
  vote_average: z.number(),
  release_date: z.string().optional(),
  first_air_date: z.string().optional(),
  genres: z.array(z.object({id: z.number(), name: z.string()})).optional(),
});

const RecommendMovieOutputSchema = z.object({
  recommendation: RecommendedItemSchema.nullable().describe("The full movie/TV show object from TMDb, or null if not found."),
  reason: z.string().describe('The reason for recommending the movie/show.'),
  movieTitleFromAI: z.string().describe("A fallback title in case no movie/show is found."),
});
export type RecommendMovieOutput = z.infer<typeof RecommendMovieOutputSchema>;


export async function recommendMovie(input: RecommendMovieInput): Promise<RecommendMovieOutput> {
  return recommendMovieFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendMoviePrompt',
  input: {schema: RecommendMovieInputSchema},
  output: {schema: PromptOutputSchema},
  prompt: `You are an AI movie recommendation system. Your goal is to recommend a single, real movie or TV show that has been officially released. Do not recommend unreleased, canceled, or in-development projects.

When recommending, you MUST provide:
1. The exact title of the movie or TV show.
2. A brief, engaging reason (1-2 sentences) explaining why the user might like it, based on their history.

User's Viewing History:
"{{{viewingHistory}}}"

Based on this history, provide a recommendation.
`,
});

const recommendMovieFlow = ai.defineFlow(
  {
    name: 'recommendMovieFlow',
    inputSchema: RecommendMovieInputSchema,
    outputSchema: RecommendMovieOutputSchema,
  },
  async (input) => {
    // Step 1: Get a movie title and reason from the AI
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to get recommendation from AI model.');
    }
    
    const { title, reason } = output;

    // Step 2: Search for that exact title on TMDb
    const searchResults = await searchMulti(title);
    
    // Step 3: Pick the most relevant result (usually the first one with a poster)
    const topResult = searchResults.find(r => r.poster_path) || (searchResults.length > 0 ? searchResults[0] : null);
    
    const finalResult = topResult ? {
        ...topResult,
        title: 'title' in topResult ? topResult.title : topResult.name,
    } : null;

    // Step 4: Return the structured data in the correct format
    return {
      recommendation: finalResult,
      reason,
      movieTitleFromAI: title, // Return the AI's original title suggestion
    };
  }
);
