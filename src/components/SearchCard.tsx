
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const SearchCard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    // This will be connected to actual search functionality later
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-2 border-kenya-green/20">
      <CardHeader className="text-center bg-gradient-to-r from-kenya-green/10 to-kenya-red/10">
        <CardTitle className="text-2xl font-bold text-kenya-black">
          Search for Your Lost ID
        </CardTitle>
        <p className="text-gray-600">
          Enter your ID number to check if it has been found
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Enter ID Number (e.g., 12345678)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-kenya-green"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          <Button 
            type="submit" 
            className="w-full h-12 bg-kenya-red hover:bg-kenya-red/90 text-white text-lg font-semibold"
            disabled={!searchTerm.trim()}
          >
            Search Now - KSH 500
          </Button>
        </form>
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Search Fee:</strong> KSH 500 will be charged for each search. 
            KSH 300 goes to the person who found your ID, KSH 200 for platform maintenance.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchCard;
