"use client";

import { MyFilter } from "@/components/my-ui/MyFilter";
import { LineChart } from "@/components/tremorCharts/LineChart";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Filters } from "@/constants/filter-constant";

const myData = [
  { date: "2025-01-01", networth: 45000, debts: 400, assets: 45400 },
  { date: "2025-01-08", networth: 45200, debts: 380, assets: 45580 },
  { date: "2025-01-15", networth: 45500, debts: 350, assets: 45850 },
  { date: "2025-01-22", networth: 45300, debts: 420, assets: 45720 },
  { date: "2025-01-29", networth: 45800, debts: 390, assets: 46190 },
  { date: "2025-02-05", networth: 46000, debts: 370, assets: 46370 },
  { date: "2025-02-12", networth: 46300, debts: 340, assets: 46640 },
  { date: "2025-02-19", networth: 46100, debts: 410, assets: 46510 },
  { date: "2025-02-26", networth: 46600, debts: 380, assets: 46980 },
  { date: "2025-03-05", networth: 46800, debts: 360, assets: 47160 },
  { date: "2025-03-12", networth: 47100, debts: 330, assets: 47430 },
  { date: "2025-03-19", networth: 46900, debts: 400, assets: 47200 },
  { date: "2025-03-26", networth: 47400, debts: 370, assets: 47770 },
  { date: "2025-04-02", networth: 47600, debts: 350, assets: 47950 },
  { date: "2025-04-09", networth: 47900, debts: 320, assets: 48220 },
  { date: "2025-04-16", networth: 47700, debts: 390, assets: 48090 },
  { date: "2025-04-23", networth: 48200, debts: 360, assets: 48560 },
  { date: "2025-04-30", networth: 48400, debts: 340, assets: 48740 },
  { date: "2025-05-07", networth: 48700, debts: 310, assets: 49010 },
  { date: "2025-05-14", networth: 48500, debts: 380, assets: 48880 },
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
            `$${Intl.NumberFormat("us").format(number).toString()}`
          }
          yAxisWidth={80}
        />
      </CardContent>
    </Card>
  );
};
