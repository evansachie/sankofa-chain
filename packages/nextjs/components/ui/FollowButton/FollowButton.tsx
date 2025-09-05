"use client";

import { FollowButton as EthereumFollowButton } from "ethereum-identity-kit";
import { isAddress } from "viem";
import { useAccount } from "wagmi";

interface FollowButtonProps {
  lookupAddress?: string;
  connectedAddress?: string;
  onDisconnectedClick?: () => void;
  fallbackText?: string;
  fallbackClassName?: string;
  showFallback?: boolean;
  disabled?: boolean;
  customOnClick?: (state: any) => void;
  sounds?: Record<string, string>;
  customClassName?: string;
  customLoader?: React.ReactNode;
}

const formatAddress = (address: string | undefined): `0x${string}` | undefined => {
  if (address && isAddress(address)) {
    // Assert the type to match the function's return signature
    return address as `0x${string}`;
  }
  return undefined;
};

export const FollowButton = ({
  lookupAddress,
  connectedAddress,
  onDisconnectedClick,
  fallbackText = "Follow",
  fallbackClassName = "btn btn-secondary btn-xs",
  showFallback = true,
  disabled = false,
  customOnClick,
  sounds,
  customLoader,
}: FollowButtonProps) => {
  const { address: walletAddress } = useAccount();

  // Use provided connectedAddress or fall back to wallet address
  const effectiveConnectedAddress = connectedAddress || walletAddress;

  // Format addresses for the FollowButton
  const formattedLookupAddress = formatAddress(lookupAddress);
  const formattedConnectedAddress = formatAddress(effectiveConnectedAddress);

  const handleDisconnectedClick = () => {
    if (onDisconnectedClick) {
      onDisconnectedClick();
    } else {
      console.log("Please connect your wallet to follow this user");
    }
  };

  if (formattedLookupAddress && formattedConnectedAddress) {
    return (
      <EthereumFollowButton
        lookupAddress={formattedLookupAddress}
        connectedAddress={formattedConnectedAddress}
        onDisconnectedClick={handleDisconnectedClick}
        disabled={disabled}
        customOnClick={customOnClick}
        sounds={sounds}
        customLoader={customLoader}
      />
    );
  }

  // Show fallback button if lookup address exists but user not connected
  if (formattedLookupAddress && !formattedConnectedAddress && showFallback) {
    return (
      <button className={fallbackClassName} onClick={handleDisconnectedClick} disabled={disabled}>
        {fallbackText}
      </button>
    );
  }

  // Don't render anything if no valid lookup address
  return null;
};

export default FollowButton;
