import { transactionSchema } from "@/schema/transaction.schema";
import { z } from "zod";
import { formatDate } from "@/utils/formatDate";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

type TransactionsListProps = {
  transactions: z.infer<typeof transactionSchema>[];
};

export const TransactionsList = ({ transactions }: TransactionsListProps) => {
  const getAmountColor = (type: string) => {
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

  const getBadgeClass = (type: string) => {
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

  const getWalletPrefix = (type: string) => {
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
    <div>
      {transactions.map(transaction => {
        const { amount, type, category, description, date, wallet_id, id } =
          transaction;
        return (
          <div
            key={id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer gap-4 border-b"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Avatar className="h-9 w-9 border">
                <AvatarImage src="" />
                <AvatarFallback className="bg-muted">
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

            <div className="flex-1 flex justify-center min-w-0">
              <Badge className={`text-xs font-medium ${getBadgeClass(type)}`}>
                {category}
              </Badge>
            </div>

            <div className="flex-1 text-right min-w-0">
              <p className={`text-base font-semibold ${getAmountColor(type)}`}>
                ₹{amount.toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {getWalletPrefix(type)} {wallet_id}
              </p>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-muted-foreground/50"
            >
              <Pencil className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        );
      })}
    </div>
  );
};
