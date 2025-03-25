
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
        const parsedQueries = JSON.parse(storedQueries);
        
        // Sort queries - move cancelled to the end, new ones to the front
        const sortedQueries = parsedQueries.sort((a: QueryData, b: QueryData) => {
          // If a is cancelled but b isn't, a goes after b
          if (a.status === "cancelled" && b.status !== "cancelled") return 1;
          // If b is cancelled but a isn't, a goes before b
          if (b.status === "cancelled" && a.status !== "cancelled") return -1;
          // If both are cancelled or neither are, sort by date (newest first)
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        
        setQueries(sortedQueries);
      } catch (error) {
        console.error("Failed to parse stored queries:", error);
      }
    }
  }, [initialSearch]);

  // Listen for changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const storedQueries = localStorage.getItem("quetras_queries");
      if (storedQueries) {
        try {
          const parsedQueries = JSON.parse(storedQueries);
          
          // Sort queries - move cancelled to the end, new ones to the front
          const sortedQueries = parsedQueries.sort((a: QueryData, b: QueryData) => {
            // If a is cancelled but b isn't, a goes after b
            if (a.status === "cancelled" && b.status !== "cancelled") return 1;
            // If b is cancelled but a isn't, a goes before b
            if (b.status === "cancelled" && a.status !== "cancelled") return -1;
            // If both are cancelled or neither are, sort by date (newest first)
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });
          
          setQueries(sortedQueries);
        } catch (error) {
          console.error("Failed to parse stored queries:", error);
        }
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

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
      } catch (error) {
        console.error("Failed to delete query:", error);
      }
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    filteredQueries,
    handleSearch,
    handleClearFilters,
    handleDeleteQuery
  };
};
