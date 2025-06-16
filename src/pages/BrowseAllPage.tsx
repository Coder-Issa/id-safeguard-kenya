import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useDebounce } from "@/hooks/useDebounce";
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

const BrowseAllPage = () => {
    const navigate = useNavigate();
    const [cards, setCards] = useState<FoundCard[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const [loading, setLoading] = useState(false);

    const fetchCards = async () => {
        setLoading(true);
        let query = supabase.from("found_id_cards").select("*").order("posted_at", { ascending: false });

        if (debouncedSearchTerm.trim()) {
            query = query.or(
                `full_name.ilike.%${debouncedSearchTerm}%,id_number.ilike.%${debouncedSearchTerm}%,place_found.ilike.%${debouncedSearchTerm}%`
            );
        }

        const { data, error } = await query;
        if (error) {
            console.error("Error fetching cards:", error.message);
        } else {
            setCards(data as FoundCard[]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCards();
    }, [debouncedSearchTerm]);

    return (
        <div className="container mx-auto p-4 mb-20">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-kenya-black">Browse All Posted ID Cards</h2>
                <button
                    onClick={() => navigate("/")}
                    className="px-4 py-2 bg-kenya-green text-white rounded hover:bg-kenya-green/90"
                >
                    Back Home
                </button>
            </div>

            <Input
                type="text"
                placeholder="Search by name, ID number, or location..."
                className="mb-6"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {loading && <p className="text-gray-600">Loading...</p>}
            {!loading && cards.length === 0 && <p className="text-gray-500">No ID cards found.</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {cards.map((card) => (
                    <Card key={card.id} className="border-kenya-green/20">
                        <CardContent className="p-4 space-y-2">
                            <div><strong>ID:</strong> {card.id_number}</div>
                            <div><strong>Name:</strong> {card.full_name}</div>
                            <div><strong>Found at:</strong> {card.place_found}</div>
                            {card.date_of_birth && <div><strong>DOB:</strong> {card.date_of_birth}</div>}
                            {card.additional_info && <div><strong>Info:</strong> {card.additional_info}</div>}
                            {card.image_url && (
                                <img src={card.image_url} alt="ID" className="h-32 object-contain border rounded" />
                            )}
                            <div className="text-xs text-gray-400">
                                Posted: {card.posted_at ? new Date(card.posted_at).toLocaleString() : "N/A"}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default BrowseAllPage;

