
import React from "react";
import { Container } from "@/components/ui/container";
import { Facebook, Instagram, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t bg-sky-50 py-8">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="font-semibold text-sky-800 text-lg">QUETRAS</h3>
            <p className="text-sm text-sky-600 mt-1">
              Tuition Query Management System
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <a 
              href="jrexbutdiff@gmail.com" 
              className="text-sky-600 hover:text-sky-800 transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sky-600 hover:text-sky-800 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a 
              href="https://www.facebook.com/moontaiga.me/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sky-600 hover:text-sky-800 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-sky-500">
            &copy; {new Date().getFullYear()} QUETRAS. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};
