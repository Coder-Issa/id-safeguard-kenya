
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchCard from '@/components/SearchCard';

const Search = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gradient-to-br from-kenya-green/5 to-kenya-red/5 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-kenya-black mb-4">
              Search for Your Lost ID
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Enter your ID number below to check if someone has found and posted your identification card
            </p>
          </div>

          <SearchCard />
          
          <div className="mt-12 bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-kenya-black mb-6 text-center">
              How Search Works
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-kenya-red rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Enter ID Number</h3>
                <p className="text-gray-600">Type your complete Kenyan ID number in the search box above</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-kenya-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Pay Search Fee</h3>
                <p className="text-gray-600">KSH 500 fee - KSH 300 to finder, KSH 200 for platform maintenance</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-kenya-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Get Results</h3>
                <p className="text-gray-600">If found, get contact details to recover your ID card</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Search;
