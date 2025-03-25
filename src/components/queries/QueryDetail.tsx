import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Calendar, Clock, User, Bell, X, Plus } from "lucide-react";
import { notificationService } from "@/lib/notification-service";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [note, setNote] = useState("");
  
  // Function to send a notification to the student
  const sendNotification = () => {
    notificationService.sendNotification(
      query.studentId,
      `Update on Query #${query.id}`,
      `Your ${query.queryTitle.toLowerCase()} query has been updated. Current status: ${query.status}.`
    );
  };

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

  // Function to navigate to the new query page
  const handleAddQuery = () => {
    navigate("/query/new");
  };

  return (
    <div className={cn("space-y-6", className)}>
      <Card className="overflow-hidden transition-all hover:shadow-soft dark:border-border">
        <CardHeader className="bg-accent/50 dark:bg-accent/20">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-sm text-muted-foreground">Query #{query.id}</div>
              <CardTitle className="mt-1">{query.queryTitle}</CardTitle>
            </div>
            <StatusBadge status={query.status} className="mt-1" />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 rounded-full bg-primary/10 p-1.5">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">Student</div>
                  <div className="mt-1">
                    <div>{query.studentName}</div>
                    <div className="text-sm text-muted-foreground">
                      ID: {query.studentId}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 rounded-full bg-primary/10 p-1.5">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">Submitted On</div>
                  <div className="mt-1">{query.date}</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 rounded-full bg-primary/10 p-1.5">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">Time</div>
                  <div className="mt-1">{query.time}</div>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div>
            <h3 className="text-sm font-medium">Description</h3>
            <p className="mt-2 text-sm text-muted-foreground">{query.description}</p>
          </div>

          {showNoteForm && isAdmin && (
            <div className="mt-6 bg-muted p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium">Add Note</h3>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setShowNoteForm(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <textarea 
                className="w-full p-2 border rounded-md mb-2 bg-background"
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Enter your note here..."
              />
              <Button onClick={addNote}>Submit Note</Button>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            {isAdmin ? (
              // Admin-only actions
              <>
                <Button 
                  className="transition-all hover:scale-105"
                >
                  Update Status
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowNoteForm(true)}
                  className="transition-all hover:shadow-soft"
                >
                  Add Note
                </Button>
                <Button 
                  variant="outline"
                  onClick={sendNotification}
                  className="flex items-center gap-2 transition-all hover:shadow-soft"
                >
                  <Bell className="h-4 w-4" />
                  Notify Student
                </Button>
              </>
            ) : (
              // User-only actions - limited to add/cancel
              <>
                <Button 
                  onClick={handleAddQuery} 
                  className="flex items-center gap-2 transition-all hover:scale-105"
                >
                  <Plus className="h-4 w-4" />
                  Add Query
                </Button>
                <Button 
                  variant="outline"
                  onClick={cancelQuery}
                  className="flex items-center gap-2 text-destructive hover:bg-destructive/10 transition-all"
                >
                  <X className="h-4 w-4" />
                  Cancel Query
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {query.timeline && (
        <Card className="transition-all hover:shadow-soft dark:border-border">
          <CardHeader>
            <CardTitle className="text-xl">Query Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative ml-3 space-y-4 pl-6 pt-2 before:absolute before:left-0 before:top-2 before:h-full before:w-px before:bg-border">
              {query.timeline.map((item, i) => (
                <div key={i} className="relative group">
                  <div className="absolute -left-[27px] top-[5px] h-4 w-4 rounded-full border-2 border-background bg-border group-hover:scale-110 transition-transform" />
                  <div className="text-sm font-medium">{item.title}</div>
                  <div className="text-xs text-muted-foreground">{item.date}</div>
                  <div className="mt-1 text-sm">{item.description}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export { QueryDetail };
