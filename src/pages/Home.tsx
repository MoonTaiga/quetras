
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { setupAdminUser } from "@/utils/setupAdmin";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Star, User, Clock, MessageSquare } from "lucide-react";

const reviewData = [
  { 
    id: 1, 
    name: "Sarah J.", 
    role: "Student",
    content: "QUETRAS made tracking my tuition payments so much easier. I can see the status of my query anytime!",
    rating: 5,
    date: "2 days ago"
  },
  { 
    id: 2, 
    name: "Michael T.", 
    role: "Faculty Member",
    content: "As someone who handles student inquiries, this system has streamlined our workflow tremendously.",
    rating: 4,
    date: "1 week ago"
  },
  { 
    id: 3, 
    name: "David L.", 
    role: "Student",
    content: "The online payment feature saved me a trip to the bursar's office. Very convenient!",
    rating: 5,
    date: "3 days ago"
  }
];

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-sky-800 transition-all hover:scale-[1.01]">Welcome to QUETRAS</h1>
          <p className="text-xl text-sky-600 mb-8">
            A comprehensive query tracking and response system for educational institutions
          </p>
          
          {isLoggedIn ? (
            <div className="p-6 bg-sky-50 rounded-lg shadow-sm transition-all hover:shadow-md">
              <h2 className="text-2xl font-semibold mb-3 text-sky-700">
                Welcome back, {isAdmin ? "Administrator" : "User"}
              </h2>
              <p className="mb-4 text-gray-700">
                {isAdmin 
                  ? "You have administrator access. You can manage users, view all queries, and more."
                  : "You're logged in as a regular user. You can submit queries and view your query history."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-white rounded-md shadow transition-all hover:shadow-md hover:translate-y-[-2px]">
                  <h3 className="font-medium text-sky-700">Quick Actions</h3>
                  <ul className="mt-2 space-y-1 text-sm text-gray-700">
                    <li className="transition-all hover:translate-x-1">• View your dashboard</li>
                    <li className="transition-all hover:translate-x-1">• Submit a new query</li>
                    <li className="transition-all hover:translate-x-1">• Check query status</li>
                  </ul>
                </div>
                <div className="p-4 bg-white rounded-md shadow transition-all hover:shadow-md hover:translate-y-[-2px]">
                  <h3 className="font-medium text-sky-700">Recent Updates</h3>
                  <ul className="mt-2 space-y-1 text-sm text-gray-700">
                    <li className="transition-all hover:translate-x-1">• New query response system</li>
                    <li className="transition-all hover:translate-x-1">• Improved user interface</li>
                    <li className="transition-all hover:translate-x-1">• Better notification system</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="bg-sky-50 p-6 rounded-lg shadow-sm transition-all hover:shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-sky-700">Get Started with QUETRAS</h2>
                <p className="mb-4 text-gray-700">Create an account or log in to begin tracking your queries</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                  <div className="flex-1 bg-white p-4 rounded-md shadow transition-all hover:shadow-md hover:translate-y-[-2px]">
                    <h3 className="font-medium mb-2 text-sky-700">For Students & Staff</h3>
                    <p className="text-sm mb-4 text-gray-700">Submit and track your academic queries</p>
                    <Button 
                      className="w-full bg-sky-600 hover:bg-sky-700 transition-all hover:scale-[1.02]"
                      asChild
                    >
                      <Link to="/login">Login Now</Link>
                    </Button>
                  </div>
                  <div className="flex-1 bg-white p-4 rounded-md shadow transition-all hover:shadow-md hover:translate-y-[-2px]">
                    <h3 className="font-medium mb-2 text-sky-700">For Administrators</h3>
                    <p className="text-sm mb-4 text-gray-700">Manage the system and oversee all queries</p>
                    <Button 
                      className="w-full bg-sky-600 hover:bg-sky-700 transition-all hover:scale-[1.02]"
                      asChild
                    >
                      <Link to="/admin-login">Admin Login</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
        
        <section className="max-w-4xl mx-auto py-10">
          <Container withGlass>
            <h2 className="text-2xl font-semibold mb-6 text-sky-800 text-center">Recent Reviews</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {reviewData.map(review => (
                <Card key={review.id} className="transition-all hover:shadow-md hover:translate-y-[-2px]">
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center">
                        <div className="bg-sky-100 p-2 rounded-full mr-3">
                          <User className="h-5 w-5 text-sky-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-sky-800">{review.name}</h3>
                          <p className="text-xs text-sky-600">{review.role}</p>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-amber-500 fill-amber-500" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm mb-3">"{review.content}"</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {review.date}
                      </span>
                      <span className="flex items-center">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Reply
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" className="transition-all hover:bg-sky-50 hover:scale-105">View All Reviews</Button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
