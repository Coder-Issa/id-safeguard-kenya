
import React from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

type SearchResult = {
  id_number: string;
  full_name: string;
  date_of_birth: string | null;
  place_found: string;
  additional_info: string | null;
  image_url: string | null;
  posted_at: string | null;
};

interface IDResultPanelProps {
  result: SearchResult;
  onConfirmPayment: () => void;
  sending: boolean;
  paymentNumber: string;
  paymentAmount: number;
}

const CONFIRM_NOTICE = "After confirmation, your payment will be reviewed and you’ll be contacted for recovery instructions.";

export default function IDResultPanel({
  result,
  onConfirmPayment,
  sending,
  paymentNumber,
  paymentAmount,
}: IDResultPanelProps) {
  return (
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
          Send <span className="font-bold">Ksh {paymentAmount}</span> via{' '}
          <span className="font-semibold text-green-600">M-PESA</span> to{' '}
          <span className="font-mono bg-gray-100 py-1 px-2 text-lg rounded text-kenya-black">{paymentNumber}</span>
          .
        </div>
        <div className="mb-4 text-base">
          Use M-Pesa "Send Money" to the number above. Once you’ve paid, click below:
        </div>
        <Button
          className="w-full max-w-xs mx-auto h-12 bg-kenya-green hover:bg-kenya-green/90 text-white text-lg font-semibold"
          onClick={onConfirmPayment}
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
        <div className="mt-2 text-sm text-gray-600">{CONFIRM_NOTICE}</div>
      </div>
    </div>
  );
}
