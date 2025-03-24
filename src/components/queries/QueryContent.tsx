
import React from "react";
import { Container } from "@/components/ui/container";
import { QueryTable, QueryData } from "@/components/dashboard/QueryTable";
import { QuerySearch } from "@/components/queries/QuerySearch";
import { QueryEmptyState } from "@/components/queries/QueryEmptyState";

interface QueryContentProps {
  filteredQueries: QueryData[];
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  filterStatus: string;
  setFilterStatus: React.Dispatch<React.SetStateAction<string>>;
  onSearch: (e: React.FormEvent) => void;
  onClearFilters: () => void;
}

export const QueryContent: React.FC<QueryContentProps> = ({
  filteredQueries,
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus,
  onSearch,
  onClearFilters
}) => {
  return (
    <Container as="section" className="py-8 animate-fade-in" withGlass={false}>
      <QuerySearch 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        onSearch={onSearch}
      />

      <div className="glass rounded-xl p-1 overflow-hidden transition-all hover:shadow-soft">
        <QueryTable queries={filteredQueries} />
      </div>
      
      {filteredQueries.length === 0 && (
        <QueryEmptyState onClearFilters={onClearFilters} />
      )}
    </Container>
  );
};
