
import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RegisterForm from '@/components/register/RegisterForm';

const Register = () => (
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
          <RegisterForm />
        </Card>
      </div>
    </main>
    <Footer />
  </div>
);

export default Register;
