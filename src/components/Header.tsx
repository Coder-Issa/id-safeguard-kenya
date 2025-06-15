import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const navigate = useNavigate();
  const { user, profile, isAdmin, signOut, loading } = useAuth();

  return (
    <header className="bg-white shadow-md border-b-2 border-kenya-red">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-kenya-red to-kenya-green rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">ID</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-kenya-black">ID Safeguard Kenya</h1>
              <p className="text-sm text-gray-600">Recover Your Lost ID Cards</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/')}>
              Home
            </Button>
            <Button variant="ghost" onClick={() => navigate('/search')}>
              Search
            </Button>
            <Button variant="ghost" onClick={() => navigate('/post-id')}>
              Post Lost ID
            </Button>
            {isAdmin && (
              <Button
                variant="ghost"
                onClick={() => navigate('/admin')}
                className="text-kenya-green font-semibold"
              >
                Admin
              </Button>
            )}
            {user && (
              <span className="px-2 text-gray-500 text-sm">Hello, {profile ? profile.full_name.split(" ")[0] : "User"}{isAdmin && " (Admin)"}</span>
            )}
            {!user && !loading && (
              <>
                <Button variant="outline" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button
                  className="bg-kenya-green hover:bg-kenya-green/90 text-white"
                  onClick={() => navigate('/register')}
                >
                  Register
                </Button>
              </>
            )}
            {user && (
              <Button
                variant="outline"
                onClick={signOut}
                className="ml-2"
              >
                Logout
              </Button>
            )}
          </nav>
          <div className="md:hidden">
            <Button variant="outline" size="sm">
              Menu
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
