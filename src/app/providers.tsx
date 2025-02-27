"use client";
import React, { ReactNode, useState } from "react";
import { PageProvider } from "@/contexts/PageContext";
import UserContext from "@/contexts/usercontext";
import { SolanaWalletProvider } from "@/contexts/SolanaWalletProvider";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  const [tokenList, setTokenList] = useState<any>([]);
  const [tokenFilterList, setTokenFilterList] = useState<any>([]);
  const [selectedTokenList, setSelectedTokenList] = useState<any>([]);
  const [swapTokenList, setSwapTokenList] = useState<any>([]);
  const [currentAmount, setCurrentAmount] = useState<number>(1000)
  const [loadingState, setLoadingState] = useState<boolean>(false);

  return (
    <SolanaWalletProvider>
      <UserContext.Provider value={{ tokenList, setTokenList, loadingState, setLoadingState, tokenFilterList, setTokenFilterList, selectedTokenList, setSelectedTokenList, currentAmount, setCurrentAmount, swapTokenList, setSwapTokenList }}>
        <QueryClientProvider client={queryClient}>
          <PageProvider>{children}</PageProvider>
        </QueryClientProvider>
      </UserContext.Provider>

    </SolanaWalletProvider>
  );
}
