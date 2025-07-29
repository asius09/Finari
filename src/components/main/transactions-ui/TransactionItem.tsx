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
  // const { profile } = useAppSelector(state => state.userProfile); TODO: ADD CURRENCY
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
    <div className="w-full flex justify-between transition-colors">
      {/* Avatar, Transaction Name, Transaction Time and Category */}
      <div className="flex items-start gap-1.5">
        <Avatar className="h-10 w-10 border shrink-0">
          <AvatarFallback className="bg-muted text-sm">
            {description?.charAt(0).toUpperCase() || "T"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {description}
          </p>
          <div className="flex items-center gap-1">
            <p className="text-[11px] text-muted-foreground truncate">
              {category}
              {" • "}
              {formatDate(date, "relative")}
            </p>
          </div>
        </div>
      </div>

      <div className="text-right shrink-0">
        <p className={`text-base font-bold ${getAmountColor(type)}`}>
          {Number(amount).toLocaleString()}
        </p>
        <p className="text-[11px] text-muted-foreground truncate max-w-[80px] sm:max-w-none">
          {wallet?.name}
        </p>
      </div>

      {/* 
      //TODO: Add edit and delete buttons
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
      */}
    </div>
  );
};
