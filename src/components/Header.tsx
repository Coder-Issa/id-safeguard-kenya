import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { MenuToggle } from '@/components/navigation/MenuToggle';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile, isAdmin, signOut, loading } = useAuth();
  const [session, setSession] = useState<any>(null);

  // Fake session assignment if user exists
  useEffect(() => {
    if (user) {
      setSession({ user: { email: user.email } });
    } else {
      setSession(null);
    }
  }, [user]);

  const handleTabChange = (tab: string) => {
    const paths: Record<string, string> = {
      search: '/search',
      post: '/post-id',
      browse: '/browse',
      profile: '/profile',
      login: '/login',
      register: '/register',
    };

    const path = paths[tab];
    if (path) navigate(path);
  };

  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Admin button clicked", { loading, isAdmin, user: !!user });
    
    if (loading) {
      toast({
        title: "Please wait",
        description: "Checking admin permissions...",
      });
      return;
    }
    if (isAdmin) {
      console.log("Navigating to admin page");
      navigate('/admin');
    } else {
      console.log("Access denied - not admin");
      toast({
        title: "Access denied",
        description: "You do not have permission to access the admin page.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="bg-white shadow-md border-b-2 border-kenya-red">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src="/lovable-uploads/fea20d0e-5511-4e9c-a1a4-c929f81c8104.png"
              alt="ID Safeguard Kenya Logo"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold text-kenya-black">ID Safeguard Kenya</h1>
              <p className="text-sm text-gray-600">Recover Your Lost ID Cards</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/')}>Home</Button>
            <Button variant="ghost" onClick={() => navigate('/search')}>Search</Button>
            <Button variant="ghost" onClick={() => navigate('/post-id')}>Post Lost ID</Button>
            <Button
              variant="ghost"
              onClick={handleAdminClick}
              className={`font-semibold ${isAdmin ? "text-kenya-green" : "text-gray-400"} flex items-center`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                  Checking...
                </>
              ) : (
                "Admin"
              )}
            </Button>
            {user && (
              <span className="px-2 text-gray-500 text-sm">
                Hello, {profile ? profile.full_name.split(" ")[0] : "User"}
                {isAdmin && " (Admin)"}
              </span>
            )}
            {!user && !loading && (
              <>
                <Button variant="outline" onClick={() => navigate('/login')}>Login</Button>
                <Button className="bg-kenya-green hover:bg-kenya-green/90 text-white" onClick={() => navigate('/register')}>
                  Register
                </Button>
              </>
            )}
            {user && (
              <Button variant="outline" onClick={signOut} className="ml-2">
                Logout
              </Button>
            )}
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <MenuToggle session={session} onTabChange={handleTabChange} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

