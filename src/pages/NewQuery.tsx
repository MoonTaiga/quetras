
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
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
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      toast.error("You must be logged in to submit a query");
      navigate("/login");
      return;
    }

    if (!queryTitle || !amount) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    // In a real app, this would make an API call to save the query
    // For demo purposes, we'll simulate a successful submission
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Generate a new query ID (would come from the server in a real app)
      const newQueryId = `TQ-${Math.floor(1000 + Math.random() * 9000)}`;
      
      toast.success("Query submitted successfully", {
        description: `Your query ID is ${newQueryId}`,
      });
      
      // Redirect to the queries list
      navigate("/queries");
    }, 1500);
  };

  // Redirect to login if not logged in
  if (!isLoggedIn) {
    navigate("/login");
    return null;
  }

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
                    <label htmlFor="queryTitle" className="block text-sm font-medium mb-1">
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
                  
                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium mb-1">
                      Amount ($)
                    </label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Enter the amount related to your query
                    </p>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Query"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Container>
      </div>
    </main>
  );
};

export default NewQuery;
