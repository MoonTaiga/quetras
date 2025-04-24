
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Plus, AlertCircle, Edit } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface QueryActionsProps {
  id: string;
  studentId: string;
  queryTitle: string;
  status: string;
  isAdmin: boolean;
  isOwner: boolean;
  canEdit?: boolean;
  showNoteForm: boolean;
  setShowNoteForm: (show: boolean) => void;
  note: string;
  setNote: (note: string) => void;
  cancelQuery: () => void;
  addNote: () => void;
  hasOtherPayments?: boolean;
}

export const QueryActions = ({
  id,
  studentId,
  queryTitle,
  status,
  isAdmin,
  isOwner,
  canEdit = false,
  showNoteForm,
  setShowNoteForm,
  note,
  setNote,
  cancelQuery,
  addNote,
  hasOtherPayments
}: QueryActionsProps) => {
  const navigate = useNavigate();

  const handleAddQuery = () => {
    navigate("/query/new");
  };

  return (
    <div>
      {hasOtherPayments && (
        <div className="mb-4 bg-sky-50 border border-sky-100 rounded-md p-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-sky-600" />
            <p className="text-sm text-sky-800">
              This query includes additional payments to be processed.
            </p>
          </div>
        </div>
      )}
      
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
            {canEdit && (
              <Button
                variant="outline"
                asChild
                className="flex items-center gap-2 transition-all hover:shadow-soft"
              >
                <Link to={`/query/${id}/edit`}>
                  <Edit className="h-4 w-4" />
                  Edit Query
                </Link>
              </Button>
            )}
          </>
        ) : (
          <>
            <Button 
              onClick={handleAddQuery} 
              className="flex items-center gap-2 transition-all hover:scale-105"
            >
              <Plus className="h-4 w-4" />
              Add Query
            </Button>
            {canEdit && (
              <Button
                variant="outline"
                asChild
                className="flex items-center gap-2 transition-all hover:shadow-soft"
              >
                <Link to={`/query/${id}/edit`}>
                  <Edit className="h-4 w-4" />
                  Edit Query
                </Link>
              </Button>
            )}
            {isOwner && (
              <Button 
                variant="outline"
                onClick={cancelQuery}
                className="flex items-center gap-2 text-destructive hover:bg-destructive/10 transition-all"
              >
                <X className="h-4 w-4" />
                Cancel Query
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
