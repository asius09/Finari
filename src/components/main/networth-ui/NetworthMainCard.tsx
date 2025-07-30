"use client";

import { MyFilter } from "@/components/my-ui/MyFilter";
import { LineChart } from "@/components/tremorCharts/LineChart";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Filters } from "@/constants";
import { formatCurrency } from "@/utils/currency";
import { useAppSelector } from "@/store/hook";
import { CurrencyCode } from "@/constants/currencies.constant";

const myData = [
  { date: "Jan 1", networth: 45000, debts: 400, assets: 45400 },
  { date: "Jan 8", networth: 45200, debts: 380, assets: 45580 },
  { date: "Jan 15", networth: 45500, debts: 350, assets: 45850 },
  { date: "Jan 22", networth: 45300, debts: 420, assets: 45720 },
  { date: "Jan 29", networth: 45800, debts: 390, assets: 46190 },
  { date: "Feb 5", networth: 46000, debts: 370, assets: 46370 },
  { date: "Feb 12", networth: 46300, debts: 340, assets: 46640 },
  { date: "Feb 19", networth: 46100, debts: 410, assets: 46510 },
  { date: "Feb 26", networth: 46600, debts: 380, assets: 46980 },
  { date: "Mar 5", networth: 46800, debts: 360, assets: 47160 },
  { date: "Mar 12", networth: 47100, debts: 330, assets: 47430 },
  { date: "Mar 19", networth: 46900, debts: 400, assets: 47200 },
  { date: "Mar 26", networth: 47400, debts: 370, assets: 47770 },
  { date: "Apr 2", networth: 47600, debts: 350, assets: 47950 },
  { date: "Apr 9", networth: 47900, debts: 320, assets: 48220 },
  { date: "Apr 16", networth: 47700, debts: 390, assets: 48090 },
  { date: "Apr 23", networth: 48200, debts: 360, assets: 48560 },
  { date: "Apr 30", networth: 48400, debts: 340, assets: 48740 },
  { date: "May 7", networth: 48700, debts: 310, assets: 49010 },
  { date: "May 14", networth: 48500, debts: 380, assets: 48880 },
];

interface NetworthMainCardProps {
  //TODO: Decide do or not.
  setFilters: (filter: string) => void;
  filter: string;
}

export const NetworthMainCard = ({
  setFilters,
  filter,
}: NetworthMainCardProps) => {
  const { profile } = useAppSelector(state => state.userProfile);
  const currency = profile?.currency as CurrencyCode;

  return (
    <Card className="p-4">
      <CardHeader className="w-full flex justify-between items-center">
        <p className="text-lg font-semibold text-foreground">
          Networth vs Assets vs Debts
        </p>
        <MyFilter
          onFilterChange={filter => setFilters(filter)}
          selectedFilter={filter}
          filterType={Filters.PERIOD_FILTERS}
        />
      </CardHeader>
      <CardContent>
        <LineChart
          className="h-56"
          index="date"
          data={myData}
          categories={["networth", "debts", "assets"]}
          valueFormatter={(number: number) =>
            formatCurrency(number, currency)
          }
          yAxisWidth={80}
        />
      </CardContent>
    </Card>
  );
};
