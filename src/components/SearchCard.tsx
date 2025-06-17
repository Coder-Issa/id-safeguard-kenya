
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import IDSearchForm from "./IDSearchForm";
import IDResultPanel from "./IDResultPanel";
import { supabase } from '@/integrations/supabase/client';
import { toast } from "@/hooks/use-toast";
import { useAuth } from '@/hooks/useAuth';

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
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searching, setSearching] = React.useState(false);
  const [result, setResult] = React.useState<SearchResult | null>(null);
  const [notFound, setNotFound] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [sending, setSending] = React.useState(false);
  const { profile, user, session } = useAuth();

  // Search handler, used in IDSearchForm
  const handleSearch = async (term: string) => {
    setSearching(true);
    setResult(null);
    setNotFound(false);
    setError("");
    try {
      const { data, error } = await supabase
        .from('found_id_cards')
        .select('id_number, full_name, date_of_birth, place_found, additional_info, image_url, posted_at')
        .eq('id_number', term.trim())
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

  // Confirmation payment logic for IDResultPanel
  const handleConfirmPayment = async () => {
    if (!result) return;
    setSending(true);
    
    try {
      console.log("=== PAYMENT CONFIRMATION DEBUG INFO ===");
      console.log("User authenticated:", !!user);
      console.log("Session exists:", !!session);
      console.log("Profile data:", profile);
      console.log("Result data:", result);
      console.log("Attempting to invoke edge function...");
      
      const requestBody = {
        id_number: result.id_number,
        full_name: result.full_name,
        phone: SEARCH_PAYMENT_NUMBER,
        amount: SEARCH_PAYMENT_AMOUNT,
        place_found: result.place_found,
        notifiedEmail: CONFIRMATION_EMAIL,
        timestamp: new Date().toISOString(),
        searcher_email: profile?.email || null,
        searcher_phone: profile?.phone || null,
        searcher_name: profile?.full_name || null,
      };
      
      console.log("Request body:", requestBody);
      
      const { data, error } = await supabase.functions.invoke('send-search-confirmation', {
        body: requestBody,
      });

      console.log("Edge function response - data:", data);
      console.log("Edge function response - error:", error);
      console.log("=== END DEBUG INFO ===");

      if (error) {
        console.error("Edge function error details:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        
        toast({
          title: "Error",
          description: `Failed to send confirmation: ${error.message}. Please try again or contact support.`,
          variant: "destructive",
        });
      } else {
        console.log("Confirmation email sent successfully");
        toast({
          title: "Confirmation Sent",
          description: "Thank you! Your payment confirmation has been sent.",
        });
        setTimeout(() => window.location.reload(), 1500);
      }
    } catch (err) {
      console.error("Unexpected error in handleConfirmPayment:", err);
      console.error("Error details:", {
        name: err instanceof Error ? err.name : 'Unknown',
        message: err instanceof Error ? err.message : String(err),
        stack: err instanceof Error ? err.stack : 'No stack trace'
      });
      
      toast({
        title: "Error",
        description: "Failed to send confirmation. Please try again.",
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
        <IDSearchForm
          onSearch={handleSearch}
          searching={searching}
          error={error}
          notFound={notFound}
          searchTerm={searchTerm}
          onInputChange={setSearchTerm}
        />
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Search Fee:</strong> KSH 500 will be charged for each search. 
            KSH 200 goes to the person who found your ID, KSH 300 for platform maintenance.
          </p>
        </div>
        {result && (
          <IDResultPanel 
            result={result}
            onConfirmPayment={handleConfirmPayment}
            sending={sending}
            paymentNumber={SEARCH_PAYMENT_NUMBER}
            paymentAmount={SEARCH_PAYMENT_AMOUNT}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default SearchCard;
