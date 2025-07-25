
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type UserData = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  posted_ids_count: number;
  role: string;
};

const fetchUsersData = async (): Promise<UserData[]> => {
  // Fetch all profiles
  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("*")
    .order("full_name");

  if (profilesError) throw new Error(profilesError.message);
  if (!profiles) return [];

  // Get roles and counts for each user
  const usersWithData = await Promise.all(
    profiles.map(async (profile): Promise<UserData> => {
      // Get user role
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", profile.id)
        .single();

      // Get count of posted IDs
      const { count } = await supabase
        .from("found_id_cards")
        .select("*", { count: "exact", head: true })
        .eq("user_id", profile.id);

      return {
        id: profile.id,
        full_name: profile.full_name,
        email: profile.email,
        phone: profile.phone,
        posted_ids_count: count || 0,
        role: roleData?.role || "user"
      };
    })
  );

  return usersWithData;
};

const UsersTable = () => {
  const { data, isLoading, error } = useQuery<UserData[]>({
    queryKey: ["admin-all-users"],
    queryFn: fetchUsersData,
  });

  if (isLoading) return <div>Loading users...</div>;
  if (error) return <div className="text-red-500">Error loading users</div>;
  if (!data || data.length === 0)
    return <div className="text-gray-600 mt-2">No users found.</div>;

  const getRoleBadgeVariant = (role: string) => {
    return role === "admin" ? "destructive" : "secondary";
  };

  return (
    <Table className="overflow-x-auto text-sm">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Posted IDs</TableHead>
          <TableHead>User ID</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.full_name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phone}</TableCell>
            <TableCell>
              <Badge variant={getRoleBadgeVariant(user.role)}>
                {user.role}
              </Badge>
            </TableCell>
            <TableCell className="text-center">
              <Badge variant="outline">{user.posted_ids_count}</Badge>
            </TableCell>
            <TableCell className="text-xs text-muted-foreground">
              {user.id.slice(0, 8)}...
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
