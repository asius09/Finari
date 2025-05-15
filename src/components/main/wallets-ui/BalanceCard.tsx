"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Wallet as WalletType } from "@/types/modelTypes";
import { Wallet, Eye, EyeClosed, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { MyFilter } from "@/components/my-ui/MyFilter";
import { Filters, TIME_FILTERS } from "@/constants/constant";
import { LineChart } from "@/components/tremorCharts/LineChart";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { chartColors } from "@/lib/charUtils";

interface BalanceCardProps {
  size?: "small" | "large";
  wallets: WalletType[];
}

export const BalanceCard = ({ size = "large", wallets }: BalanceCardProps) => {
  // Calculate total balance
  const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.balance, 0);
  const [showBalance, setShowBalance] = useState(false);
  const [period, setPeriod] = useState<string>(TIME_FILTERS[0]);
  const walletFilter = [...wallets.map(wallet => wallet.name), "Total Balance"];
  const [selectedWallet, setSelectedWallet] = useState("Total Balance");

  const getWalletColor = () => {
    if (selectedWallet === "Total Balance") {
      return "primary";
    }
    const walletColors: (keyof typeof chartColors)[] = [
      "blue",
      "emerald",
      "rose",
      "violet",
      "orange",
      "cyan",
    ];
    const walletIndex = wallets.findIndex(
      wallet => wallet.name === selectedWallet
    );
    return walletColors[walletIndex % walletColors.length];
  };

  const [chartColor, setChartColor] =
    useState<keyof typeof chartColors>(getWalletColor());

  useEffect(() => {
    setChartColor(getWalletColor());
  }, [selectedWallet]);

  const hideNumber = (amount: string): string => {
    return amount.replace(/\d/g, "*");
  };

  const totalBalanceWallet: WalletType = {
    id: crypto.randomUUID(),
    user_id: "demo-user",
    name: "Total Balance",
    type: "cash",
    balance: totalBalance,
    icon: "wallet",
    created_at: new Date().toISOString(),
  };
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
  const [visibleWallet, setVisibleWallet] =
    useState<WalletType>(totalBalanceWallet);
  useEffect(() => {
    if (selectedWallet !== totalBalanceWallet.name) {
      let wallet = wallets.filter(wallet => wallet.name === selectedWallet);
      setVisibleWallet(wallet[0]);
    } else {
      setVisibleWallet(totalBalanceWallet);
    }
  }, [selectedWallet]);
  return (
    <div className="w-full flex flex-row gap-4 justify-start items-start overflow-x-auto pb-3">
      <Card key={visibleWallet.id} className="w-96 flex-shrink-0 p-4">
        <CardHeader className="flex flex-row justify-between items-start">
          <div className="space-y-0.5">
            <MyFilter
              onFilterChange={filter => setSelectedWallet(filter)}
              customFilter={walletFilter}
              selectedFilter={selectedWallet}
              className="outline-none  has-[>svg]:px-0 p-0 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent cursor-pointer"
            />
            <p className="text-xl font-semibold">
              {showBalance
                ? currencyFormatter.format(visibleWallet.balance)
                : "*****"}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowBalance(prev => !prev)}
            className="text-muted-foreground hover:text-primary cursor-pointer"
          >
            {showBalance ? (
              <EyeClosed className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </CardHeader>
        <Accordion type="single" collapsible>
          <AccordionItem value="wallets" className="border-0">
            {selectedWallet === totalBalanceWallet.name && (
              <CardContent className="space-y-2">
                <AccordionTrigger className="hover:no-underline p-0 group">
                  <div className="flex items-center justify-between w-full pb-2">
                    <div className="flex items-center gap-2">
                      <Wallet className="h-4 w-4 text-foreground/80" />
                      <p className="text-sm font-medium text-foreground/80">
                        Wallets
                      </p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-foreground/80 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Separator className="bg-foreground/10" />
                  {wallets.map(wallet => (
                    <div
                      key={wallet.id}
                      className="flex items-center justify-between rounded-lg py-2 hover:bg-foreground/5 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Wallet className="h-4 w-4 text-foreground/80" />
                        <p className="text-sm text-foreground/80">
                          {wallet.name}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-foreground">
                        {showBalance
                          ? currencyFormatter.format(wallet.balance)
                          : "*****"}
                      </p>
                    </div>
                  ))}
                </AccordionContent>
              </CardContent>
            )}
          </AccordionItem>
        </Accordion>
      </Card>

      <Card className="w-full flex-1 flex-shrink-0 p-4">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-lg">Balance History</CardTitle>
          <MyFilter
            onFilterChange={filter => setPeriod(filter)}
            selectedFilter={period}
            filterType={Filters.TIME_FILTERS}
            className="outline-none has-[>svg]:px-0 p-0 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent cursor-pointer"
          />
        </CardHeader>
        <CardContent>
          <LineChart
            className="h-60"
            data={[
              { date: "Jan", amount: 1000 },
              { date: "Feb", amount: 1200 },
              { date: "Mar", amount: 800 },
              { date: "Apr", amount: 1500 },
              { date: "May", amount: 2000 },
              { date: "Jun", amount: 1800 },
            ]}
            index="date"
            categories={["amount"]}
            yAxisWidth={100}
            colors={[chartColor]}
            valueFormatter={value => currencyFormatter.format(value)}
            showLegend={false}
            showGridLines={true}
            autoMinValue={true}
          />
        </CardContent>
      </Card>
    </div>
  );
};
