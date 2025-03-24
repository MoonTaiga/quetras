
import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { QueryContent } from "@/components/queries/QueryContent";
import { useQueryFilters } from "@/hooks/useQueryFilters";

// Empty initial queries array - user will add their own
const initialQueries = [];

const Queries = () => {
  const {
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    filteredQueries,
    handleSearch,
    handleClearFilters
  } = useQueryFilters(initialQueries);

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1 page-container animate-fade-in">
        <QueryContent
          filteredQueries={filteredQueries}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          onSearch={handleSearch}
          onClearFilters={handleClearFilters}
        />
      </div>
      <Footer />
    </main>
  );
};

export default Queries;
