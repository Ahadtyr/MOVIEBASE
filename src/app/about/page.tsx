import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';

export default function AboutPage() {
  return (
    <PageContainer>
      <SectionTitle>About MOVIEBASE</SectionTitle>
      <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
        <p>
          Welcome to MOVIEBASE, your ultimate destination for discovering and exploring movies and TV shows. 
          Our mission is to provide a comprehensive and engaging platform for film enthusiasts and casual viewers alike.
        </p>
        <p>
          At MOVIEBASE, you can browse through an extensive library of titles, get detailed information,
          watch trailers, read synopses, and explore cast lists. We feature curated sections for trending content,
          new releases, and top-rated classics to help you find what to watch next.
        </p>
        <p>
          Leveraging the power of cutting-edge AI, MOVIEBASE also offers personalized recommendations. 
          Simply tell us about your viewing history, and our AI will suggest movies and shows tailored to your unique taste.
        </p>
        <p>
          Our platform is designed with a sleek, modern, and cinematic feel, ensuring an immersive user experience. 
          We are constantly updating our database and features to make MOVIEBASE the go-to source for all things cinema.
        </p>
        <p>
          Thank you for choosing MOVIEBASE. Happy watching!
        </p>
      </div>
    </PageContainer>
  );
}
