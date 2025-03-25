
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  date: string;
  title: string;
  description: string;
}

interface QueryTimelineProps {
  timeline?: TimelineItem[];
}

export const QueryTimeline = ({ timeline }: QueryTimelineProps) => {
  if (!timeline) return null;

  return (
    <Card className="transition-all hover:shadow-soft dark:border-border">
      <CardHeader>
        <CardTitle className="text-xl">Query Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative ml-3 space-y-4 pl-6 pt-2 before:absolute before:left-0 before:top-2 before:h-full before:w-px before:bg-border">
          {timeline.map((item, i) => (
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
  );
};
