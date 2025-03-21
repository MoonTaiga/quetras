
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Home, Menu, Search, LogIn, User, LogOut } from "lucide-react";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";
import { useAuth } from "@/contexts/AuthContext";

export const Header = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container className="flex h-14 items-center">
        <div className="flex items-center gap-1 mr-4">
          <Link to="/" className="font-semibold text-xl">
            QUETRAS
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-5 text-sm text-muted-foreground">
          <Link to="/" className="text-foreground">
            Home
          </Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/queries">Queries</Link>
          <Link to="#">Students</Link>
          <Link to="#">Reports</Link>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <NotificationCenter />
              <Button size="icon" variant="ghost">
                <Search className="h-4 w-4" />
              </Button>
              <div className="hidden md:block mr-2 text-sm">
                Welcome, <span className="font-medium">{user?.name}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout} className="hidden md:flex">
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm" className="hidden md:flex">
                  <LogIn className="h-4 w-4 mr-2" /> Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="hidden md:flex">
                  Register
                </Button>
              </Link>
            </>
          )}
          <Button size="icon" variant="ghost" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </Container>
    </header>
  );
};
