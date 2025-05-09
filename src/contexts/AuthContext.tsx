
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type UserRole = "admin" | "user";

type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  mobileNumber?: string;
  cashierWindow?: string;
};

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, mobileNumber?: string, cashierWindow?: string) => Promise<boolean>;
  logout: () => void;
  updateUserProfile: (updatedUser: User) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is logged in when component mounts
    const storedUser = localStorage.getItem("quetras_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
        setIsAdmin(parsedUser.role === "admin");
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
      const authenticatedUser: User = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role as UserRole,
        mobileNumber: foundUser.mobileNumber,
        cashierWindow: foundUser.cashierWindow,
      };
      
      // Store in state and localStorage
      setUser(authenticatedUser);
      setIsLoggedIn(true);
      setIsAdmin(authenticatedUser.role === "admin");
      localStorage.setItem("quetras_user", JSON.stringify(authenticatedUser));
      
      toast.success(`Login successful as ${authenticatedUser.role}`);
      
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed");
      return false;
    }
  };

  const register = async (
    name: string, 
    email: string, 
    password: string,
    mobileNumber?: string,
    cashierWindow?: string
  ): Promise<boolean> => {
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
      
      // Generate a user ID (simulating auto-assignment)
      const userId = `STU${Math.floor(10000 + Math.random() * 90000)}`;
      
      // Create new user
      const newUser = {
        id: userId,
        name,
        email,
        password, // Note: In a real app, you would hash this password
        role: "user" as UserRole, // Default role for new registrations
        mobileNumber,
        cashierWindow,
      };
      
      // Add to users array
      existingUsers.push(newUser);
      localStorage.setItem("quetras_users", JSON.stringify(existingUsers));
      
      toast.success("Registration successful! Please log in with your new account.");
      
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed");
      return false;
    }
  };

  const updateUserProfile = (updatedUser: User) => {
    try {
      // Update the user in memory
      setUser(updatedUser);
      
      // Update the user in localStorage
      localStorage.setItem("quetras_user", JSON.stringify(updatedUser));
      
      // Also update the user in the users array
      const existingUsers = JSON.parse(localStorage.getItem("quetras_users") || "[]");
      const userIndex = existingUsers.findIndex((u: any) => u.id === updatedUser.id);
      
      if (userIndex !== -1) {
        // Preserve the password
        const password = existingUsers[userIndex].password;
        existingUsers[userIndex] = { ...updatedUser, password };
        localStorage.setItem("quetras_users", JSON.stringify(existingUsers));
      }
      
      return true;
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
    localStorage.removeItem("quetras_user");
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoggedIn, 
      isAdmin, 
      login, 
      register, 
      logout,
      updateUserProfile 
    }}>
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
