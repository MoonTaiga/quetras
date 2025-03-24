
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/container";
import { QueryTable, QueryData } from "@/components/dashboard/QueryTable";
import { Footer } from "@/components/layout/Footer";
import { QuerySearch } from "@/components/queries/QuerySearch";
import { QueryEmptyState } from "@/components/queries/QueryEmptyState";

// Empty initial queries array - user will add their own
const initialQueries: QueryData[] = [];

const Queries = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  
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

  const handleClearFilters = () => {
    setSearchQuery("");
    setFilterStatus("all");
    setSearchParams({});
  };

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1 page-container animate-fade-in">
        <Container as="section" className="py-8" withGlass={false}>
          <QuerySearch 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            onSearch={handleSearch}
          />

          <div className="glass rounded-xl p-1 overflow-hidden">
            <QueryTable queries={filteredQueries} />
          </div>
          
          {filteredQueries.length === 0 && (
            <QueryEmptyState onClearFilters={handleClearFilters} />
          )}
        </Container>
      </div>
      <Footer />
    </main>
  );
};

export default Queries;
