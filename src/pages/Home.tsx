
import React, { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { setupAdminUser } from "@/utils/setupAdmin";
import { useAuth } from "@/contexts/AuthContext";

const Home = () => {
  useEffect(() => {
    // Set up admin user for testing - would be removed in production
    setupAdminUser();
  }, []);

  const { isLoggedIn, isAdmin } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto p-6">
        <section className="max-w-4xl mx-auto text-center py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to QUETRAS</h1>
          <p className="text-xl text-muted-foreground mb-8">
            A comprehensive query tracking and response system for educational institutions
          </p>
          
          {isLoggedIn ? (
            <div className="p-6 bg-muted rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-3">
                Welcome back, {isAdmin ? "Administrator" : "User"}
              </h2>
              <p className="mb-4">
                {isAdmin 
                  ? "You have administrator access. You can manage users, view all queries, and more."
                  : "You're logged in as a regular user. You can submit queries and view your query history."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-background rounded-md shadow">
                  <h3 className="font-medium">Quick Actions</h3>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>• View your dashboard</li>
                    <li>• Submit a new query</li>
                    <li>• Check query status</li>
                  </ul>
                </div>
                <div className="p-4 bg-background rounded-md shadow">
                  <h3 className="font-medium">Recent Updates</h3>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>• New query response system</li>
                    <li>• Improved user interface</li>
                    <li>• Better notification system</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="bg-muted p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Get Started with QUETRAS</h2>
                <p className="mb-4">Create an account or log in to begin tracking your queries</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                  <div className="flex-1 bg-background p-4 rounded-md shadow text-center">
                    <h3 className="font-medium mb-2">For Students & Staff</h3>
                    <p className="text-sm mb-4">Submit and track your academic queries</p>
                    <div className="text-sm text-muted-foreground">
                      Login with your user account
                    </div>
                  </div>
                  <div className="flex-1 bg-background p-4 rounded-md shadow text-center">
                    <h3 className="font-medium mb-2">For Administrators</h3>
                    <p className="text-sm mb-4">Manage the system and oversee all queries</p>
                    <div className="text-sm text-muted-foreground">
                      Login with admin credentials
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
      <footer className="bg-muted py-6">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>© 2023 QUETRAS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
