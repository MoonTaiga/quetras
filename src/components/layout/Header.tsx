
import React from "react";
import { Link } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Home, Menu, Search } from "lucide-react";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container className="flex h-14 items-center">
        <div className="flex items-center gap-1 mr-4">
          <Link to="/" className="font-semibold">
            Tuition Query Tracker
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-5 text-sm text-muted-foreground">
          <Link to="/" className="text-foreground">
            Dashboard
          </Link>
          <Link to="/queries">Queries</Link>
          <Link to="#">Students</Link>
          <Link to="#">Reports</Link>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <NotificationCenter />
          <Button size="icon" variant="ghost">
            <Search className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </Container>
    </header>
  );
};
