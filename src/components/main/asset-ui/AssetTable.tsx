import { format } from "date-fns";
import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { assetSchema } from "@/schema/asset.schema";
import { z } from "zod";
import { formatAssetType } from "@/utils/formateAssetType";
import { cn } from "@/lib/utils";
import { assetTypeColorMap } from "@/constants";
import { chartColors } from "@/lib/charUtils";
import { useAppSelector } from "@/store/hook";

type AssetType = z.infer<typeof assetSchema>;

interface AssetTableProps {
  assets: AssetType[];
}

export const AssetTable = ({ assets = [] }: AssetTableProps) => {
  let count = 0;
  const { currencySymbol } = useAppSelector(state => state.userProfile);

  return (
    <div className=" bg-background shadow-sm">
      <Table className="min-w-full p-2 lg:p-4">
        <TableHeader>
          <TableRow className="bg-muted/30 hover:bg-muted/30 text-sm md:text-sm border">
            <TableHead className="text-muted/90">#</TableHead>
            <TableHead className="min-w-[60px] hidden md:table-cell">
              Type
            </TableHead>
            <TableHead className="min-w-[40px] truncate">Name</TableHead>
            <TableHead className="table-cell">Current Value</TableHead>
            <TableHead className="hidden md:table-cell">
              Purchase Price
            </TableHead>
            <TableHead>Purchase Date</TableHead>
            <TableHead>Profit/Loss</TableHead>
            <TableHead className="text-right hidden md:table-cell">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assets.slice(0, 5).map(asset => (
            <TableRow key={asset.id}>
              <TableCell>{++count}</TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs px-2 py-0.5",
                    `${
                      chartColors[
                        assetTypeColorMap[
                          asset.asset_type as keyof typeof assetTypeColorMap
                        ] as keyof typeof chartColors
                      ].bg
                    }/30`
                  )}
                >
                  {formatAssetType(asset.asset_type)}
                </Badge>
              </TableCell>
              <TableCell>{asset.name}</TableCell>
              <TableCell>
                {currencySymbol}
                {asset.current_value?.toLocaleString()}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {asset.purchase_price || "N/A"}
              </TableCell>
              <TableCell>
                {format(
                  asset.purchase_date || new Date().toString(),
                  "dd MMM yyyy"
                )}
              </TableCell>
              <TableCell>TODO: Profit/Loss</TableCell>
              <TableCell className="hidden md:table-cell">
                <Button variant="ghost" className="cursor-pointer p-1">
                  <Ellipsis className="h-5 w-5" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
