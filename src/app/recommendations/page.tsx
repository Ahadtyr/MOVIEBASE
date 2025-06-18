import RecommendationForm from '@/components/ai/RecommendationForm';
import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';

export default function RecommendationsPage() {
  return (
    <PageContainer>
      <div className="py-8 text-center">
        <SectionTitle className="mb-4">Get a Personalized Movie Recommendation</SectionTitle>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-10">
          Discover your next favorite movie with our intelligent AI. Just share some of your past preferences,
          and we&apos;ll find a hidden gem or a blockbuster hit tailored to your taste.
        </p>
      </div>
      <RecommendationForm />
    </PageContainer>
  );
}
