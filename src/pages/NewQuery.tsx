
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const NewQuery = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [queryTitle, setQueryTitle] = useState("");

  useEffect(() => {
    // Redirect to login if not logged in
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      toast.error("You must be logged in to submit a query");
      navigate("/login");
      return;
    }

    if (!queryTitle) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    // Get existing queries to determine query number
    const existingQueries = JSON.parse(localStorage.getItem("quetras_queries") || "[]");
    
    // Generate a new query ID
    const newQueryId = `TQ-${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Create new query object
    const newQuery = {
      id: newQueryId,
      studentName: user?.name || "Anonymous",
      queryTitle: queryTitle,
      date: new Date().toISOString().split('T')[0],
      status: "new",
    };
    
    // Add new query to existing queries
    const updatedQueries = [newQuery, ...existingQueries];
    
    // Save to localStorage
    localStorage.setItem("quetras_queries", JSON.stringify(updatedQueries));
    
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast.success("Query submitted successfully", {
        description: `Your query ID is ${newQueryId}`,
      });
      
      // Check if this query is in top 10
      if (updatedQueries.length <= 10) {
        // Send notification email (in a real app)
        toast.success("You are in the top 10 queries!", {
          description: "You will receive notifications about your query status.",
        });
      }
      
      // Redirect to the queries list
      navigate("/queries");
    }, 1000);
  };

  // If not logged in, component will redirect in useEffect

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1 page-container animate-fade-in">
        <Container as="section" className="py-8 max-w-2xl mx-auto" withGlass={false}>
          <Button
            variant="ghost"
            className="mb-4 -ml-3"
            asChild
          >
            <Link to="/queries">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Queries
            </Link>
          </Button>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Submit New Query</CardTitle>
              <CardDescription>
                Fill out the form below to submit a new tuition payment query
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="queryTitle" className="block text-sm font-medium mb-1 text-foreground">
                      Query Title
                    </label>
                    <Input
                      id="queryTitle"
                      placeholder="e.g., Scholarship Application, Refund Request"
                      value={queryTitle}
                      onChange={(e) => setQueryTitle(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-sky-600 hover:bg-sky-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Query"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Container>
      </div>
      <Footer />
    </main>
  );
};

export default NewQuery;
