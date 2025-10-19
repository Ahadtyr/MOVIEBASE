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
import { getDiscoverMoviesByParams } from '@/lib/tmdb';
import type { Movie, TVShow } from '@/lib/types';

const RecommendMovieInputSchema = z.object({
  viewingHistory: z
    .string()
    .describe('The viewing history of the user as a string.'),
});
export type RecommendMovieInput = z.infer<typeof RecommendMovieInputSchema>;

const PromptOutputSchema = z.object({
  keywords: z
    .string()
    .describe('A comma-separated list of 1-3 keywords or genres based on the user\'s viewing history (e.g., "sci-fi, action, thriller").'),
  reason: z
    .string()
    .describe('A brief explanation of why movies with these keywords are being recommended.'),
});

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
  movieTitleFromAI: z.string().describe("A fallback title in case no movie is found."),
});
export type RecommendMovieOutput = z.infer<typeof RecommendMovieOutputSchema>;


export async function recommendMovie(input: RecommendMovieInput): Promise<RecommendMovieOutput> {
  return recommendMovieFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendMoviePrompt',
  input: {schema: RecommendMovieInputSchema},
  output: {schema: PromptOutputSchema},
  prompt: `You are a movie expert. Analyze the user's viewing history and extract key themes, genres, or actors. 
  
Viewing History: {{{viewingHistory}}}

Based on this, provide a comma-separated list of 1-3 keywords or genres that would be good for finding similar movies. Also, provide a brief reason for your choices.`,
});

const recommendMovieFlow = ai.defineFlow(
  {
    name: 'recommendMovieFlow',
    inputSchema: RecommendMovieInputSchema,
    outputSchema: RecommendMovieOutputSchema,
  },
  async (input) => {
    // Step 1: Get keywords and reason from the AI
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to get recommendation keywords from AI model.');
    }
    
    const { keywords, reason } = output;

    // Step 2: Use keywords to discover movies on TMDb
    const searchResults = await getDiscoverMoviesByParams({ with_keywords: keywords });
    const topResult = searchResults.length > 0 ? searchResults[0] : null;

    // Step 3: Return the structured data
    return {
      recommendation: topResult,
      reason,
      movieTitleFromAI: topResult ? topResult.title : `A movie with themes like: ${keywords}`,
    };
  }
);
