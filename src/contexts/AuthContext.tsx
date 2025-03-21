
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is logged in when component mounts
    const storedUser = localStorage.getItem("quetras_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("quetras_user");
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // In a real app, this would make an API call to authenticate
      // For demo purposes, we'll check against mock users in localStorage
      
      const mockUsers = JSON.parse(localStorage.getItem("quetras_users") || "[]");
      const foundUser = mockUsers.find((u: any) => u.email === email);
      
      if (!foundUser) {
        toast.error("User not found");
        return false;
      }
      
      if (foundUser.password !== password) {
        toast.error("Invalid password");
        return false;
      }
      
      // Create user object (excluding password)
      const authenticatedUser = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email
      };
      
      // Store in state and localStorage
      setUser(authenticatedUser);
      setIsLoggedIn(true);
      localStorage.setItem("quetras_user", JSON.stringify(authenticatedUser));
      
      toast.success("Login successful");
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed");
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // In a real app, this would make an API call to register
      // For demo purposes, we'll store in localStorage
      
      // Get existing users or initialize empty array
      const existingUsers = JSON.parse(localStorage.getItem("quetras_users") || "[]");
      
      // Check if email already exists
      if (existingUsers.some((user: any) => user.email === email)) {
        toast.error("Email already registered");
        return false;
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password // Note: In a real app, you would hash this password
      };
      
      // Add to users array
      existingUsers.push(newUser);
      localStorage.setItem("quetras_users", JSON.stringify(existingUsers));
      
      // Log the user in automatically
      const authenticatedUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      };
      
      setUser(authenticatedUser);
      setIsLoggedIn(true);
      localStorage.setItem("quetras_user", JSON.stringify(authenticatedUser));
      
      toast.success("Registration successful");
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("quetras_user");
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
