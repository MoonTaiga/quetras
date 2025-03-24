
import React from "react";

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="100" height="100" rx="12" fill="currentColor" fillOpacity="0.1" />
      <path 
        d="M78 35H22V45H78V35Z" 
        fill="currentColor" 
        fillOpacity="0.8"
      />
      <path 
        d="M30 50H22V80H30V50Z" 
        fill="currentColor" 
      />
      <path 
        d="M50 50H40V60H50V50Z" 
        fill="currentColor" 
      />
      <path 
        d="M70 50H60V60H70V50Z" 
        fill="currentColor" 
      />
      <path 
        d="M50 65H40V80H50V65Z" 
        fill="currentColor" 
        fillOpacity="0.8"
      />
      <path 
        d="M70 65H60V80H70V65Z" 
        fill="currentColor" 
        fillOpacity="0.8"
      />
      <path 
        d="M78 50H75V80H78V50Z" 
        fill="currentColor" 
      />
      <circle cx="35" cy="25" r="5" fill="currentColor" />
      <circle cx="65" cy="25" r="5" fill="currentColor" />
    </svg>
  );
};
