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

const RecommendMovieInputSchema = z.object({
  viewingHistory: z
    .string()
    .describe('The viewing history of the user as a string.'),
});
export type RecommendMovieInput = z.infer<typeof RecommendMovieInputSchema>;

const RecommendMovieOutputSchema = z.object({
  movieRecommendation: z
    .string()
    .describe('The recommended movie based on the viewing history.'),
  reason: z
    .string()
    .describe('The reason for recommending the movie.'),
});
export type RecommendMovieOutput = z.infer<typeof RecommendMovieOutputSchema>;

export async function recommendMovie(input: RecommendMovieInput): Promise<RecommendMovieOutput> {
  return recommendMovieFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendMoviePrompt',
  input: {schema: RecommendMovieInputSchema},
  output: {schema: RecommendMovieOutputSchema},
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
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
