'use client';

import { useState } from 'react';
import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import { Input } from '@/components/ui/input';
import { COUNTRIES } from '@/lib/countries';
import Link from 'next/link';
import { Globe, Search } from 'lucide-react';

export default function ByCountryPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const sortedCountries = COUNTRIES.sort((a, b) => a.english_name.localeCompare(b.english_name));

  const filteredCountries = sortedCountries.filter(country =>
    country.english_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.native_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageContainer>
      <SectionTitle>Browse by Country</SectionTitle>
      <p className="mb-8 text-muted-foreground">Select a country to discover popular movies and TV shows from that region.</p>
      
      <div className="relative mb-8 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredCountries.map(country => (
          <Link
            key={country.iso_3166_1}
            href={`/country/${country.iso_3166_1}/movies`}
            className="group flex items-center gap-3 p-4 rounded-lg bg-card hover:bg-primary/20 transition-all duration-300 ease-in-out shadow-lg hover:shadow-accent/30 transform hover:scale-105"
          >
            <Globe className="w-6 h-6 text-primary group-hover:text-accent transition-colors neon-glow" />
            <div className="flex-1">
              <h3 className="font-semibold text-primary-foreground group-hover:text-accent transition-colors">{country.english_name}</h3>
              <p className="text-xs text-muted-foreground">{country.native_name}</p>
            </div>
          </Link>
        ))}
      </div>
      {filteredCountries.length === 0 && (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">No countries found for "{searchTerm}".</p>
        </div>
      )}
    </PageContainer>
  );
}
