
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { QueryDetailData } from "@/components/queries/QueryDetail";

const QueryEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAdmin, isLoggedIn } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [query, setQuery] = useState<QueryDetailData | null>(null);
  
  // Form state
  const [queryTitle, setQueryTitle] = useState("");
  const [status, setStatus] = useState<"new" | "processing" | "pending" | "completed" | "cancelled">("new");
  const [description, setDescription] = useState("");
  
  useEffect(() => {
    // Redirect to login if not logged in
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    
    // Load query data if ID exists
    if (id) {
      const storedQueries = localStorage.getItem("quetras_queries");
      if (storedQueries) {
        try {
          const queries = JSON.parse(storedQueries);
          const foundQuery = queries.find((q: any) => q.id === id);
          
          if (foundQuery) {
            setQuery(foundQuery);
            
            // Initialize form with query data
            setQueryTitle(foundQuery.queryTitle || "");
            setStatus(foundQuery.status || "new");
            setDescription(foundQuery.description || "");
          } else {
            // Query not found, navigate back to queries list
            toast.error("Query not found");
            navigate("/queries");
          }
        } catch (error) {
          console.error("Failed to parse stored queries:", error);
          toast.error("Failed to load query data");
        }
      }
    } else {
      // No ID provided, navigate back to queries list
      navigate("/queries");
    }
  }, [id, isLoggedIn, navigate]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      toast.error("You must be logged in to update a query");
      navigate("/login");
      return;
    }
    
    if (!queryTitle) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSaving(true);
    
    // Get current queries from localStorage
    const storedQueries = localStorage.getItem("quetras_queries");
    if (storedQueries && id) {
      try {
        const queries = JSON.parse(storedQueries);
        
        // Find the query to update
        const queryIndex = queries.findIndex((q: any) => q.id === id);
        
        if (queryIndex !== -1) {
          // Update query with form data
          queries[queryIndex] = {
            ...queries[queryIndex],
            queryTitle,
            status,
            description,
          };
          
          // Save updated queries to localStorage
          localStorage.setItem("quetras_queries", JSON.stringify(queries));
          
          // Simulate asynchronous operation
          setTimeout(() => {
            setIsSaving(false);
            toast.success("Query updated successfully");
            
            // Trigger storage event for other tabs
            window.dispatchEvent(new Event("storage"));
            
            // Navigate back to query details
            navigate(`/query/${id}`);
          }, 1000);
        } else {
          setIsSaving(false);
          toast.error("Query not found");
        }
      } catch (error) {
        console.error("Failed to update query:", error);
        setIsSaving(false);
        toast.error("Failed to update query");
      }
    }
  };
  
  if (!query) {
    return (
      <main className="min-h-screen flex flex-col bg-background">
        <Header />
        <Container className="flex-1 py-8 animate-fade-in" withGlass={false}>
          <div className="flex justify-center items-center h-full">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Loading query data...</h2>
              <p className="text-muted-foreground">Please wait or return to queries.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => navigate("/queries")}
              >
                Back to Queries
              </Button>
            </div>
          </div>
        </Container>
        <Footer />
      </main>
    );
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
            <Link to={`/query/${id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Query
            </Link>
          </Button>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Edit Query</CardTitle>
              <CardDescription>
                Update the details for query #{id}
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
                      value={queryTitle}
                      onChange={(e) => setQueryTitle(e.target.value)}
                      required
                    />
                  </div>
                  
                  {isAdmin && (
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium mb-1">
                        Status
                      </label>
                      <Select 
                        value={status} 
                        onValueChange={(value: any) => setStatus(value)}
                      >
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-1">
                      Description
                    </label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={5}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(`/query/${id}`)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </Container>
      </div>
      <Footer />
    </main>
  );
};

export default QueryEdit;
