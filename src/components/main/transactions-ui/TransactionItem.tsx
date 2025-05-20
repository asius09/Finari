import { transactionSchema } from "@/schema/transaction.schema";
import { z } from "zod";
import { formatDate } from "@/utils/formatDate";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Pencil } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { RemoveEntry } from "../RemoveEntry";
import { deleteTransaction } from "@/store/slices/transactionSlice";
import { CustomToast } from "@/components/my-ui/CustomToast";
import { toast } from "sonner";
import { TransactionComposer } from "@/components/main/transactions-ui/transaction-composers/TransactionComposer";

type TransactionItemProps = {
  transaction: z.infer<typeof transactionSchema>;
};

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const dispatch = useAppDispatch();
  const { id, wallet_id, amount, description, date, category, type } =
    transaction;
  const { profile } = useAppSelector(state => state.userProfile);
  const { wallets } = useAppSelector(state => state.wallet);
  const wallet = wallets.find(wallet => wallet.id === wallet_id);

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

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteTransaction(id));
      toast.custom(() => (
        <CustomToast
          type="success"
          title="Transaction Deleted"
          message="Transaction deleted successfully"
        />
      ));
    } catch (error: unknown) {
      console.log("Failed to delete the transaction, Please Try again!");
      if (error instanceof Error) {
        console.error("Failed to delete transaction : ", error);
      } else {
        console.error("Failed to delete transaction");
      }
      toast.custom(() => (
        <CustomToast
          type="error"
          title="Failed to delete transaction"
          message="Something went wrong, Please Try again"
        />
      ));
    }
  };

  return (
    <div className="flex flex-row items-start sm:items-center justify-between p-3 hover:bg-muted/50 transition-colors gap-2 sm:gap-4 border-b">
      <div className="flex items-center gap-3 w-full sm:flex-1 sm:min-w-0">
        <Avatar className="h-8 w-8 sm:h-9 sm:w-9 border">
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

      <div className="w-full sm:w-auto sm:flex-1 flex justify-start sm:justify-center min-w-0 mt-2 sm:mt-0">
        <Badge className={`text-xs font-medium ${getBadgeClass(type)}`}>
          {category}
        </Badge>
      </div>

      <div className="w-full sm:w-auto sm:flex-1 text-right sm:text-left min-w-0 mt-2 sm:mt-0">
        <p className={`text-base font-semibold ${getAmountColor(type)}`}>
          {profile?.currency}
          {Number(amount).toFixed(2) || 0}
        </p>
        <p className="text-xs text-muted-foreground line-clamp-1">
          {getWalletPrefix(type)} {wallet?.name}
        </p>
      </div>

      <div className="flex items-center gap-4 sm:gap-4 mt-2 sm:mt-0">
        <TransactionComposer
          isEdit={true}
          btnChildren={<Pencil className="h-4 w-4" />}
          btnClassName="h-8 w-8 p-0 bg-transparent text-foreground hover:bg-muted-foreground/50 cursor-pointer"
          formTitle="Edit Transaction"
          formDescription="Update your transaction details"
          transactionId={id}
        />
        <RemoveEntry
          handleDelete={() => handleDelete(id)}
          title="Are you sure you want to delete this transaction?"
          content="This action cannot be undone. The transaction will be permanently removed from your records."
          btnClassName="cursor-pointer"
        />
      </div>
    </div>
  );
};
