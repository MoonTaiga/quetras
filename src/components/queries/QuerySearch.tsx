
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface QuerySearchProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  filterStatus: string;
  setFilterStatus: React.Dispatch<React.SetStateAction<string>>;
  onSearch: (e: React.FormEvent) => void;
}

export const QuerySearch = ({
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus,
  onSearch,
}: QuerySearchProps) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleNewQuery = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/query/new");
    }
  };

  return (
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

      <div className="glass rounded-xl p-6 mb-6 w-full">
        <form onSubmit={onSearch} className="flex flex-col md:flex-row gap-4">
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
    </div>
  );
};

// Import from our files
import { StatusBadge } from "@/components/dashboard/StatusBadge";
