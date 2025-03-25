
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell, X, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { notificationService } from "@/lib/notification-service";

interface QueryActionsProps {
  id: string;
  studentId: string;
  queryTitle: string;
  status: string;
  isAdmin: boolean;
  showNoteForm: boolean;
  setShowNoteForm: (show: boolean) => void;
  note: string;
  setNote: (note: string) => void;
  cancelQuery: () => void;
  addNote: () => void;
}

export const QueryActions = ({
  id,
  studentId,
  queryTitle,
  status,
  isAdmin,
  showNoteForm,
  setShowNoteForm,
  note,
  setNote,
  cancelQuery,
  addNote
}: QueryActionsProps) => {
  const navigate = useNavigate();

  // Function to navigate to the new query page
  const handleAddQuery = () => {
    navigate("/query/new");
  };

  // Function to send a notification to the student
  const sendNotification = () => {
    notificationService.sendNotification(
      studentId,
      `Update on Query #${id}`,
      `Your ${queryTitle.toLowerCase()} query has been updated. Current status: ${status}.`
    );
    toast.success("Notification sent to student");
  };

  return (
    <div>
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
    </div>
  );
};
