
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { QueryData } from "@/components/dashboard/QueryTable";

const QueryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [query, setQuery] = useState<QueryData | null>(null);
  
  // Form state
  const [queryTitle, setQueryTitle] = useState("");
  const [status, setStatus] = useState<"new" | "processing" | "pending" | "completed" | "cancelled">("new");

  useEffect(() => {
    // Get queries from localStorage
    const storedQueries = localStorage.getItem("quetras_queries");
    
    if (storedQueries) {
      try {
        const parsedQueries = JSON.parse(storedQueries);
        const foundQuery = parsedQueries.find((q: QueryData) => q.id === id);
        
        if (foundQuery) {
          setQuery(foundQuery);
          setQueryTitle(foundQuery.queryTitle);
          setStatus(foundQuery.status);
        } else {
          // Query not found, redirect to queries list
          toast.error("Query not found");
          navigate("/queries");
        }
      } catch (error) {
        console.error("Failed to parse stored queries:", error);
      }
    }
  }, [id, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!queryTitle) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    
    // Get existing queries from localStorage
    const storedQueries = localStorage.getItem("quetras_queries");
    
    if (storedQueries && query) {
      try {
        const parsedQueries = JSON.parse(storedQueries);
        
        // Find and update the query
        const updatedQueries = parsedQueries.map((q: QueryData) => {
          if (q.id === id) {
            return {
              ...q,
              queryTitle,
              status,
            };
          }
          return q;
        });
        
        // Save to localStorage
        localStorage.setItem("quetras_queries", JSON.stringify(updatedQueries));
        
        setTimeout(() => {
          setIsSubmitting(false);
          
          toast.success("Query updated successfully");
          
          // Redirect to the queries list
          navigate("/queries");
        }, 1000);
      } catch (error) {
        console.error("Failed to update query:", error);
        setIsSubmitting(false);
        toast.error("Failed to update query");
      }
    }
  };

  const handleDelete = () => {
    const storedQueries = localStorage.getItem("quetras_queries");
    
    if (storedQueries) {
      try {
        const parsedQueries = JSON.parse(storedQueries);
        const updatedQueries = parsedQueries.filter((q: QueryData) => q.id !== id);
        
        // Save to localStorage
        localStorage.setItem("quetras_queries", JSON.stringify(updatedQueries));
        
        toast.success("Query deleted successfully");
        
        // Redirect to the queries list
        navigate("/queries");
      } catch (error) {
        console.error("Failed to delete query:", error);
        toast.error("Failed to delete query");
      }
    }
  };

  if (!query) {
    return (
      <main className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Loading query...</p>
          </div>
        </div>
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
            <Link to="/queries">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Queries
            </Link>
          </Button>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Edit Query #{query.id}</CardTitle>
                <CardDescription>
                  Update your tuition payment query
                </CardDescription>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10">
                    <Trash2 className="h-5 w-5" />
                    <span className="sr-only">Delete query</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete this query?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the query from the system.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleDelete}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
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
                    <label htmlFor="status" className="block text-sm font-medium mb-1">
                      Status
                    </label>
                    <Select 
                      value={status} 
                      onValueChange={(value) => setStatus(value as any)}
                    >
                      <SelectTrigger id="status" className="w-full">
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

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Date Submitted
                    </label>
                    <Input
                      value={query.date}
                      disabled
                      className="bg-muted/30"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Amount
                    </label>
                    <Input
                      value={`$${query.amount.toFixed(2)}`}
                      disabled
                      className="bg-muted/30"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Amount cannot be modified after submission
                    </p>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-sky-600 hover:bg-sky-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Updating..."
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Container>
      </div>
    </main>
  );
};

export default QueryEdit;
