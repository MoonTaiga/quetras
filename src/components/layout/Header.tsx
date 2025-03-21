
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  transparent?: boolean;
}

const Header = ({ className, transparent = false, ...props }: HeaderProps) => {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full py-4",
        transparent ? "bg-transparent" : "glass",
        "transition-all duration-200 ease-apple",
        className
      )}
      {...props}
    >
      <Container>
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary"></div>
            <span className="text-lg font-medium">TuitionQuery</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-6">
              <NavLink to="/">Dashboard</NavLink>
              <NavLink to="/queries">Queries</NavLink>
            </nav>
            
            <Button variant="outline" size="icon" className="rounded-full">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
};

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
}

const NavLink = ({ to, children, className, ...props }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export { Header };
