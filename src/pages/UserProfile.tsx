
import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BellRing, ArrowLeft, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const profileSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  mobileNumber: z.string().min(10, { message: "Please enter a valid mobile number" }),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, updateUserProfile } = useAuth();
  const [viewOnly, setViewOnly] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  useEffect(() => {
    // Check if we're in view-only mode (when userId is in the URL)
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    
    if (userId && userId !== user?.id) {
      setViewOnly(true);
      // In a real app, fetch the user profile data for the given userId
      // For now, we'll just disable editing
    }
    
    // Load profile image if exists
    const storedImage = localStorage.getItem(`profile_image_${user?.id}`);
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, [user]);
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.name || "",
      mobileNumber: user?.mobileNumber || "",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      // In a real app, this would update the user profile in the database
      console.log("Updating user profile:", data);
      
      // Simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save profile image to localStorage (in a real app, upload to server)
      if (profileImage) {
        localStorage.setItem(`profile_image_${user?.id}`, profileImage);
      }
      
      // Update the user context with new profile data
      if (updateUserProfile) {
        updateUserProfile({
          ...user!,
          name: data.fullName,
          mobileNumber: data.mobileNumber,
        });
      }
      
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile");
    }
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
            className="mb-4 -ml-3 transition-all hover:scale-105"
            asChild
          >
            <Link to="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          
          <Card className="transition-all hover:shadow-lg">
            <CardHeader className="space-y-1">
              <div className="flex justify-center mb-4">
                <div className="relative group">
                  <Avatar className="h-24 w-24 border-2 border-primary/20">
                    {profileImage ? (
                      <AvatarImage src={profileImage} alt={user?.name || "User"} />
                    ) : (
                      <AvatarFallback className="text-lg bg-primary/10">
                        {user?.name?.split(" ").map(n => n[0]).join("") || "U"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  
                  {!viewOnly && (
                    <label 
                      htmlFor="profile-picture" 
                      className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                    >
                      <Upload className="h-6 w-6" />
                      <input 
                        id="profile-picture" 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        className="sr-only" 
                      />
                    </label>
                  )}
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center">
                {viewOnly ? "User Profile" : "Your Profile"}
              </CardTitle>
              <CardDescription className="text-center">
                {user?.email} | ID: {user?.id}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              {!viewOnly && (
                <Alert className="mb-6 bg-sky-50 border-sky-200">
                  <AlertDescription className="flex items-start gap-2">
                    <BellRing className="h-5 w-5 text-sky-600 flex-shrink-0 mt-0.5" />
                    <span>
                      Keep your contact information up-to-date to receive notifications about your queries.
                    </span>
                  </AlertDescription>
                </Alert>
              )}
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="John Doe" 
                            {...field} 
                            className="transition-all focus:border-sky-300 hover:border-sky-200" 
                            disabled={viewOnly}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="mobileNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile Number</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="+1 234 567 8900" 
                            {...field} 
                            className="transition-all focus:border-sky-300 hover:border-sky-200" 
                            disabled={viewOnly}
                          />
                        </FormControl>
                        <FormDescription>
                          You'll receive notifications when your query status changes.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {!viewOnly && (
                    <Button 
                      type="submit" 
                      className="w-full transition-all bg-sky-600 hover:bg-sky-700 hover:scale-[1.01]" 
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting ? "Saving..." : "Save Profile"}
                    </Button>
                  )}
                </form>
              </Form>
            </CardContent>
            {!viewOnly && (
              <CardFooter className="flex justify-center border-t pt-6">
                <Button variant="outline" asChild className="transition-all hover:bg-sky-50 hover:scale-105">
                  <Link to="/online-payment">
                    Make Online Payment
                  </Link>
                </Button>
              </CardFooter>
            )}
          </Card>
        </Container>
      </div>
    </main>
  );
};

export default UserProfile;
