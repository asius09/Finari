"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hook";
import { fetchUserProfile } from "@/store/slices/userSlice";

interface InitialHydrateProps {
  userId: string | null;
  children: React.ReactNode;
}

export function InitialHydrate({ userId, children }: InitialHydrateProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserProfile(userId));
    }

    // TODO: Add dispatch for transactions
    // TODO: Add dispatch for assets
    // TODO: Add dispatch for debts
  }, [dispatch, userId]);

  return children;
}
