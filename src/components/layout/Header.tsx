
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useAuth } from "@/contexts/AuthContext";
import { Logo } from "@/components/layout/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { User, LogOut } from "lucide-react";

export const Header: React.FC = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

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
              <Button variant="ghost" asChild className="hover:bg-accent flex gap-2">
                <Link to="/profile">
                  <User className="h-4 w-4" />
                  <span>{user?.name?.split(" ")[0]}</span>
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                onClick={handleLogout} 
                className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
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
