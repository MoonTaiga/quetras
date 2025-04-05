
import React, { useState, useEffect } from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatInTimeZone } from "date-fns-tz";
import { Clock } from "lucide-react";

interface QueryHeaderProps {
  id: string;
  title: string;
  status: "new" | "processing" | "pending" | "completed" | "cancelled";
  studentId?: string;
  studentName?: string;
  timestamp?: string; // ISO string
}

export const QueryHeader = ({ 
  id, 
  title, 
  status, 
  studentId, 
  studentName, 
  timestamp
}: QueryHeaderProps) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  useEffect(() => {
    if (studentId) {
      const storedImage = localStorage.getItem(`profile_image_${studentId}`);
      if (storedImage) {
        setProfileImage(storedImage);
      }
    }
  }, [studentId]);
  
  const formattedTime = timestamp 
    ? formatInTimeZone(new Date(timestamp), Intl.DateTimeFormat().resolvedOptions().timeZone, "hh:mm a")
    : null;

  return (
    <CardHeader className="bg-accent/50 dark:bg-accent/20">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex-1">
          <div className="text-sm text-muted-foreground">Query #{id}</div>
          <CardTitle className="mt-1">{title}</CardTitle>
          
          {timestamp && formattedTime && (
            <div className="flex items-center mt-1 text-sm text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              {formattedTime}
            </div>
          )}
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <StatusBadge status={status} className="mt-1" />
          
          {studentId && studentName && (
            <Link to={`/profile?userId=${studentId}`} className="flex items-center gap-2 hover:opacity-80 transition-all">
              <div className="text-sm text-right text-muted-foreground">{studentName}</div>
              <Avatar className="h-8 w-8 transition-transform hover:scale-110">
                {profileImage ? (
                  <AvatarImage src={profileImage} alt={studentName} />
                ) : (
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {studentName.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                )}
              </Avatar>
            </Link>
          )}
        </div>
      </div>
    </CardHeader>
  );
};
