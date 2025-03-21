
import React from "react";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/container";
import { StatCard } from "@/components/dashboard/StatCard";
import { QueryTable, QueryData } from "@/components/dashboard/QueryTable";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  CalendarClock, 
  DollarSign, 
  FileText, 
  Plus, 
  Users 
} from "lucide-react";

// Mock data for demonstration
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
];

const Index = () => {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1 page-container animate-fade-in">
        <Container as="section" className="py-8" withGlass={false}>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-semibold">Tuition Query Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Monitor and manage all tuition payment queries
              </p>
            </div>
            <Button asChild>
              <Link to="/query/new">
                <Plus className="mr-2 h-4 w-4" />
                New Query
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Queries"
              value="257"
              description="This month"
              icon={FileText}
              trend="up"
              trendValue="+12%"
            />
            <StatCard
              title="Active Students"
              value="1,234"
              description="Across all programs"
              icon={Users}
              trend="neutral"
              trendValue="+2%"
            />
            <StatCard
              title="Processing Time"
              value="1.5 days"
              description="Average resolution time"
              icon={CalendarClock}
              trend="down"
              trendValue="-8%"
            />
            <StatCard
              title="Total Amount"
              value="$157,290"
              description="Current semester"
              icon={DollarSign}
              trend="up"
              trendValue="+15%"
            />
          </div>

          <div className="mt-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Recent Queries</h2>
              <Button variant="ghost" asChild>
                <Link to="/queries">View All</Link>
              </Button>
            </div>
            <div className="glass rounded-xl p-1 overflow-hidden">
              <QueryTable queries={mockQueries} />
            </div>
          </div>
        </Container>
      </div>
    </main>
  );
};

export default Index;
