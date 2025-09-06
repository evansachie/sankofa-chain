"use client";

import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

interface WalletConnectButtonProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline";
}

export const WalletConnectButton = ({ className = "", size = "md", variant = "primary" }: WalletConnectButtonProps) => {
  const sizeClasses = {
    sm: "btn-sm",
    md: "btn-md",
    lg: "btn-lg",
  };

  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    outline: "btn-outline",
  };

  return (
    <ConnectButton.Custom>
      {({ openConnectModal, mounted }) => {
        if (!mounted) return null;

        return (
          <button
            onClick={openConnectModal}
            className={`btn ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
          >
            Connect Wallet
          </button>
        );
      }}
    </ConnectButton.Custom>
  );
};
