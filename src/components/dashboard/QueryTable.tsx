
import React from "react";
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
import { ArrowRight } from "lucide-react";

export interface QueryData {
  id: string;
  studentName: string;
  queryTitle: string;
  amount: number;
  date: string;
  status: "new" | "processing" | "pending" | "completed" | "cancelled";
}

interface QueryTableProps {
  queries: QueryData[];
  className?: string;
}

const QueryTable = ({ queries, className }: QueryTableProps) => {
  return (
    <div className={className}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Student</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {queries.map((query) => (
            <TableRow key={query.id} className="transition-colors hover:bg-muted/30">
              <TableCell className="font-medium">{query.id}</TableCell>
              <TableCell>{query.studentName}</TableCell>
              <TableCell>{query.queryTitle}</TableCell>
              <TableCell className="text-right">
                ${query.amount.toFixed(2)}
              </TableCell>
              <TableCell>{query.date}</TableCell>
              <TableCell>
                <StatusBadge status={query.status} />
              </TableCell>
              <TableCell className="text-right">
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-8 w-8"
                >
                  <Link to={`/query/${query.id}`}>
                    <ArrowRight className="h-4 w-4" />
                    <span className="sr-only">View query</span>
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export { QueryTable };
