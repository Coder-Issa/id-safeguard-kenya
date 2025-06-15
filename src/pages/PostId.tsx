
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PostId = () => {
  const [formData, setFormData] = useState({
    idNumber: '',
    fullName: '',
    dateOfBirth: '',
    placeFound: '',
    additionalInfo: '',
    image: null as File | null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        image: e.target.files[0]
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Posting ID:', formData);
    // This will be connected to actual database later
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gradient-to-br from-kenya-green/5 to-kenya-red/5 py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto shadow-xl border-2 border-kenya-green/20">
            <CardHeader className="text-center bg-gradient-to-r from-kenya-green/10 to-kenya-red/10">
              <CardTitle className="text-2xl font-bold text-kenya-black">
                Post Found ID Card
              </CardTitle>
              <p className="text-gray-600">Help someone recover their lost identification</p>
            </CardHeader>
            
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="idNumber">ID Number *</Label>
                    <Input
                      id="idNumber"
                      name="idNumber"
                      type="text"
                      placeholder="12345678"
                      value={formData.idNumber}
                      onChange={handleInputChange}
                      className="border-2 border-gray-200 focus:border-kenya-green"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="fullName">Full Name on ID *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="border-2 border-gray-200 focus:border-kenya-green"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="border-2 border-gray-200 focus:border-kenya-green"
                    />
                  </div>

                  <div>
                    <Label htmlFor="placeFound">Where did you find it? *</Label>
                    <Input
                      id="placeFound"
                      name="placeFound"
                      type="text"
                      placeholder="e.g., Nairobi CBD, Westlands"
                      value={formData.placeFound}
                      onChange={handleInputChange}
                      className="border-2 border-gray-200 focus:border-kenya-green"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="image">ID Card Image (Optional)</Label>
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="border-2 border-gray-200 focus:border-kenya-green"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Upload a clear photo of the ID card (optional but helpful)
                  </p>
                </div>

                <div>
                  <Label htmlFor="additionalInfo">Additional Information</Label>
                  <Textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    placeholder="Any additional details that might help the owner..."
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    className="border-2 border-gray-200 focus:border-kenya-green min-h-20"
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Important Notice:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• You will earn KSH 300 when someone successfully claims this ID</li>
                    <li>• All information will be kept secure and only shared with the rightful owner</li>
                    <li>• False information may result in account suspension</li>
                  </ul>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-kenya-green hover:bg-kenya-green/90 text-white py-3 text-lg"
                >
                  Post Found ID Card
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PostId;
