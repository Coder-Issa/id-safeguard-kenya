
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const StatsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-kenya-black mb-4">
            Making a Difference Together
          </h2>
          <p className="text-gray-600 text-lg">
            See how our community is helping Kenyans recover their lost identification
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <Card className="text-center bg-gradient-to-br from-kenya-green/10 to-kenya-green/5">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-kenya-green mb-2">1,247</div>
              <div className="text-gray-600">IDs Posted</div>
            </CardContent>
          </Card>

          <Card className="text-center bg-gradient-to-br from-kenya-red/10 to-kenya-red/5">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-kenya-red mb-2">892</div>
              <div className="text-gray-600">Successful Matches</div>
            </CardContent>
          </Card>

          <Card className="text-center bg-gradient-to-br from-kenya-black/10 to-kenya-black/5">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-kenya-black mb-2">5,630</div>
              <div className="text-gray-600">Registered Users</div>
            </CardContent>
          </Card>

          <Card className="text-center bg-gradient-to-br from-yellow-500/10 to-yellow-500/5">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-yellow-600 mb-2">KSH 267K</div>
              <div className="text-gray-600">Rewards Paid</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
