
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { QueryData } from "@/components/dashboard/QueryTable";

export const useQueryFilters = (initialQueries: QueryData[] = []) => {
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

  return {
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    filteredQueries,
    handleSearch,
    handleClearFilters
  };
};
