
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Edit, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export interface QueryData {
  id: string;
  studentName: string;
  studentId: string;
  queryTitle: string;
  date: string;
  status: "new" | "processing" | "pending" | "completed" | "cancelled";
}

interface QueryTableProps {
  queries: QueryData[];
  className?: string;
  onDeleteQuery?: (id: string) => void;
}

const QueryTable = ({ queries, className, onDeleteQuery }: QueryTableProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAdmin } = useAuth();
  const [profileImages, setProfileImages] = useState<Record<string, string | null>>({});
  
  // Load all profile images at once
  useEffect(() => {
    const images: Record<string, string | null> = {};
    
    queries.forEach(query => {
      const storedImage = localStorage.getItem(`profile_image_${query.studentId}`);
      images[query.studentId] = storedImage || null;
    });
    
    setProfileImages(images);
  }, [queries]);
  
  // Function to check if user can edit a query
  const canEditQuery = (queryStudentId: string) => {
    return isAdmin || (user && user.id === queryStudentId);
  };

  // Function to check if user can delete a query
  const canDeleteQuery = (queryStudentId: string) => {
    return isAdmin || (user && user.id === queryStudentId);
  };

  return (
    <div className={className}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Student</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {queries.map((query) => (
            <TableRow 
              key={query.id} 
              className={`transition-colors hover:bg-muted/30 ${
                query.status === "cancelled" ? "opacity-60" : ""
              }`}
            >
              <TableCell className="font-medium">{query.id}</TableCell>
              <TableCell>
                <Link 
                  to={`/profile?userId=${query.studentId}`}
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Avatar className="h-6 w-6">
                    {profileImages[query.studentId] ? (
                      <AvatarImage src={profileImages[query.studentId] || ""} alt={query.studentName} />
                    ) : (
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {query.studentName.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  {query.studentName}
                </Link>
              </TableCell>
              <TableCell>{query.queryTitle}</TableCell>
              <TableCell>{query.date}</TableCell>
              <TableCell>
                <StatusBadge status={query.status} />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  {canEditQuery(query.studentId) && (
                    <Button
                      asChild
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-8 w-8 transition-transform hover:scale-110 hover:bg-muted"
                    >
                      <Link to={`/query/${query.id}/edit`}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit query</span>
                      </Link>
                    </Button>
                  )}
                  
                  {canDeleteQuery(query.studentId) && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full h-8 w-8 transition-transform hover:scale-110 hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete query</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete this query?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the query from the system.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => onDeleteQuery && onDeleteQuery(query.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export { QueryTable };
