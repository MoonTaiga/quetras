
import React from "react";
import { Button } from "@/components/ui/button";

interface QueryEmptyStateProps {
  onClearFilters: () => void;
}

export const QueryEmptyState = ({ onClearFilters }: QueryEmptyStateProps) => {
  return (
    <div className="text-center py-12">
      <p className="text-muted-foreground mb-4">No queries found matching your filters</p>
      <Button onClick={onClearFilters}>
        Clear Filters
      </Button>
    </div>
  );
};
