"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Wallet as WalletType } from "@/types/modelTypes";
import { Wallet, Eye, EyeClosed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { MyFilter } from "@/components/my-ui/MyFilter";
import { LoadingTypeEnum } from "@/constants/constant";
import { Filters, PERIOD_FILTERS } from "@/constants/filter-constant";
import { LineChart } from "@/components/tremorCharts/LineChart";
import { Separator } from "@/components/ui/separator";
import { chartColors } from "@/lib/charUtils";
import { WalletComposer } from "@/components/main/wallets-ui/WalletComposer";
import { SparkBarChart } from "@/components/tremorCharts/SparkChart";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { Skeleton } from "@/components/ui/skeleton";
import { removeWallet } from "@/store/slices/walletSlice";
import { RemoveEntry } from "../RemoveEntry";
import { toast } from "sonner";
import { CustomToast } from "@/components/my-ui/CustomToast";

interface BalanceCardProps {
  size?: "small" | "large";
}

export const BalanceCard = ({ size = "large" }: BalanceCardProps) => {
  const dispatch = useAppDispatch();
  const { wallets, loading, totalBalance } = useAppSelector(
    state => state.wallet
  );
  const [showBalance, setShowBalance] = useState<boolean>(false);
  const [selectedWallet, setSelectedWallet] = useState<string>("Total Balance");

  // Filter State
  const [period, setPeriod] = useState<string>(PERIOD_FILTERS[0]);

  // Users Specific Filters
  const walletFilter = [
    ...(wallets?.map(wallet => wallet.name) || []),
    "Total Balance",
  ];

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

  const totalBalanceWallet: WalletType = {
    id: crypto.randomUUID(),
    user_id: crypto.randomUUID(),
    name: "Total Balance",
    type: "cash",
    balance: totalBalance,
    icon: undefined,
    created_at: new Date().toISOString(),
  };

  // Selected Wallet - @defaul{Total Balance}
  const [visibleWallet, setVisibleWallet] =
    useState<WalletType>(totalBalanceWallet);

  // Format currency
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handleDelete = async (id: string) => {
    try {
      await dispatch(removeWallet({ walletId: id }));
      toast.custom(() => (
        <CustomToast type="success" message="Wallet deleted successfully" />
      ));
    } catch (error) {
      console.error("Failed to delete wallet:", error);
      toast.custom(() => (
        <CustomToast
          type="error"
          message="Failed to delete wallet. Please try again."
        />
      ));
    }
  };
  useEffect(() => {
    if (selectedWallet !== totalBalanceWallet.name) {
      const wallet = wallets.find(wallet => wallet.name === selectedWallet) as
        | WalletType
        | undefined;
      if (wallet) {
        setVisibleWallet(wallet);
      }
    } else {
      setVisibleWallet(totalBalanceWallet);
    }
    setChartColor(getWalletColor());
  }, [selectedWallet, wallets, totalBalance]);

  // Chip Type Balance Card for
  if (size === "small")
    return (
      <div className="w-full">
        <div className="flex flex-row gap-4 overflow-x-auto pb-3">
          {/* Loading State  */}
          {loading === LoadingTypeEnum.PENDING
            ? Array.from({ length: 3 }).map((_, i) => (
                <Card
                  key={i}
                  className="w-48 h-16 rounded-lg flex flex-row justify-start items-center p-2 gap-2 flex-shrink-0"
                >
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="flex flex-col justify-center items-start gap-1">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </Card>
              ))
            : [totalBalanceWallet, ...wallets].map(wallet => (
                // Main Cards
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
                    <p className="text-xs text-muted-foreground">
                      {wallet.name}
                    </p>
                    <p className="text-md font-semibold">
                      {currencyFormatter.format(wallet.balance)}
                    </p>
                  </div>
                </Card>
              ))}
        </div>
      </div>
    );

  if (loading === LoadingTypeEnum.PENDING) {
    return (
      <div className="w-full flex flex-col md:flex-row gap-4 justify-start items-start overflow-x-auto pb-3">
        <Card className="w-full md:w-96 flex-shrink-0 p-4">
          <CardHeader className="flex flex-row justify-between items-start">
            <div className="space-y-0.5">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-8 w-40" />
            </div>
            <Skeleton className="h-8 w-8 rounded-full" />
          </CardHeader>
          <CardContent className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg py-2"
              >
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="w-full flex-1 flex-shrink-0 p-4">
          <CardHeader className="flex flex-row justify-between items-center">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-20" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-60 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col lg:flex-row gap-4 justify-start items-start overflow-x-hidden">
      {/* Main Wallet Card */}
      <Card key={visibleWallet.id} className="w-full lg:w-96 flex-shrink-0 p-4">
        <CardHeader className="flex flex-row justify-between items-start">
          <div className="space-y-0.5">
            {/* Wallet Filter Dropdown */}
            <MyFilter
              onFilterChange={filter => setSelectedWallet(filter)}
              customFilter={walletFilter}
              selectedFilter={selectedWallet}
              className="outline-none has-[>svg]:px-0 p-0 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent cursor-pointer"
            />
            {/* Wallet Balance Display */}
            <p className="text-xl font-semibold">
              {showBalance
                ? currencyFormatter.format(visibleWallet.balance)
                : "*****"}
            </p>
          </div>
          {/* Show/Hide Balance Toggle Button */}
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

        {/* Conditional Rendering based on Selected Wallet */}
        {selectedWallet === totalBalanceWallet.name ? (
          <CardContent>
            {/* Wallets List Header */}
            <div className="flex items-center gap-2 pb-2">
              <Wallet className="h-4 w-4 text-foreground/80" />
              <p className="text-sm font-medium text-foreground/80">Wallets</p>
            </div>
            <Separator className="bg-foreground/10" />

            {/* Wallets List */}
            {wallets.map(wallet => (
              <div
                key={wallet.id}
                className="flex items-center justify-between cursor-pointer p-1 hover:bg-muted-foreground/5 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-foreground/80" />
                  <p className="text-sm text-foreground/80">{wallet.name}</p>
                </div>

                <div className="flex flex-row items-center">
                  <p className="text-sm font-medium text-foreground mr-3 lg:mr-0">
                    {showBalance
                      ? currencyFormatter.format(wallet.balance)
                      : "*****"}
                  </p>
                  {/* Wallet Actions */}
                  <div className="flex flex-row items-center justify-start gap-4 lg:gap-0">
                    <RemoveEntry
                      handleDelete={() => handleDelete(wallet.id)}
                      title=" Are you sure you want to delete this wallet?"
                      content="This action cannot be undone. All transactions and data related to this wallet will be permanently deleted."
                    />
                    <WalletComposer
                      isEdit={true}
                      walletId={wallet.id}
                      buttonContent={{
                        icon: <Wallet className="h-6 w-6 lg:h-4 lg:w-4" />,
                        title: "",
                      }}
                      btnClassName="flex flex-start justify-center items-center hover:bg-muted-foreground/5 w-6 h-6"
                    />
                  </div>
                </div>
              </div>
            ))}
            {/* Add New Wallet Button */}
            <WalletComposer btnClassName="py-6 lg:py-2" />
          </CardContent>
        ) : (
          <CardContent className="space-y-1">
            {/* Balance Overview Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4 text-foreground/80" />
                <p className="text-xs font-medium text-foreground/80">
                  Balance Overview
                </p>
              </div>
              {/* Period Filter */}
              <MyFilter
                onFilterChange={filter => setPeriod(filter)}
                selectedFilter={period}
                filterType={Filters.PERIOD_FILTERS}
                className="text-xs text-foreground/80 p-0 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent cursor-pointer"
              />
            </div>
            <Separator className="bg-foreground/10" />

            {/* Sparkline Chart */}
            <div className="w-full">
              <SparkBarChart
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
                colors={[chartColor]}
                type="stacked"
                autoMinValue={true}
                barCategoryGap={4}
                className="h-28"
              />
              <div className="mt-2">
                <WalletComposer />
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Balance History Card */}
      <Card className="w-full flex-1 flex-shrink-0 p-4">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-lg">Balance History</CardTitle>
          {/* Period Filter */}
          <MyFilter
            onFilterChange={filter => setPeriod(filter)}
            selectedFilter={period}
            filterType={Filters.PERIOD_FILTERS}
            className="outline-none has-[>svg]:px-0 p-0 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent cursor-pointer"
          />
        </CardHeader>
        <CardContent>
          {/* Line Chart */}
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
            yAxisWidth={80}
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
