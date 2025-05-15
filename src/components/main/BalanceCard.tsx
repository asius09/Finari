"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Wallet as WalletType } from "@/types/modelTypes";
import { Wallet } from "lucide-react";

interface BalanceCardProps {
  size?: "small" | "large";
  wallets: WalletType[];
}

export const BalanceCard = ({ size = "large", wallets }: BalanceCardProps) => {
  const isSmall = size === "small";

  // Calculate total balance
  const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.balance, 0);

  // Format currency
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  if (size === "small")
    return (
      <div className="w-full">
        <div className="flex flex-row gap-4 overflow-x-auto pb-3">
          {wallets.map(wallet => (
            <Card
              key={wallet.id}
              className="w-48 h-16 rounded-lg flex flex-row justify-start items-center p-2 gap-2 flex-shrink-0"
            >
              <Avatar className="w-10 h-10">
                <AvatarFallback>
                  <Wallet className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col justify-center items-start">
                <p className="text-xs text-muted-foreground">{wallet.name}</p>
                <p className="text-md font-semibold">
                  {currencyFormatter.format(wallet.balance)}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  return (
    <Card className={`w-full rounded-2xl p-${isSmall ? "3" : "6"}`}>
      <CardHeader className="p-0">
        <div className="flex items-center gap-3">
          <div className={`p-${isSmall ? "2" : "3"} rounded-xl bg-primary/10`}>
            <Wallet
              className={`w-${isSmall ? "4" : "6"} h-${isSmall ? "4" : "6"} text-primary`}
            />
          </div>
          <CardTitle className={`text-${isSmall ? "sm" : "lg"} font-medium`}>
            Wallets
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className={`p-0 pt-${isSmall ? "2" : "4"}`}>
        <div className="flex flex-col gap-1">
          {wallets.map(wallet => (
            <div
              key={wallet.type}
              className="flex items-center justify-between"
            >
              <p
                className={`text-${isSmall ? "xs" : "sm"} text-muted-foreground`}
              >
                {wallet.type}
              </p>
              <p className={`text-${isSmall ? "xs" : "sm"} font-medium`}>
                {currencyFormatter.format(wallet.balance)}
              </p>
            </div>
          ))}
        </div>
        <div
          className={`mt-${isSmall ? "2" : "4"} pt-${isSmall ? "2" : "4"} border-t`}
        >
          <p className={`text-${isSmall ? "xs" : "sm"} text-muted-foreground`}>
            Current Balance
          </p>
          <p className={`text-${isSmall ? "xl" : "2xl"} font-bold`}>
            {currencyFormatter.format(totalBalance)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
