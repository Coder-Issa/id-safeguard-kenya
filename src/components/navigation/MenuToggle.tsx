import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Search, Upload, User, LogOut, LogIn, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface MenuToggleProps {
    session: any;
    onTabChange?: (tab: string) => void;
}

export const MenuToggle = ({ session, onTabChange }: MenuToggleProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleSignOut = async () => {
        try {
            await supabase.auth.signOut();
            setIsMenuOpen(false);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const handleNavigation = (tab: string) => {
        if (onTabChange) {
            onTabChange(tab);
        }
        setIsMenuOpen(false);
    };

    return (
        <div className="relative">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2"
            >
                {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                Menu
            </Button>

            {isMenuOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={() => setIsMenuOpen(false)}
                    />

                    {/* Menu */}
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border z-50">
                        {session && (
                            <div className="p-4 border-b">
                                <p className="text-sm text-gray-600">Signed in as:</p>
                                <p className="font-medium text-gray-900">{session.user?.email}</p>
                            </div>
                        )}

                        <nav className="p-2">
                            <button
                                onClick={() => handleNavigation("search")}
                                className="w-full flex items-center gap-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                            >
                                <Search className="h-4 w-4" />
                                Search IDs
                            </button>

                            <button
                                onClick={() => handleNavigation("post")}
                                className="w-full flex items-center gap-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                            >
                                <Upload className="h-4 w-4" />
                                Post Found ID
                            </button>

                            <button
                                onClick={() => handleNavigation("browse")}
                                className="w-full flex items-center gap-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                            >
                                <Home className="h-4 w-4" />
                                Browse All
                            </button>

                            {session ? (
                                <>
                                    <button
                                        onClick={() => handleNavigation("profile")}
                                        className="w-full flex items-center gap-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                                    >
                                        <User className="h-4 w-4" />
                                        My Profile
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => handleNavigation("login")}
                                        className="w-full flex items-center gap-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                                    >
                                        <LogIn className="h-4 w-4" />
                                        Login
                                    </button>

                                    <button
                                        onClick={() => handleNavigation("register")}
                                        className="w-full flex items-center gap-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                                    >
                                        <UserPlus className="h-4 w-4" />
                                        Register
                                    </button>
                                </>
                            )}
                        </nav>

                        {session && (
                            <div className="border-t p-2">
                                <button
                                    onClick={handleSignOut}
                                    className="w-full flex items-center gap-3 px-3 py-2 text-left text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
