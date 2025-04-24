
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OtherPaymentsInfoProps {
  onClose: () => void;
}

export const OtherPaymentsInfo: React.FC<OtherPaymentsInfoProps> = ({ onClose }) => {
  return (
    <div className="bg-muted/50 rounded-lg border p-4 relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-6 w-6"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </Button>
      
      <h3 className="font-medium text-sm mb-2">Other Payment Types Guide</h3>
      
      <div className="space-y-3 text-sm">
        <p>
          When you have multiple payments to make, you can select "With Other Payment" 
          to let the cashier know you need assistance with processing several payments.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
          <div className="bg-background rounded-md p-3 border">
            <h4 className="font-medium text-xs mb-1">Types of Other Payments</h4>
            <ul className="text-xs space-y-1 list-disc pl-4">
              <li>Tuition Fee</li>
              <li>Library Fee</li>
              <li>Laboratory Fee</li>
              <li>Student Activity Fee</li>
              <li>Graduation Fee</li>
            </ul>
          </div>
          
          <div className="bg-background rounded-md p-3 border">
            <h4 className="font-medium text-xs mb-1">Benefits</h4>
            <ul className="text-xs space-y-1 list-disc pl-4">
              <li>Single cashier window for all payments</li>
              <li>Consolidated receipt</li>
              <li>Expedited processing for multiple transactions</li>
              <li>Guidance on payment breakdowns</li>
            </ul>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground italic">
          Note: Please bring all relevant payment details for a smoother experience.
        </p>
      </div>
    </div>
  );
};
