
import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type StatusType = "new" | "processing";

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
