
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/container";
import { QueryTable, QueryData } from "@/components/dashboard/QueryTable";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Footer } from "@/components/layout/Footer";

// Empty initial queries array - user will add their own
const initialQueries: QueryData[] = [];

const Queries = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [queries, setQueries] = useState<QueryData[]>(initialQueries);

  // Set search query from URL params on initial load
  useEffect(() => {
    if (initialSearch) {
      setSearchQuery(initialSearch);
    }
    
    // Get queries from localStorage if available
    const storedQueries = localStorage.getItem("quetras_queries");
    if (storedQueries) {
      try {
        setQueries(JSON.parse(storedQueries));
      } catch (error) {
        console.error("Failed to parse stored queries:", error);
      }
    }
  }, [initialSearch]);

  // Filter the queries based on search query and status filter
  const filteredQueries = queries.filter((query) => {
    const matchesSearch =
      query.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      query.queryTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      query.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || query.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(searchQuery ? { search: searchQuery } : {});
  };

  const handleNewQuery = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/query/new");
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1 page-container animate-fade-in">
        <Container as="section" className="py-8" withGlass={false}>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-semibold">All Queries</h1>
              <p className="text-muted-foreground mt-1">
                View and manage all tuition payment queries
              </p>
            </div>
            <Button onClick={handleNewQuery}>
              <Plus className="mr-2 h-4 w-4" />
              New Query
            </Button>
          </div>

          <div className="glass rounded-xl p-6 mb-6">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by ID, student name, or query title..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select 
                value={filterStatus} 
                onValueChange={setFilterStatus}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="new">
                    <div className="flex items-center">
                      <StatusBadge status="new" className="mr-2" />
                      New
                    </div>
                  </SelectItem>
                  <SelectItem value="processing">
                    <div className="flex items-center">
                      <StatusBadge status="processing" className="mr-2" />
                      Processing
                    </div>
                  </SelectItem>
                  <SelectItem value="pending">
                    <div className="flex items-center">
                      <StatusBadge status="pending" className="mr-2" />
                      Pending
                    </div>
                  </SelectItem>
                  <SelectItem value="completed">
                    <div className="flex items-center">
                      <StatusBadge status="completed" className="mr-2" />
                      Completed
                    </div>
                  </SelectItem>
                  <SelectItem value="cancelled">
                    <div className="flex items-center">
                      <StatusBadge status="cancelled" className="mr-2" />
                      Cancelled
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <Button type="submit" className="md:w-auto">Search</Button>
            </form>
          </div>

          <div className="glass rounded-xl p-1 overflow-hidden">
            <QueryTable queries={filteredQueries} />
          </div>
          
          {filteredQueries.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No queries found matching your filters</p>
              <Button onClick={() => {
                setSearchQuery("");
                setFilterStatus("all");
                setSearchParams({});
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </Container>
      </div>
      <Footer />
    </main>
  );
};

export default Queries;
