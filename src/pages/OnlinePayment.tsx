
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreditCard, Wallet } from "lucide-react";

const OnlinePayment = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      toast.error("You must be logged in to make a payment");
      navigate("/login");
      return;
    }

    if (!name || !email || !amount || !paymentMethod) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    // Simulate processing payment
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast.success("Payment processed successfully", {
        description: `Your payment of $${amount} has been received.`,
      });
      
      // Redirect to the queries list
      navigate("/queries");
    }, 2000);
  };

  // Redirect to login if not logged in
  if (!isLoggedIn) {
    navigate("/login");
    return null;
  }

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1 page-container animate-fade-in">
        <Container as="section" className="py-8 max-w-2xl mx-auto" withGlass={false}>
          <Button
            variant="ghost"
            className="mb-4 -ml-3"
            asChild
          >
            <Link to="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Online Payment</CardTitle>
              <CardDescription>
                Make a payment using your preferred payment method
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium mb-1">
                      Amount ($)
                    </label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="paymentMethod" className="block text-sm font-medium mb-1">
                      Payment Method
                    </label>
                    <Select 
                      value={paymentMethod} 
                      onValueChange={setPaymentMethod}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paypal">
                          <div className="flex items-center">
                            <CreditCard className="h-4 w-4 mr-2 text-blue-500" />
                            PayPal
                          </div>
                        </SelectItem>
                        <SelectItem value="gcash">
                          <div className="flex items-center">
                            <Wallet className="h-4 w-4 mr-2 text-green-500" />
                            GCash
                          </div>
                        </SelectItem>
                        <SelectItem value="credit_card">
                          <div className="flex items-center">
                            <CreditCard className="h-4 w-4 mr-2 text-purple-500" />
                            Credit/Debit Card
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleSubmit}
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Make Payment"}
              </Button>
            </CardFooter>
          </Card>
        </Container>
      </div>
    </main>
  );
};

export default OnlinePayment;
