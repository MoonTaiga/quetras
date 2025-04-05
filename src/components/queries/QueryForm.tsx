
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { HelpCircle } from "lucide-react";
import { OtherPaymentsInfo } from "@/components/queries/OtherPaymentsInfo";
import { Card, CardContent } from "@/components/ui/card";

interface QueryFormProps {
  onSubmitSuccess?: () => void;
}

const QueryForm: React.FC<QueryFormProps> = ({ onSubmitSuccess }) => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [queryTitle, setQueryTitle] = useState("");
  const [hasOtherPayments, setHasOtherPayments] = useState(false);
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      toast.error("You must be logged in to submit a query");
      navigate("/login");
      return;
    }

    if (!queryTitle) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    // Get existing queries to determine query number
    const existingQueries = JSON.parse(localStorage.getItem("quetras_queries") || "[]");
    
    // Generate a new query ID
    const newQueryId = `TQ-${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Create new query object
    const newQuery = {
      id: newQueryId,
      studentName: user?.name || "Anonymous",
      studentId: user?.id || "unknown",
      queryTitle: queryTitle,
      date: new Date().toISOString().split('T')[0],
      status: "new",
      hasOtherPayments: hasOtherPayments,
    };
    
    // Add new query to existing queries
    const updatedQueries = [newQuery, ...existingQueries];
    
    // Save to localStorage
    localStorage.setItem("quetras_queries", JSON.stringify(updatedQueries));
    
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast.success("Query submitted successfully", {
        description: `Your query ID is ${newQueryId}`,
      });
      
      // Check if this query is in top 10
      if (updatedQueries.length <= 10) {
        // Send notification email (in a real app)
        toast.success("You are in the top 10 queries!", {
          description: "You will receive notifications about your query status.",
        });
      }
      
      // Show additional information if user has other payments
      if (hasOtherPayments) {
        toast.info("Additional payments noted", {
          description: "We've recorded that you have other payments to process.",
        });
      }
      
      // Callback if provided
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
      
      // Redirect to the queries list
      navigate("/queries");
    }, 1000);
  };

  return (
    <CardContent>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="queryTitle" className="block text-sm font-medium text-foreground">
                Query Title
              </label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                className={`px-3 py-1 h-auto text-xs ${hasOtherPayments ? 'bg-sky-100 text-sky-700 border-sky-200' : ''}`}
                onClick={() => setHasOtherPayments(!hasOtherPayments)}
              >
                {hasOtherPayments ? 'With Other Payment ✓' : 'With Other Payment'}
              </Button>
            </div>
            <Input
              id="queryTitle"
              placeholder="e.g., Scholarship Application, Refund Request"
              value={queryTitle}
              onChange={(e) => setQueryTitle(e.target.value)}
              required
            />
          </div>

          {hasOtherPayments && (
            <div className="bg-sky-50 rounded-md p-3 border border-sky-100">
              <div className="flex items-start gap-2">
                <HelpCircle className="h-5 w-5 text-sky-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-sky-800">
                  You've indicated you have other payments to be processed. 
                  Our staff will guide you through consolidating multiple payments when handling your query.
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowPaymentInfo(!showPaymentInfo)}
              className="text-xs text-muted-foreground"
            >
              Need help with multiple payments?
            </Button>
          </div>
        </div>
        
        {showPaymentInfo && <OtherPaymentsInfo onClose={() => setShowPaymentInfo(false)} />}
        
        <Button 
          type="submit" 
          className="w-full bg-sky-600 hover:bg-sky-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Query"}
        </Button>
      </form>
    </CardContent>
  );
};

export default QueryForm;
