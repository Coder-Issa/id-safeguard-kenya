
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Profile = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
};

type AuthContextState = {
  user: any;
  session: any;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  isAdmin: boolean;
};

export function useAuth(): AuthContextState {
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Fetch profile from Supabase
  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();
    setProfile(data ?? null);
    if (error) {
      console.error("[useAuth] fetchProfile error:", error.message);
    } else {
      console.log("[useAuth] Fetched profile:", data);
    }
  };

  // Check if user is admin
  const fetchRole = async (userId: string) => {
    // Add extra logging for debugging
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .maybeSingle();

    // Begin logging
    console.info("[useAuth] fetchRole - start", { userId });
    if (error) {
      console.error("[useAuth] fetchRole error:", error.message);
      setIsAdmin(false);
      console.log("[useAuth] Setting isAdmin = false due to fetch error");
    } else if (!data) {
      setIsAdmin(false);
      console.log("[useAuth] fetchRole - No data returned, setting isAdmin = false");
    } else {
      const adminStatus = data.role === "admin";
      setIsAdmin(adminStatus);
      console.log(
        "[useAuth] Fetched user role:",
        data,
        `Setting isAdmin to ${adminStatus} for user_id=${userId}`
      );
    }
  };

  useEffect(() => {
    // Listen to auth changes first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          setTimeout(() => {
            fetchProfile(session.user.id);
            fetchRole(session.user.id);
          }, 0);
        } else {
          setProfile(null);
          setIsAdmin(false);
        }
      }
    );

    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
        fetchRole(session.user.id);
      }
      setLoading(false);  // ALWAY set loading=false at the end of this initial fetch
    });

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
    setIsAdmin(false);
    // Refresh and redirect to homepage after logout
    window.location.href = "/";
  };

  return { user, session, profile, loading, signOut, isAdmin };
}
