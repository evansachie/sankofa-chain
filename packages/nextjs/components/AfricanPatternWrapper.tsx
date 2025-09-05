"use client";

import React from "react";
import { usePathname } from "next/navigation";
import EnhancedAfricanPatterns from "./shared/patterns/AfricanPatternSidebar";

interface AfricanPatternWrapperProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Final wrapper component that adds African patterns
 * Adapts pattern style and visibility based on current route
 */
const AfricanPatternWrapper: React.FC<AfricanPatternWrapperProps> = ({ children, className = "" }) => {
  const pathname = usePathname();

  // Route-specific pattern configuration
  const getPatternConfig = () => {
    switch (pathname) {
      case "/":
        return { variant: "kente" as const, opacity: 0.15, show: true };
      case "/marketplace":
        return { variant: "kente" as const, opacity: 0.12, show: true };
      case "/creators":
        return { variant: "adinkra" as const, opacity: 0.18, show: true };
      case "/brands":
        return { variant: "mudcloth" as const, opacity: 0.14, show: true };
      case "/debug":
        return { variant: "kente" as const, opacity: 0, show: false };
      default:
        return { variant: "kente" as const, opacity: 0.15, show: true };
    }
  };

  const { variant, opacity, show } = getPatternConfig();

  return (
    <div className={`relative ${className}`}>
      {show && (
        <>
          <EnhancedAfricanPatterns
            side="left"
            variant={variant}
            opacity={opacity}
            className="hidden lg:block animate-slide-in-left"
          />
          <EnhancedAfricanPatterns
            side="right"
            variant={variant}
            opacity={opacity}
            className="hidden lg:block animate-slide-in-right"
          />
        </>
      )}

      <div className="relative z-20 lg:px-6 xl:px-12 2xl:px-16 transition-all duration-300">{children}</div>

      <style jsx global>{`
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-in-left {
          animation: slide-in-left 1s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slide-in-right 1s ease-out forwards;
        }

        /* Ensure patterns don't interfere with interactions */
        .animate-slide-in-left,
        .animate-slide-in-right {
          pointer-events: none;
        }

        /* Responsive adjustments for different screen sizes */
        @media (max-width: 1024px) {
          .animate-slide-in-left,
          .animate-slide-in-right {
            display: none;
          }
        }

        /* Ensure main content doesn't get cut off on smaller screens */
        @media (min-width: 1024px) {
          .main-content-with-patterns {
            margin-left: 1.5rem;
            margin-right: 1.5rem;
          }
        }

        @media (min-width: 1280px) {
          .main-content-with-patterns {
            margin-left: 2rem;
            margin-right: 2rem;
          }
        }

        @media (min-width: 1536px) {
          .main-content-with-patterns {
            margin-left: 2.5rem;
            margin-right: 2.5rem;
          }
        }

        /* Pattern visibility controls based on theme */
        .dark .animate-slide-in-left,
        .dark .animate-slide-in-right {
          opacity: 0.8;
        }

        /* Smooth transitions when patterns change */
        .animate-slide-in-left,
        .animate-slide-in-right {
          transition: opacity 0.3s ease-in-out;
        }

        /* Prevent patterns from showing during page transitions */
        .page-transition .animate-slide-in-left,
        .page-transition .animate-slide-in-right {
          opacity: 0;
          transition: opacity 0.15s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AfricanPatternWrapper;
