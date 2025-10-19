
'use client';

import Link from 'next/link';
import { Film, Tv, LayoutGrid, Search, Menu, X, ChevronDown, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navLinks = [
  { href: '/', label: 'Home', icon: Film },
  { href: '/movies', label: 'Movies', icon: Film },
  { href: '/tv-shows', label: 'TV Shows', icon: Tv },
];

const browseLinks = [
    { href: '/browse/bollywood', label: 'Bollywood' },
    { href: '/browse/hollywood', label: 'Hollywood' },
    { href: '/browse/anime', label: 'Anime' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const NavLinkItem = ({ href, label, icon: Icon }: { href: string; label: string; icon: React.ElementType; }) => (
    <Link
      href={href}
      className={cn(
        "px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground flex items-center gap-2",
        pathname === href ? "bg-primary text-primary-foreground" : "text-foreground/80"
      )}
      aria-current={pathname === href ? "page" : undefined}
    >
      <Icon className="w-4 h-4 neon-glow" />
      {label}
    </Link>
  );
  
  const BrowseDropdown = () => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground flex items-center gap-2 text-foreground/80">
                <Globe className="w-4 h-4 neon-glow" />
                Browse
                <ChevronDown className="w-4 h-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-border/40 bg-popover/80 backdrop-blur-xl">
            {browseLinks.map((link) => (
                 <DropdownMenuItem key={link.href} asChild>
                    <Link href={link.href} className={cn("flex items-center gap-2", pathname === link.href ? "bg-primary/10" : "")}>
                        {link.label}
                    </Link>
                </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <header className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" : "bg-transparent"
    )}>
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <Film className="h-8 w-8 text-primary-foreground neon-glow-primary" />
          <span className="font-headline text-2xl font-bold text-primary-foreground neon-glow-primary">MOVIEBASE</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <NavLinkItem key={link.href} {...link} />
          ))}
          <BrowseDropdown />
          <NavLinkItem href="/genres" label="Genres" icon={LayoutGrid} />
          <NavLinkItem href="/search-page" label="Search" icon={Search} />
          <NavLinkItem href="/recommendations" label="AI Recommends" icon={LayoutGrid} />

        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <BrowseDropdown />
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background shadow-lg p-4 animate-fade-in">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <NavLinkItem key={link.href} {...link} />
            ))}
             <div className="border-t border-border/50 my-2"></div>
            <NavLinkItem href="/genres" label="Genres" icon={LayoutGrid} />
            <NavLinkItem href="/search-page" label="Search" icon={Search} />
            <NavLinkItem href="/recommendations" label="AI Recommends" icon={LayoutGrid} />
          </nav>
        </div>
      )}
    </header>
  );
}
