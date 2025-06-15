
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

const fetchLostIds = async () => {
  const { data, error } = await supabase
    .from("found_id_cards")
    .select("*")
    .order("posted_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};

const LostIdsTable = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-all-lost-ids"],
    queryFn: fetchLostIds,
  });

  if (isLoading) return <div>Loading lost IDs...</div>;
  if (error) return <div className="text-red-500">Error loading lost IDs</div>;

  if (!data || data.length === 0)
    return <div className="text-gray-600 mt-2">No lost IDs found.</div>;

  return (
    <Table className="overflow-x-auto text-sm">
      <TableHeader>
        <TableRow>
          <TableHead>ID Number</TableHead>
          <TableHead>Full Name</TableHead>
          <TableHead>Date of Birth</TableHead>
          <TableHead>Place Found</TableHead>
          <TableHead>Posted At</TableHead>
          <TableHead>Posted By (User ID)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((id) => (
          <TableRow key={id.id}>
            <TableCell>{id.id_number}</TableCell>
            <TableCell>{id.full_name}</TableCell>
            <TableCell>{id.date_of_birth ? new Date(id.date_of_birth).toLocaleDateString() : "-"}</TableCell>
            <TableCell>{id.place_found}</TableCell>
            <TableCell>{id.posted_at ? new Date(id.posted_at).toLocaleString() : "-"}</TableCell>
            <TableCell>{id.user_id}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LostIdsTable;
