
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "@/components/ui/use-toast";
import { useAuth } from '@/hooks/useAuth';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  React.useEffect(() => {
    if (user && !loading) {
      // Redirect authenticated users to home
      navigate("/");
    }
    // eslint-disable-next-line
  }, [user, loading]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match.");
      setSubmitting(false);
      return;
    }

    // Sign up with email and password
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: window.location.origin + "/"
      }
    });
    if (error) {
      setErrorMsg(error.message);
      toast({ title: "Sign up failed!", description: error.message });
      setSubmitting(false);
      return;
    }
    const userId = data.user?.id;
    // Populate user profile
    if (userId) {
      await supabase.from("profiles").insert([{
        id: userId,
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone
      }]);
      // Assign "user" role by default
      await supabase.from("user_roles").insert([{
        user_id: userId,
        role: "user"
      }]);
    }
    toast({
      title: "Registration successful!",
      description: "Please check your email for a confirmation link and then log in."
    });
    navigate("/login");
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-br from-kenya-green/5 to-kenya-red/5 py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-md mx-auto shadow-xl border-2 border-kenya-red/20">
            <CardHeader className="text-center bg-gradient-to-r from-kenya-red/10 to-kenya-green/10">
              <CardTitle className="text-2xl font-bold text-kenya-black">
                Join Our Community
              </CardTitle>
              <p className="text-gray-600">Create your account to get started</p>
            </CardHeader>

            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="border-2 border-gray-200 focus:border-kenya-red"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border-2 border-gray-200 focus:border-kenya-red"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="0700000000"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="border-2 border-gray-200 focus:border-kenya-red"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="border-2 border-gray-200 focus:border-kenya-red"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="border-2 border-gray-200 focus:border-kenya-red"
                    required
                  />
                </div>
                {errorMsg && (
                  <div className="text-red-600 text-sm">{errorMsg}</div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-kenya-red hover:bg-kenya-red/90 text-white"
                  disabled={submitting}
                >
                  {submitting ? "Creating Account..." : "Create Account"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <button
                    onClick={() => navigate('/login')}
                    className="text-kenya-green hover:underline font-semibold"
                  >
                    Sign in here
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
