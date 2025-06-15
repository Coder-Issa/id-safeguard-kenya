
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from "@/components/ui/use-toast";
import MyProfileSection from '@/components/MyProfileSection';

const PostId = () => {
  const { user, profile } = useAuth();
  const [formData, setFormData] = useState({
    idNumber: '',
    fullName: '',
    dateOfBirth: '',
    placeFound: '',
    additionalInfo: '',
    image: null as File | null
  });
  const [submitting, setSubmitting] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "You must be signed in!",
        description: "Please log in to post a found ID card.",
        variant: "destructive"
      });
      return;
    }
    setSubmitting(true);
    let image_url: string | null = null;

    // Step 1: Upload the image, if any
    if (formData.image) {
      const fileExt = formData.image.name.split('.').pop();
      const filePath = `found_ids/${user.id}-${Date.now()}.${fileExt}`;
      const { data: uploadData, error: uploadErr } = await supabase.storage
        .from("public")
        .upload(filePath, formData.image);

      if (uploadErr) {
        toast({
          title: "Failed to upload image",
          description: uploadErr.message,
          variant: "destructive"
        });
        setSubmitting(false);
        return;
      }
      image_url = uploadData?.path
        ? supabase.storage.from("public").getPublicUrl(filePath).data.publicUrl
        : null;
    }

    // Step 2: Insert ID card into found_id_cards
    const { error } = await supabase
      .from("found_id_cards")
      .insert([
        {
          user_id: user.id,
          id_number: formData.idNumber,
          full_name: formData.fullName,
          date_of_birth: formData.dateOfBirth || null,
          place_found: formData.placeFound,
          additional_info: formData.additionalInfo || null,
          image_url,
        }
      ]);

    if (error) {
      toast({
        title: "Failed to post ID Card",
        description: error.message,
        variant: "destructive",
      });
      setSubmitting(false);
      return;
    }

    toast({
      title: "ID Card posted successfully!",
      description: "Your found ID card has been submitted.",
    });

    // Reset the form and refresh posted cards
    setFormData({
      idNumber: '',
      fullName: '',
      dateOfBirth: '',
      placeFound: '',
      additionalInfo: '',
      image: null
    });
    // Clear image file input
    if (imageInputRef.current) imageInputRef.current.value = '';
    setSubmitting(false);
    setRefresh((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-br from-kenya-green/5 to-kenya-red/5 py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto shadow-xl border-2 border-kenya-green/20 mb-10">
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
                    ref={imageInputRef}
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
                  disabled={submitting}
                >
                  {submitting ? "Posting..." : "Post Found ID Card"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <MyProfileSection refreshFlag={refresh} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PostId;
