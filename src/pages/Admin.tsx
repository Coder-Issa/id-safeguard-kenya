
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import LostIdsTable from "@/components/admin/LostIdsTable";
import UsersTable from "@/components/admin/UsersTable";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const AdminPage = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect non-admins away from the page
    if (!loading && (!user || !isAdmin)) {
      navigate("/");
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading || !user) return <div className="text-center py-12">Loading...</div>;
  if (!isAdmin) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-kenya-green/5 to-kenya-red/5 py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-5xl mx-auto mb-8 shadow-xl border-2 border-kenya-green/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-kenya-black">
                Admin Dashboard
              </CardTitle>
              <p className="text-gray-600">Manage all posted IDs & users</p>
            </CardHeader>
            <CardContent>
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">All Lost IDs</h2>
                <LostIdsTable />
              </section>
              <section>
                <h2 className="text-xl font-semibold mb-2">All Users</h2>
                <UsersTable />
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage;
