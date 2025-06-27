'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Wand2 } from 'lucide-react';
import { recommendMovie, type RecommendMovieOutput } from '@/ai/flows/recommend-movie';
import { useToast } from '@/hooks/use-toast';
import MovieCard from '@/components/movie/MovieCard';
import type { Movie, TVShow } from '@/lib/types';

const FormSchema = z.object({
  viewingHistory: z.string().min(10, { message: 'Please describe your viewing history (at least 10 characters).' }),
});

type FormData = z.infer<typeof FormSchema>;

export default function RecommendationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<RecommendMovieOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      viewingHistory: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setRecommendation(null);
    try {
      const result = await recommendMovie({ viewingHistory: data.viewingHistory });
      setRecommendation(result);
    } catch (error) {
      console.error('Error getting recommendation:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to get recommendation. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl shadow-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl font-headline">
          <Wand2 className="w-7 h-7 mr-2 text-primary neon-glow-primary" />
          AI Movie Recommender
        </CardTitle>
        <CardDescription>
          Tell us about movies you've enjoyed, and our AI will suggest something new for you!
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="viewingHistory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="viewingHistory" className="text-base">Your Viewing History</FormLabel>
                  <FormControl>
                    <Textarea
                      id="viewingHistory"
                      placeholder="e.g., I loved The Matrix, Blade Runner, and interstellar. I enjoy sci-fi movies with complex plots and philosophical themes..."
                      className="min-h-[120px] resize-none focus:ring-accent"
                      {...field}
                      aria-describedby="viewingHistory-description"
                    />
                  </FormControl>
                  <p id="viewingHistory-description" className="text-xs text-muted-foreground">
                    The more details you provide, the better the recommendation!
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Getting Recommendation...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-5 w-5" />
                  Recommend Me a Movie
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>

      {recommendation && !isLoading && (
        <Card className="mt-8 bg-card border-primary/50 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl font-headline text-primary">AI Recommendation:</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendation.recommendation ? (
              <div className="w-full sm:w-1/2 md:w-2/5 mx-auto">
                 <MovieCard item={recommendation.recommendation as Movie | TVShow} />
              </div>
            ) : (
              <p className="text-2xl font-semibold text-accent text-center">{recommendation.movieTitleFromAI}</p>
            )}

            <div>
              <p className="font-medium text-muted-foreground mb-1 text-center mt-4">Reason:</p>
              <p className="text-foreground/90 whitespace-pre-line text-center">{recommendation.reason}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </Card>
  );
}
