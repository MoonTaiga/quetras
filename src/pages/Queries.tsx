
import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { QueryContent } from "@/components/queries/QueryContent";
import { useQueryFilters } from "@/hooks/useQueryFilters";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Empty initial queries array - user will add their own
const initialQueries = [];

const Queries = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const queriesPerPage = 5;
  
  const {
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    filteredQueries,
    handleSearch,
    handleClearFilters,
    handleDeleteQuery
  } = useQueryFilters(initialQueries);

  // Calculate pagination
  const indexOfLastQuery = currentPage * queriesPerPage;
  const indexOfFirstQuery = indexOfLastQuery - queriesPerPage;
  const currentQueries = filteredQueries.slice(indexOfFirstQuery, indexOfLastQuery);
  const totalPages = Math.ceil(filteredQueries.length / queriesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1 page-container animate-fade-in">
        <QueryContent
          filteredQueries={currentQueries}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          onSearch={handleSearch}
          onClearFilters={handleClearFilters}
          onDeleteQuery={handleDeleteQuery}
        />
        
        {filteredQueries.length > 0 && (
          <div className="flex justify-center mt-6 mb-8 gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <div className="flex items-center px-4 text-sm">
              Page {currentPage} of {totalPages}
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
};

export default Queries;
