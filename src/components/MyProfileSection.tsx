
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

type FoundCard = {
  id: string;
  id_number: string;
  full_name: string;
  date_of_birth: string | null;
  place_found: string;
  additional_info: string | null;
  image_url: string | null;
  posted_at: string | null;
};

const MyProfileSection = ({ refreshFlag }: { refreshFlag: boolean }) => {
  const { user, profile } = useAuth();

  // Fetch cards posted by user
  const { data: cards, isLoading, error, refetch } = useQuery({
    queryKey: ["my-id-cards", user?.id, refreshFlag],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("found_id_cards")
        .select("*")
        .order("posted_at", { ascending: false })
        .eq("user_id", user.id);
      if (error) throw new Error(error.message);
      return data as FoundCard[];
    },
    enabled: !!user,
  });

  const navigate = useNavigate();


  React.useEffect(() => {
    // refetch when refreshFlag changes
    if (user) refetch();
  }, [refreshFlag, user, refetch]);

  if (!user || !profile) return null;


  return (
    <Card className="max-w-2xl mx-auto shadow-xl border-2 border-kenya-green/20 mb-16">
      <CardHeader>
        <CardTitle className="text-xl text-kenya-black">My Profile</CardTitle>
        <p className="text-gray-500">See your info and all the ID cards you've posted.</p>
        <div className="mt-4">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-kenya-green text-white rounded hover:bg-kenya-green/90"
          >
            Back to Home
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-8">
          <h4 className="font-semibold mb-1">Contact Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <span className="font-medium text-gray-700">Name: </span>
              {profile.full_name || <span className="italic text-gray-400">Not provided</span>}
            </div>
            <div>
              <span className="font-medium text-gray-700">Email: </span>
              {profile.email || <span className="italic text-gray-400">Not provided</span>}
            </div>
            <div>
              <span className="font-medium text-gray-700">Phone: </span>
              {profile.phone || <span className="italic text-gray-400">Not provided</span>}
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">My Posted ID Cards</h4>
          {isLoading && <div>Loading...</div>}
          {error && <div className="text-red-500">Failed to load cards: {error.message}</div>}
          {cards && cards.length === 0 && (
            <div className="text-gray-400 italic">You have not posted any ID cards yet.</div>
          )}
          <div className="space-y-5">
            {cards &&
              cards.map((card) => (
                <div key={card.id} className="border rounded p-4 bg-white flex flex-col gap-1">
                  <div>
                    <span className="font-semibold text-kenya-green">ID Number:</span> {card.id_number}
                  </div>
                  <div>
                    <span className="font-semibold text-kenya-green">Name:</span> {card.full_name}
                  </div>
                  <div>
                    <span className="font-semibold text-kenya-green">Found At:</span> {card.place_found}
                  </div>
                  {card.date_of_birth && (
                    <div>
                      <span className="font-semibold text-kenya-green">Date of Birth:</span> {card.date_of_birth}
                    </div>
                  )}
                  {card.additional_info && (
                    <div>
                      <span className="font-semibold text-kenya-green">Info:</span> {card.additional_info}
                    </div>
                  )}
                  {card.image_url && (
                    <div className="mt-1">
                      <img
                        src={card.image_url}
                        alt="ID card"
                        className="rounded h-32 object-contain border"
                      />
                    </div>
                  )}
                  {card.posted_at && (
                    <div className="text-xs text-gray-400 mt-2">
                      Posted: {new Date(card.posted_at).toLocaleString()}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MyProfileSection;
