
import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type StatusType = "new" | "processing" | "pending" | "completed" | "cancelled";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const getStatusConfig = (status: StatusType) => {
  switch (status) {
    case "new":
      return {
        label: "New",
        className: "bg-blue-100 text-blue-700 hover:bg-blue-200",
      };
    case "processing":
      return {
        label: "Processing",
        className: "bg-amber-100 text-amber-700 hover:bg-amber-200",
      };
    case "pending":
      return {
        label: "Pending",
        className: "bg-purple-100 text-purple-700 hover:bg-purple-200",
      };
    case "completed":
      return {
        label: "Completed",
        className: "bg-green-100 text-green-700 hover:bg-green-200",
      };
    case "cancelled":
      return {
        label: "Cancelled",
        className: "bg-red-100 text-red-700 hover:bg-red-200",
      };
    default:
      return {
        label: status,
        className: "bg-gray-100 text-gray-700 hover:bg-gray-200",
      };
  }
};

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = getStatusConfig(status);

  return (
    <Badge
      variant="outline"
      className={cn(
        "font-normal capitalize transition-all", 
        config.className, 
        className
      )}
    >
      {config.label}
    </Badge>
  );
};

export { StatusBadge };
