"use client";

import { BalanceCard } from "./BalanceCard";
import { useState } from "react";
import { demoWallets } from "@/data/demo.wallets-data";

export function WalletComposer() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-semibold">Wallets</h1>
      <BalanceCard wallets={demoWallets} size="large" />
    </div>
  );
}
