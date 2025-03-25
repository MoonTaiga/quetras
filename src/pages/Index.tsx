
import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/container";
import { StatCard } from "@/components/dashboard/StatCard";
import { QueryTable, QueryData } from "@/components/dashboard/QueryTable";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  CalendarClock, 
  DollarSign, 
  FileText, 
  Plus, 
  Users 
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Footer } from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { isAdmin, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [queries, setQueries] = React.useState<QueryData[]>([]);
  const { toast } = useToast();

  React.useEffect(() => {
    // Get queries from localStorage if available
    const storedQueries = localStorage.getItem("quetras_queries");
    if (storedQueries) {
      try {
        setQueries(JSON.parse(storedQueries));
      } catch (error) {
        console.error("Failed to parse stored queries:", error);
      }
    }
  }, []);

  const handleNewQuery = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/query/new");
    }
  };

  const handleDeleteQuery = (id: string) => {
    // Get current queries from localStorage
    const storedQueries = localStorage.getItem("quetras_queries");
    if (storedQueries) {
      try {
        const parsedQueries = JSON.parse(storedQueries);
        // Filter out the query to be deleted
        const updatedQueries = parsedQueries.filter((query: QueryData) => query.id !== id);
        // Update localStorage
        localStorage.setItem("quetras_queries", JSON.stringify(updatedQueries));
        // Update state
        setQueries(updatedQueries);
        // Trigger storage event for other tabs
        window.dispatchEvent(new Event("storage"));
        
        toast({
          title: "Query deleted",
          description: "The query has been successfully deleted.",
        });
      } catch (error) {
        console.error("Failed to delete query:", error);
      }
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1 page-container animate-fade-in">
        <Container as="section" className="py-8" withGlass={false}>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-semibold">Tuition Query Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Monitor and manage all tuition payment queries
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={handleNewQuery}>
                <Plus className="mr-2 h-4 w-4" />
                New Query
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Queries"
              value={queries.length.toString()}
              description="All queries"
              icon={FileText}
              trend="neutral"
              trendValue=""
            />
            <StatCard
              title="Active Users"
              value={isAdmin ? "Admin" : "User"}
              description="Current session"
              icon={Users}
              trend="neutral"
              trendValue=""
            />
            <StatCard
              title="Processing Time"
              value="1.5 days"
              description="Average resolution time"
              icon={CalendarClock}
              trend="neutral"
              trendValue=""
            />
            <StatCard
              title="Total Amount"
              value={`$${queries.reduce((sum, query) => sum + (query.amount || 0), 0).toFixed(2)}`}
              description="All queries"
              icon={DollarSign}
              trend="neutral"
              trendValue=""
            />
          </div>

          <div className="mt-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Recent Queries</h2>
              <Button variant="ghost" asChild>
                <Link to="/queries">View All</Link>
              </Button>
            </div>
            <div className="glass rounded-xl p-1 overflow-hidden">
              <QueryTable 
                queries={queries.slice(0, 5)} 
                onDeleteQuery={handleDeleteQuery}
              />
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </main>
  );
};

export default Index;
