
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import SearchCard from '@/components/SearchCard';
import StatsSection from '@/components/StatsSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <HeroSection />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-kenya-black mb-4">
              Quick Search
            </h2>
            <p className="text-gray-600 text-lg">
              Start your search right here - it only takes a minute
            </p>
          </div>
          <SearchCard />
        </div>
      </section>

      <StatsSection />
      <Footer />
    </div>
  );
};

export default Index;
