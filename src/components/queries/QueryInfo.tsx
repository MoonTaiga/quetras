
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, User } from "lucide-react";

interface QueryInfoProps {
  studentName: string;
  studentId: string;
  date: string;
  time: string;
  description: string;
}

export const QueryInfo = ({ 
  studentName, 
  studentId, 
  date, 
  time, 
  description
}: QueryInfoProps) => {
  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="mt-1 rounded-full bg-primary/10 p-1.5">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="text-sm font-medium">Student</div>
              <div className="mt-1">
                <div>{studentName}</div>
                <div className="text-sm text-muted-foreground">
                  ID: {studentId}
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
              <div className="mt-1">{date}</div>
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
              <div className="mt-1">{time}</div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      <div>
        <h3 className="text-sm font-medium">Description</h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>
    </>
  );
};
