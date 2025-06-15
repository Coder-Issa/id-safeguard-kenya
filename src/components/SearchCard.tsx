import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "@/hooks/use-toast";

type SearchResult = {
  id_number: string;
  full_name: string;
  date_of_birth: string | null;
  place_found: string;
  additional_info: string | null;
  image_url: string | null;
  posted_at: string | null;
};

const SEARCH_PAYMENT_NUMBER = "0759515450";
const SEARCH_PAYMENT_AMOUNT = 500;
const CONFIRMATION_EMAIL = "recoverykenyaid@gmail.com";

const SearchCard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searching, setSearching] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [sending, setSending] = useState(false); // for payment confirmation button

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearching(true);
    setResult(null);
    setNotFound(false);
    setError("");
    try {
      const { data, error } = await supabase
        .from('found_id_cards')
        .select('id_number, full_name, date_of_birth, place_found, additional_info, image_url, posted_at')
        .eq('id_number', searchTerm.trim())
        .limit(1)
        .maybeSingle();
      if (error) {
        setError("Error searching for ID card.");
        setResult(null);
        setNotFound(false);
      } else if (data) {
        setResult(data);
      } else {
        setNotFound(true);
      }
    } catch (err) {
      setError("Unexpected error occurred.");
    }
    setSearching(false);
  };

  // New: handle confirmation payment
  const handleConfirmPayment = async () => {
    if (!result) return;
    setSending(true);
    try {
      const emailRes = await fetch(
        `${window.location.origin.replace(/^http/, "https")}/functions/v1/send-search-confirmation`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_number: result.id_number,
            full_name: result.full_name,
            phone: SEARCH_PAYMENT_NUMBER,
            amount: SEARCH_PAYMENT_AMOUNT,
            place_found: result.place_found,
            notifiedEmail: CONFIRMATION_EMAIL,
            timestamp: new Date().toISOString(),
          }),
        }
      );
      const data = await emailRes.json();
      if (emailRes.ok) {
        toast({
          title: "Confirmation Sent",
          description:
            "Thank you! Your payment confirmation has been sent.",
        });
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to send email.",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to send confirmation. Try again.",
        variant: "destructive",
      });
    }
    setSending(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-2 border-kenya-green/20">
      <CardHeader className="text-center bg-gradient-to-r from-kenya-green/10 to-kenya-red/10">
        <CardTitle className="text-2xl font-bold text-kenya-black">
          Search for Your Lost ID
        </CardTitle>
        <p className="text-gray-600">
          Enter your ID number to check if it has been found
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Enter ID Number (e.g., 12345678)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-kenya-green"
              disabled={searching}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          <Button 
            type="submit" 
            className="w-full h-12 bg-kenya-red hover:bg-kenya-red/90 text-white text-lg font-semibold"
            disabled={!searchTerm.trim() || searching}
          >
            {searching ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                </svg>
                Searching...
              </span>
            ) : (
              'Search Now - KSH 500'
            )}
          </Button>
        </form>
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Search Fee:</strong> KSH 500 will be charged for each search. 
            KSH 300 goes to the person who found your ID, KSH 200 for platform maintenance.
          </p>
        </div>
        
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-6 p-5 border border-kenya-green/40 rounded-lg bg-gradient-to-br from-white via-kenya-green/10 to-kenya-red/10">
            <div className="flex flex-col md:flex-row gap-5 md:items-center">
              {result.image_url ? (
                <img
                  src={result.image_url}
                  alt="ID Found"
                  className="w-32 h-32 rounded-lg object-cover border border-gray-200 bg-gray-50"
                />
              ) : (
                <div className="w-32 h-32 rounded-lg flex items-center justify-center bg-gray-100 text-gray-400">
                  <Search className="w-8 h-8" />
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold mb-1 text-kenya-green">
                  ID Number: <span className="font-mono text-kenya-black">{result.id_number}</span>
                </h3>
                <p className="mb-1">Full Name: <span className="font-semibold">{result.full_name}</span></p>
                <p className="mb-1">Date of Birth: <span>{result.date_of_birth ? result.date_of_birth : <span className="italic text-gray-400">Not specified</span>}</span></p>
                <p className="mb-1">Place Found: <span>{result.place_found}</span></p>
                {result.additional_info && (
                  <p className="mb-1">Additional Info: <span>{result.additional_info}</span></p>
                )}
                <p className="text-xs text-gray-400 mt-2">Posted At: {result.posted_at ? new Date(result.posted_at).toLocaleString() : "N/A"}</p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-green-700 font-bold mb-4">
                Your ID was found! Please follow instructions to recover it from the finder.
              </p>
              {/* Payment Section */}
              <div className="mb-2 text-base">
                <span className="font-semibold text-kenya-red">
                  Step 1:
                </span>{" "}
                Send <span className="font-bold">Ksh {SEARCH_PAYMENT_AMOUNT}</span> via{' '}
                <span className="font-semibold text-green-600">M-PESA</span> to{' '}
                <span className="font-mono bg-gray-100 py-1 px-2 text-lg rounded text-kenya-black">{SEARCH_PAYMENT_NUMBER}</span>
                .
              </div>
              <div className="mb-4 text-base">
                Use M-Pesa "Send Money" to the number above. Once you’ve paid, click below:
              </div>
              <Button
                className="w-full max-w-xs mx-auto h-12 bg-kenya-green hover:bg-kenya-green/90 text-white text-lg font-semibold"
                onClick={handleConfirmPayment}
                disabled={sending}
              >
                {sending ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "I have paid - Notify Platform"
                )}
              </Button>
              <div className="mt-2 text-sm text-gray-600">
                After confirmation, your payment will be reviewed and you’ll be contacted for recovery instructions.
              </div>
            </div>
          </div>
        )}

        {notFound && !error && (
          <div className="mt-6 p-5 border border-red-300 rounded-lg bg-red-50 text-center">
            <p className="text-red-700 font-semibold">
              Sorry, no ID was found matching <span className="font-mono">{searchTerm}</span>.
            </p>
            <p className="text-gray-700 mt-2 text-sm">
              If your ID has not been posted yet, keep checking after some time.  
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SearchCard;
