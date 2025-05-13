import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { transactionSchema } from "@/schema/transaction.schema";
import { z } from "zod";
import { formatDate } from "@/utils/formatDate";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TransactionItemProps = {
  transaction: z.infer<typeof transactionSchema>;
};

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const { amount, type, category, description, date, wallet_id } = transaction;

  const getAmountColor = () => {
    switch (type) {
      case "income":
        return "text-positive";
      case "expense":
        return "text-negative";
      case "investment":
        return "text-info";
      default:
        return "text-foreground";
    }
  };

  const getBadgeClass = () => {
    switch (type) {
      case "income":
        return "bg-positive-bg text-positive";
      case "expense":
        return "bg-negative-bg text-negative";
      case "investment":
        return "bg-info-bg text-info";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getWalletPrefix = () => {
    switch (type) {
      case "expense":
        return "from";
      case "investment":
        return "through";
      default:
        return "in";
    }
  };

  return (
    <TableRow className="hover:bg-muted/50 transition-colors cursor-pointer w-full">
      <TableCell className="py-3 px-2 sm:px-4 w-[40%]">
        <div className="flex items-center gap-2 sm:gap-3 w-full">
          <Avatar className="h-7 w-7 sm:h-9 sm:w-9 border">
            <AvatarImage src="" />
            <AvatarFallback className="bg-muted text-sm sm:text-base">
              {description?.charAt(0).toUpperCase() || "T"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground line-clamp-1">
              {description}
            </p>
            <p className="text-xs text-muted-foreground line-clamp-1">
              {formatDate(date, "relative")}
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell className="py-3 px-2 sm:px-4 w-[20%]">
        <Badge className={`text-xs font-medium ${getBadgeClass()}`}>
          {category}
        </Badge>
      </TableCell>
      <TableCell className="py-3 px-2 sm:px-4 w-[30%] text-right">
        <p className={`text-base font-semibold ${getAmountColor()}`}>
          ₹{amount.toFixed(2)}
        </p>
        <p className="text-xs text-muted-foreground line-clamp-1">
          {getWalletPrefix()} {wallet_id}
        </p>
      </TableCell>
      <TableCell className="py-3 px-2 sm:px-4 w-[10%]">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-muted-foreground/50"
        >
          <Pencil className="h-4 w-4 text-muted-foreground" />
        </Button>
      </TableCell>
    </TableRow>
  );
};
