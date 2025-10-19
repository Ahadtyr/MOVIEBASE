'use server';

/**
 * @fileOverview AI-powered movie recommendation based on viewing history.
 *
 * - recommendMovie - A function that recommends a movie based on user viewing history.
 * - RecommendMovieInput - The input type for the recommendMovie function.
 * - RecommendMovieOutput - The return type for the recommendMovie function.
 */
import { config } from 'dotenv';
config();

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
  movieRecommendation: z
    .string()
    .describe('The title of the recommended movie.'),
  reason: z
    .string()
    .describe('The reason for recommending this movie.'),
});

// This schema is compatible with the Movie | TVShow types from lib/types.ts
const RecommendedItemSchema = z.object({
  id: z.number(),
  title: z.string(),
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
  recommendation: RecommendedItemSchema.nullable().describe("The full movie object from TMDb, or null if not found."),
  reason: z.string().describe('The reason for recommending the movie.'),
  movieTitleFromAI: z.string().describe("The raw movie title recommended by the AI."),
});
export type RecommendMovieOutput = z.infer<typeof RecommendMovieOutputSchema>;


export async function recommendMovie(input: RecommendMovieInput): Promise<RecommendMovieOutput> {
  return recommendMovieFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendMoviePrompt',
  input: {schema: RecommendMovieInputSchema},
  output: {schema: PromptOutputSchema},
  prompt: `You are a movie expert. Based on the provided viewing history, recommend a movie and explain the reason for the recommendation.

Viewing History: {{{viewingHistory}}}

Recommendation (Movie Recommendation and the Reason for Recommendation):
`,
});

const recommendMovieFlow = ai.defineFlow(
  {
    name: 'recommendMovieFlow',
    inputSchema: RecommendMovieInputSchema,
    outputSchema: RecommendMovieOutputSchema,
  },
  async (input) => {
    // Step 1: Get the text-based recommendation from the AI
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to get recommendation from AI model.');
    }
    
    const { movieRecommendation, reason } = output;

    // Step 2: Search for the recommended movie on TMDb to get its details
    const searchResults = await searchMulti(movieRecommendation);
    const topResult = searchResults.length > 0 ? searchResults[0] : null;

    // Step 3: Return the structured data
    return {
      recommendation: topResult,
      reason,
      movieTitleFromAI: movieRecommendation,
    };
  }
);
