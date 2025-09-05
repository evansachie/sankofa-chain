"use client";

import React from "react";
import Image from "next/image";

interface AfricanPatternSidebarProps {
  side: "left" | "right";
  variant?: "kente" | "adinkra" | "mudcloth";
  opacity?: number;
  className?: string;
}

const IMAGE_MAP: Record<string, string> = {
  kente:
    "https://images.unsplash.com/photo-1660695828403-b42e117e0b4f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  adinkra:
    "https://images.unsplash.com/photo-1606885118474-c8baf907e998?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  mudcloth:
    "https://plus.unsplash.com/premium_photo-1670044658714-686e136babc0?q=80&w=712&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

const AfricanPatternSidebar: React.FC<AfricanPatternSidebarProps> = ({
  side,
  variant = "kente",
  opacity = 0.3,
  className = "",
}) => {
  const imgSrc = IMAGE_MAP[variant];

  return (
    <div
      className={`fixed top-0 ${side}-0 h-full w-12 md:w-20 lg:w-28 xl:w-32 pointer-events-none z-10 ${className}`}
      style={{ top: "var(--header-height, 70px)" }}
    >
      {/* Background image */}
      <div className="relative h-full w-full">
        <Image src={imgSrc} alt={`${variant} pattern`} fill priority className="object-cover" style={{ opacity }} />
      </div>

      {/* Gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-${
          side === "left" ? "r" : "l"
        } from-transparent via-base-100/5 to-base-100/20`}
      />

      {/* Accent line */}
      <div
        className={`absolute top-0 ${
          side === "left" ? "right-0" : "left-0"
        } w-0.5 h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent`}
        style={{ animation: "pulse-line 4s ease-in-out infinite" }}
      />

      <style jsx>{`
        @keyframes pulse-line {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

export default AfricanPatternSidebar;
