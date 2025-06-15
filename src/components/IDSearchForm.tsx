
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface IDSearchFormProps {
  onSearch: (searchTerm: string) => Promise<void>;
  searching: boolean;
  error: string;
  notFound: boolean;
  searchTerm: string;
  onInputChange: (term: string) => void;
}

export default function IDSearchForm({
  onSearch,
  searching,
  error,
  notFound,
  searchTerm,
  onInputChange,
}: IDSearchFormProps) {
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSearch(searchTerm);
      }}
      className="space-y-4"
    >
      <div className="relative">
        <Input
          type="text"
          placeholder="Enter ID Number (e.g., 12345678)"
          value={searchTerm}
          onChange={e => onInputChange(e.target.value)}
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
          "Search Now - KSH 500"
        )}
      </Button>
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
          {error}
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
    </form>
  );
}
