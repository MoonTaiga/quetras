
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useAuth } from "@/contexts/AuthContext";
import { Logo } from "@/components/layout/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User, LogOut } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const Header: React.FC = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      const storedImage = localStorage.getItem(`profile_image_${user.id}`);
      if (storedImage) {
        setProfileImage(storedImage);
      }
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="py-4 border-b border-border bg-background/60 backdrop-blur-md sticky top-0 z-10">
      <Container className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Logo className="w-10 h-10 text-primary" />
            <span className="ml-2 font-bold text-xl">QUETRAS</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            {isLoggedIn && (
              <>
                <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
                  Dashboard
                </Link>
                <Link to="/queries" className="text-sm font-medium hover:text-primary transition-colors">
                  Queries
                </Link>
              </>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <Button variant="ghost" asChild className="hover:bg-accent flex gap-2 items-center">
                <Link to="/profile">
                  {profileImage ? (
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={profileImage} alt={user?.name || "User"} />
                      <AvatarFallback>{user?.name?.split(" ").map(n => n[0]).join("") || "U"}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <User className="h-4 w-4 mr-2" />
                  )}
                  <span>{user?.name?.split(" ")[0]}</span>
                </Link>
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Logout Confirmation</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to log out of your account?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleLogout}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Log Out
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};
