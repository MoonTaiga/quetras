
import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  className,
}: StatCardProps) => {
  return (
    <Card className={cn("overflow-hidden transition-all", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && (
          <div className="h-8 w-8 rounded-md bg-accent/50 p-1.5 text-foreground">
            <Icon className="h-full w-full" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(description || trend) && (
          <div className="mt-2 flex items-center text-xs text-muted-foreground">
            {trend && (
              <div
                className={cn(
                  "mr-2 flex items-center rounded-sm px-1 py-0.5",
                  trend === "up" && "text-green-500 bg-green-100/50",
                  trend === "down" && "text-red-500 bg-red-100/50",
                  trend === "neutral" && "text-tuition-500 bg-tuition-100/50"
                )}
              >
                {trendValue}
              </div>
            )}
            {description}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export { StatCard };
