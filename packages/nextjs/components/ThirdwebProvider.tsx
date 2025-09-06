"use client";

import { ReactNode } from "react";
import { BaseSepoliaTestnet } from "@thirdweb-dev/chains";
import { ThirdwebProvider as ThirdwebProviderBase } from "@thirdweb-dev/react";

interface ThirdwebProviderProps {
  children: ReactNode;
}

export const ThirdwebProvider = ({ children }: ThirdwebProviderProps) => {
  return (
    <ThirdwebProviderBase
      activeChain={BaseSepoliaTestnet}
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
      supportedChains={[BaseSepoliaTestnet]}
    >
      {children}
    </ThirdwebProviderBase>
  );
};
