
import React, { useState } from "react";
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

// Extended mock data for demonstration
const mockQueries: QueryData[] = [
  {
    id: "TQ-1234",
    studentName: "Emma Thompson",
    queryTitle: "Scholarship Application",
    amount: 1500.00,
    date: "2023-09-15",
    status: "completed",
  },
  {
    id: "TQ-1235",
    studentName: "Michael Johnson",
    queryTitle: "Late Payment Fee",
    amount: 250.00,
    date: "2023-09-18",
    status: "processing",
  },
  {
    id: "TQ-1236",
    studentName: "Sarah Williams",
    queryTitle: "Payment Plan Request",
    amount: 3200.00,
    date: "2023-09-20",
    status: "pending",
  },
  {
    id: "TQ-1237",
    studentName: "James Wilson",
    queryTitle: "Refund Request",
    amount: 750.00,
    date: "2023-09-22",
    status: "new",
  },
  {
    id: "TQ-1238",
    studentName: "David Brown",
    queryTitle: "Tuition Discount Inquiry",
    amount: 1200.00,
    date: "2023-09-23",
    status: "pending",
  },
  {
    id: "TQ-1239",
    studentName: "Lisa Miller",
    queryTitle: "Financial Aid Question",
    amount: 950.00,
    date: "2023-09-24",
    status: "new",
  },
  {
    id: "TQ-1240",
    studentName: "Robert Davis",
    queryTitle: "International Student Fee",
    amount: 3500.00,
    date: "2023-09-25",
    status: "completed",
  },
  {
    id: "TQ-1241",
    studentName: "Jennifer Garcia",
    queryTitle: "Payment Confirmation",
    amount: 2100.00,
    date: "2023-09-26",
    status: "cancelled",
  },
];

const Queries = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Filter the queries based on search query and status filter
  const filteredQueries = mockQueries.filter((query) => {
    const matchesSearch =
      query.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      query.queryTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      query.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || query.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

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
            <Button asChild>
              <Link to="/query/new">
                <Plus className="mr-2 h-4 w-4" />
                New Query
              </Link>
            </Button>
          </div>

          <div className="glass rounded-xl p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
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
            </div>
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
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </Container>
      </div>
    </main>
  );
};

export default Queries;
