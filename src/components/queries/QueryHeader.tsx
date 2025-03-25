
import React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/dashboard/StatusBadge";

interface QueryHeaderProps {
  id: string;
  title: string;
  status: "new" | "processing" | "pending" | "completed" | "cancelled";
}

export const QueryHeader = ({ id, title, status }: QueryHeaderProps) => {
  return (
    <CardHeader className="bg-accent/50 dark:bg-accent/20">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-sm text-muted-foreground">Query #{id}</div>
          <CardTitle className="mt-1">{title}</CardTitle>
        </div>
        <StatusBadge status={status} className="mt-1" />
      </div>
    </CardHeader>
  );
};
