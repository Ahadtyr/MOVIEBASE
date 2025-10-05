import Link from 'next/link';
import { Film } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
          <div className="flex items-center space-x-2">
            <Film className="h-7 w-7 text-primary-foreground neon-glow-primary" />
            <span className="font-headline text-xl font-bold text-primary-foreground neon-glow-primary">MOVIEBASE</span>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; {currentYear} MOVIEBASE. All rights reserved.</p>
            <p>Created by Ahad Tyr</p>
          </div>
          <div className="flex space-x-4">
            <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
