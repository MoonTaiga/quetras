
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/container";
import { QueryDetail, QueryDetailData } from "@/components/queries/QueryDetail";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Mock detailed data for demonstration
const mockQueryDetails: Record<string, QueryDetailData> = {
  "TQ-1234": {
    id: "TQ-1234",
    studentName: "Emma Thompson",
    studentId: "ST-78901",
    queryTitle: "Scholarship Application",
    description: "Application for the Merit Scholarship Program for the Fall 2023 semester. Student has maintained a GPA of 3.8 and is eligible for consideration.",
    date: "September 15, 2023",
    time: "10:30 AM",
    status: "processing",
    timestamp: "2023-09-15T10:30:00Z",
    cashierWindow: "Window 3",
    timeline: [
      {
        date: "September 15, 2023 - 10:30 AM",
        title: "Query Submitted",
        description: "Student submitted the scholarship application query."
      },
      {
        date: "September 16, 2023 - 09:15 AM",
        title: "Under Review",
        description: "Application is being reviewed by the financial aid department."
      }
    ]
  },
  "TQ-1235": {
    id: "TQ-1235",
    studentName: "Michael Johnson",
    studentId: "ST-78902",
    queryTitle: "Late Payment Fee",
    description: "Request to waive the late payment fee of $250 due to technical issues with the payment portal. Student attempted to make the payment before the deadline but encountered system errors.",
    date: "September 18, 2023",
    time: "02:15 PM",
    status: "processing",
    timestamp: "2023-09-18T14:15:00Z",
    cashierWindow: "Window 1",
    timeline: [
      {
        date: "September 18, 2023 - 02:15 PM",
        title: "Query Submitted",
        description: "Student submitted the late fee waiver request."
      },
      {
        date: "September 19, 2023 - 10:30 AM",
        title: "Under Review",
        description: "Request is being reviewed by the accounts department. Technical logs are being checked."
      }
    ]
  },
  "TQ-1236": {
    id: "TQ-1236",
    studentName: "Sarah Williams",
    studentId: "ST-78903",
    queryTitle: "Payment Plan Request",
    description: "Request to set up a payment plan for the tuition fees for the current semester. Student is facing financial constraints and would like to pay in three installments over the next three months.",
    date: "September 20, 2023",
    time: "11:45 AM",
    status: "new",
    timestamp: "2023-09-20T11:45:00Z",
    cashierWindow: "Window 2",
    timeline: [
      {
        date: "September 20, 2023 - 11:45 AM",
        title: "Query Submitted",
        description: "Student submitted the payment plan request."
      }
    ]
  },
  "TQ-1237": {
    id: "TQ-1237",
    studentName: "James Wilson",
    studentId: "ST-78904",
    queryTitle: "Refund Request",
    description: "Request for a refund for the course 'Advanced Data Structures' which the student dropped within the refund eligibility period. Student has provided the course withdrawal confirmation.",
    date: "September 22, 2023",
    time: "09:30 AM",
    status: "new",
    timestamp: "2023-09-22T09:30:00Z",
    cashierWindow: "Window 1",
    timeline: [
      {
        date: "September 22, 2023 - 09:30 AM",
        title: "Query Submitted",
        description: "Student submitted the refund request for the dropped course."
      }
    ]
  }
};

const QueryView = () => {
  const { id } = useParams();
  const queryDetail = id ? mockQueryDetails[id] : undefined;

  if (!queryDetail) {
    return (
      <main className="min-h-screen flex flex-col bg-background">
        <Header />
        <Container className="py-12 flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-4">Query Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The query you're looking for doesn't exist or you may not have access to it.
            </p>
            <Button asChild>
              <Link to="/queries">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Queries
              </Link>
            </Button>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1 page-container animate-fade-in">
        <Container as="section" className="py-8" withGlass={false}>
          <div className="mb-6">
            <Button
              variant="ghost"
              className="mb-4 -ml-3"
              asChild
            >
              <Link to="/queries">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Queries
              </Link>
            </Button>
            <h1 className="font-semibold">Query Details</h1>
          </div>

          <QueryDetail query={queryDetail} />
        </Container>
      </div>
    </main>
  );
};

export default QueryView;
