
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

const fetchProfiles = async () => {
  const { data, error } = await supabase.from("profiles").select("*").order("full_name");
  if (error) throw new Error(error.message);
  return data;
};

const UsersTable = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-all-users"],
    queryFn: fetchProfiles,
  });

  if (isLoading) return <div>Loading users...</div>;
  if (error) return <div className="text-red-500">Error loading users</div>;
  if (!data || data.length === 0)
    return <div className="text-gray-600 mt-2">No users found.</div>;

  return (
    <Table className="overflow-x-auto text-sm">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>User ID</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.full_name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phone}</TableCell>
            <TableCell>{user.id}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
