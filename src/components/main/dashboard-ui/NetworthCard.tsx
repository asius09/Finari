"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/store/hook";
// import { formatCurrency } from "@/utils/formatCurrency";
import { FinanceArrow } from "@/components/my-ui/FinanceArrow";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { NetworthChart } from "@/components/charts/NetworthChart";

export const NetworthCard = () => {
  //   const { totalNetworth, networthChangePercentage } = useAppSelector(
  //     state => state.financialOverview
  //   );

  const { profile } = useAppSelector(state => state.userProfile);
  const currency = profile?.currency;
  //if usd = $

  /*
Net-worth data 
libebilities - assets = networth
 increase or decresease icon + or - {number} (percentage)

 {currency} {number[networth]}

 graph btns 
 graph for all the networth
*/
  const totalNetworth = Math.floor(Math.random() * 1000000) + 10000; // Random net worth between 10,000 and 1,000,000
  const networthChangePercentage = (Math.random() * 20 - 10).toFixed(2); // Random percentage change between -10% and +10%
  const isPositiveChange = Number(networthChangePercentage) >= 0;

  return (
    <Card className="w-full flex-1 min-w-sm p-4">
      <CardHeader className="flex justify-between items-start gap-0">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">
            Net Worth
          </h3>
          <div
            className="flex items-baseline gap-1"
            aria-labelledby="networth-value"
          >
            <span className="text-lg font-medium text-muted-foreground">
              {currency === "USD" ? "$" : "₹"}
            </span>
            <p className="text-3xl font-bold text-foreground">
              {new Intl.NumberFormat("en-US", {
                style: "decimal",
                maximumFractionDigits: 2,
              }).format(totalNetworth)}
            </p>
          </div>
        </div>
        <Badge
          variant="outline"
          className={cn(
            isPositiveChange ? "bg-positive-bg" : "bg-negative-bg",
            "outline-none rounded-2xl px-1.5 py-0.5 h-8 flex items-center justify-between border-none"
          )}
        >
          <FinanceArrow positive={isPositiveChange} bg={false} />
          <span
            className={cn(
              isPositiveChange ? "text-positive" : "text-negative",
              "text-xs font-medium"
            )}
          >
            ({isPositiveChange ? "+" : "-"}512.20){" "}
            {Math.abs(Number(networthChangePercentage))}%
          </span>
        </Badge>
      </CardHeader>

      {/* Charts  */}

      <NetworthChart />
    </Card>
  );
};
