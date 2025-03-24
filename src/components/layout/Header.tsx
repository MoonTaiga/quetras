
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Home, Menu, Search, LogIn, User, LogOut, Shield } from "lucide-react";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export const Header = () => {
  const { isLoggedIn, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/queries?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-sky-100 backdrop-blur supports-[backdrop-filter]:bg-sky-100/90">
      <Container className="flex h-14 items-center">
        <div className="flex items-center gap-1 mr-4">
          <Link to="/" className="font-semibold text-xl text-sky-700">
            QUETRAS
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-5 text-sm text-sky-700">
          <Link to="/" className="text-sky-900 hover:text-sky-600">
            Home
          </Link>
          <Link to="/dashboard" className="hover:text-sky-600">Dashboard</Link>
          <Link to="/queries" className="hover:text-sky-600">Queries</Link>
          {isAdmin && (
            <>
              <Link to="#" className="flex items-center gap-1 hover:text-sky-600">
                <Shield className="h-3 w-3" /> Admin Panel
              </Link>
              <Link to="#" className="flex items-center gap-1 hover:text-sky-600">
                <Shield className="h-3 w-3" /> User Management
              </Link>
            </>
          )}
          {isLoggedIn && !isAdmin && (
            <>
              <Link to="/query/new" className="hover:text-sky-600">New Query</Link>
              <Link to="/online-payment" className="hover:text-sky-600">Online Payment</Link>
            </>
          )}
        </div>

        <div className="ml-auto flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <NotificationCenter />
              <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                <DialogTrigger asChild>
                  <Button size="icon" variant="ghost" className="text-sky-700 hover:bg-sky-200">
                    <Search className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Search Queries</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSearch} className="flex gap-2 mt-2">
                    <Input
                      placeholder="Search by ID, query title..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit">Search</Button>
                  </form>
                </DialogContent>
              </Dialog>
              <div className="hidden md:flex items-center gap-1 mr-2 text-sm">
                Welcome, <span className="font-medium">{user?.name}</span>
                {isAdmin && (
                  <span className="flex items-center ml-1 text-xs bg-sky-200 text-sky-800 px-2 py-0.5 rounded-full">
                    <Shield className="h-3 w-3 mr-1" /> Admin
                  </span>
                )}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate("/profile")}
                className="hidden md:flex mr-2 border-sky-300 hover:bg-sky-100"
              >
                Profile
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout} className="hidden md:flex border-sky-300 hover:bg-sky-100">
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm" className="hidden md:flex border-sky-300 hover:bg-sky-100">
                  <User className="h-4 w-4 mr-2" /> User Login
                </Button>
              </Link>
              <Link to="/admin-login">
                <Button variant="outline" size="sm" className="hidden md:flex border-sky-300 hover:bg-sky-100">
                  <Shield className="h-4 w-4 mr-2" /> Admin
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="hidden md:flex bg-sky-600 hover:bg-sky-700">
                  Register
                </Button>
              </Link>
            </>
          )}
          <Button size="icon" variant="ghost" className="md:hidden text-sky-700 hover:bg-sky-200">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </Container>
    </header>
  );
};
