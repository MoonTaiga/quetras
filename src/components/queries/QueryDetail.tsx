
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { QueryHeader } from "./QueryHeader";
import { QueryInfo } from "./QueryInfo";
import { QueryActions } from "./QueryActions";
import { QueryTimeline } from "./QueryTimeline";

export interface QueryDetailData {
  id: string;
  studentName: string;
  studentId: string;
  queryTitle: string;
  description: string;
  date: string;
  time: string;
  status: "new" | "processing" | "pending" | "completed" | "cancelled";
  timeline?: {
    date: string;
    title: string;
    description: string;
  }[];
}

interface QueryDetailProps {
  query: QueryDetailData;
  className?: string;
}

const QueryDetail = ({ query, className }: QueryDetailProps) => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [note, setNote] = useState("");
  
  // Function to cancel a query (for users)
  const cancelQuery = () => {
    // Get all queries from localStorage
    const storedQueries = localStorage.getItem("quetras_queries");
    if (storedQueries) {
      try {
        const queries = JSON.parse(storedQueries);
        
        // Find the index of the current query
        const queryIndex = queries.findIndex((q: any) => q.id === query.id);
        
        if (queryIndex !== -1) {
          // Update the status to cancelled
          queries[queryIndex].status = "cancelled";
          
          // Reorder queries - move cancelled query to the end
          const cancelledQuery = queries.splice(queryIndex, 1)[0];
          queries.push(cancelledQuery);
          
          // Save updated queries back to localStorage
          localStorage.setItem("quetras_queries", JSON.stringify(queries));
          
          toast.success("Query cancelled successfully");
          
          // Redirect to queries list
          navigate("/queries");
        }
      } catch (error) {
        console.error("Failed to update queries:", error);
        toast.error("Failed to cancel query");
      }
    }
  };

  // Function to add a note (for admins)
  const addNote = () => {
    if (note.trim()) {
      // In a real app, this would make an API call to add the note to the query
      toast.success("Note added successfully");
      setShowNoteForm(false);
      setNote("");
    }
  };

  return (
    <div className={className}>
      <Card className="overflow-hidden transition-all hover:shadow-soft dark:border-border">
        <QueryHeader 
          id={query.id} 
          title={query.queryTitle} 
          status={query.status} 
        />
        <CardContent className="p-6">
          <QueryInfo 
            studentName={query.studentName}
            studentId={query.studentId}
            date={query.date}
            time={query.time}
            description={query.description}
          />
          
          <QueryActions 
            id={query.id}
            studentId={query.studentId}
            queryTitle={query.queryTitle}
            status={query.status}
            isAdmin={isAdmin}
            showNoteForm={showNoteForm}
            setShowNoteForm={setShowNoteForm}
            note={note}
            setNote={setNote}
            cancelQuery={cancelQuery}
            addNote={addNote}
          />
        </CardContent>
      </Card>

      <QueryTimeline timeline={query.timeline} />
    </div>
  );
};

export { QueryDetail };
