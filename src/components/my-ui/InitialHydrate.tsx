"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hook";
import { fetchUserProfile } from "@/store/slices/userSlice";
import { fetchWallets } from "@/store/slices/walletSlice";
import { fetchTransactions } from "@/store/slices/transactionSlice";

interface InitialHydrateProps {
  userId: string | null;
  children: React.ReactNode;
}

export function InitialHydrate({ userId, children }: InitialHydrateProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserProfile(userId));
      dispatch(fetchWallets(userId));
      dispatch(fetchTransactions(userId));
    }

    // TODO: Add dispatch for assets
    // TODO: Add dispatch for debts
  }, [userId]);

  return children;
}
