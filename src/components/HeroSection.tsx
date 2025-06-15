
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-br from-kenya-green/10 to-kenya-red/10 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-kenya-black mb-6">
            Lost Your <span className="text-kenya-red">Kenyan ID</span>?
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Join thousands of Kenyans helping each other recover lost identification cards. 
            Post found IDs and search for your lost documents in our secure community platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-kenya-red hover:bg-kenya-red/90 text-white px-8 py-3 text-lg"
              onClick={() => navigate('/search')}
            >
              Search for My ID
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-kenya-green text-kenya-green hover:bg-kenya-green hover:text-white px-8 py-3 text-lg"
              onClick={() => navigate('/post-id')}
            >
              Post Found ID
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <Card className="border-2 border-kenya-green/20 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-kenya-green rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-kenya-black mb-3">Find Lost IDs</h3>
              <p className="text-gray-600">
                Search our database of found identification cards using your ID number.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-kenya-red/20 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-kenya-red rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-kenya-black mb-3">Post Found IDs</h3>
              <p className="text-gray-600">
                Help others by posting details of identification cards you've found.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-kenya-black/20 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-kenya-black rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-kenya-black mb-3">Get Rewarded</h3>
              <p className="text-gray-600">
                Earn KSH 300 for every successful ID recovery you facilitate.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
