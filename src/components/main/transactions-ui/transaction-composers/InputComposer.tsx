"use client";
// Import necessary modules and components
import { transactionInputSchema } from "@/schema/transaction.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  TrendingUp,
  Calendar as CalendarIcon,
  Loader,
  ChevronDown,
} from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { MyButton } from "@/components/my-ui/MyButton";
import { MyInput } from "@/components/my-ui/MyInput";
import { TapSelection } from "@/components/my-ui/TapSelection";
import { MyTextarea } from "@/components/my-ui/MyTextarea";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  addTransaction,
  updateTransaction as updateTransactionAction,
} from "@/store/slices/transactionSlice";
import { toast } from "sonner";
import { CustomToast } from "@/components/my-ui/CustomToast";
import { CATEGORY_FILTERS } from "@/constants/filter.constant";
import { Transaction } from "@/types/modelTypes";

// Define the type for transaction form values using Zod schema
type TransactionFormValues = z.infer<typeof transactionInputSchema>;

// Main InputComposer component
export const InputComposer = ({
  setOpen,
  transactionId,
  isEdit = false,
}: {
  setOpen: (open: boolean) => void;
  transactionId?: string;
  isEdit: boolean;
}) => {
  // State for loading status and selected date
  const [loading, setLoading] = useState<boolean>(false);
  const currency = "₹";
  const dispatch = useAppDispatch();
  const { wallets } = useAppSelector(state => state.wallet);
  const { user } = useAppSelector(state => state.auth);
  const { transactions } = useAppSelector(state => state.transaction);
  const userId = user?.id;

  const [transactionToUpdate, setTransactionToUpdate] =
    useState<Transaction | null>(null);

  // Initialize form with validation schema and default values
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionInputSchema),
    defaultValues: {
      wallet_id: "",
      amount: 0,
      type: "expense",
      category: "",
      description: "",
      date: new Date().toISOString(),
    },
    mode: "onChange",
    shouldFocusError: true,
  });

  useEffect(() => {
    if (transactionId) {
      const foundTransaction = transactions.find(
        transaction => transactionId === transaction.id
      );
      if (foundTransaction) {
        setTransactionToUpdate(foundTransaction);
        form.reset({
          wallet_id: foundTransaction.wallet_id,
          amount: foundTransaction.amount,
          type: foundTransaction.type,
          category: foundTransaction.category,
          description: foundTransaction.description,
          date: foundTransaction.date,
        });
      }
    }
  }, [transactionId, isEdit]);

  const [date, setDate] = useState<Date | undefined>(new Date());

  // Transaction type options with icons and styling
  const transactionTypes = [
    {
      title: "Income",
      value: "income",
      icon: ArrowUpRight,
      iconClass: "text-positive",
    },
    {
      title: "Expense",
      value: "expense",
      icon: ArrowDownLeft,
      iconClass: "text-negative",
    },
    {
      title: "Investment",
      value: "investment",
      icon: TrendingUp,
      iconClass: "text-info",
    },
  ];

  // Form submission handler
  const handleSubmit = async (values: TransactionFormValues) => {
    if (!userId) {
      console.error("User ID is required to create a transaction");
      return;
    }

    setLoading(true);
    try {
      let response;
      if (transactionId) {
        if (!transactionToUpdate) {
          throw new Error("Transaction to update not found");
        }
        const updatedTransaction: Transaction = {
          ...values,
          id: transactionToUpdate.id,
          created_at: transactionToUpdate.created_at,
          user_id: transactionToUpdate.user_id,
        };
        response = await dispatch(updateTransactionAction(updatedTransaction));
      } else {
        // Include transactionId in the payload if it exists
        response = await dispatch(
          addTransaction({
            userId,
            transaction: {
              ...values,
            },
          })
        );
      }

      if (response.meta.requestStatus === "fulfilled") {
        form.reset({
          wallet_id: "",
          amount: 0,
          type: "expense",
          category: "",
          description: "",
          date: new Date().toISOString(),
        });
        toast.custom(() => (
          <CustomToast
            type="success"
            title={
              transactionId ? "Transaction Updated" : "Transaction Created"
            }
            message={`Your transaction was successfully ${transactionId ? "updated" : "created"}`}
          />
        ));
        setOpen(false);
      } else {
        throw new Error(
          transactionId
            ? "Failed to update transaction"
            : "Failed to create transaction"
        );
      }
    } catch (error) {
      console.error(
        `Error ${transactionId ? "updating" : "creating"} transaction:`,
        error
      );
      toast.custom(() => (
        <CustomToast
          type="error"
          title={`Transaction ${transactionId ? "Update" : "Creation"} Error`}
          message={
            error instanceof Error
              ? error.message
              : `Failed to ${transactionId ? "update" : "create"} transaction`
          }
        />
      ));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {/* Amount Input Field */}
        <FormField
          control={form.control}
          name="amount"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {currency}
                  </span>
                  <MyInput
                    type="number"
                    placeholder="0.00"
                    {...field}
                    value={field.value === 0 ? "" : field.value}
                    onChange={e => {
                      const value = parseFloat(e.target.value);
                      field.onChange(isNaN(value) ? 0 : value);
                    }}
                    onFocus={e => {
                      if (field.value === 0) {
                        e.target.value = "";
                      }
                    }}
                    className={cn(
                      "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none pl-7",
                      fieldState.error &&
                        "border-destructive ring-destructive/20"
                    )}
                    aria-invalid={!!fieldState.error}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Transaction Type Selector */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <TapSelection
                options={transactionTypes}
                value={field.value}
                onChange={field.onChange}
                className="h-10 w-full"
              />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category Dropdown Selector */}
        <FormField
          control={form.control}
          name="category"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full flex items-center justify-between h-10",
                      fieldState.error && "border-destructive",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <span className="text-left flex-1">
                      {field.value || "Select category"}
                    </span>
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {CATEGORY_FILTERS.map(category => (
                    <DropdownMenuItem
                      key={category}
                      onSelect={() => field.onChange(category)}
                    >
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date and Wallet Selection Row */}
        <div className="flex gap-4">
          {/* Date Picker */}
          <FormField
            control={form.control}
            name="date"
            render={({ field, fieldState }) => (
              <FormItem className="flex-1">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal h-10",
                        !date && "text-muted-foreground",
                        fieldState.error && "border-destructive"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? (
                        format(date, "PPP")
                      ) : (
                        <span>{format(new Date(), "PPP")}</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date || new Date()}
                      onSelect={date => {
                        setDate(date);
                        field.onChange(date?.toISOString());
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage className="absolute -bottom-5 text-xs" />
              </FormItem>
            )}
          />

          {/* Wallet Selector */}
          <FormField
            control={form.control}
            name="wallet_id"
            render={({ field, fieldState }) => (
              <FormItem className="flex-1">
                <FormLabel>Wallet</FormLabel>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full flex items-center justify-between h-10",
                        fieldState.error && "border-destructive",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {wallets.find(w => w.id === field.value)?.name ||
                        "Select wallet"}
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {wallets.map(wallet => (
                      <DropdownMenuItem
                        key={wallet.id}
                        onSelect={() => field.onChange(wallet.id)}
                      >
                        {wallet.name
                          .split(" ")
                          .map(
                            word => word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </FormItem>
            )}
          />
        </div>

        {/* Note/Description Input */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <MyTextarea
                  placeholder="Add any additional notes..."
                  className="resize-none min-h-10"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <MyButton
          type="submit"
          variant="gradient"
          className="font-medium w-full h-10"
          disabled={loading}
        >
          {loading ? <Loader className="animate-spin" /> : "Enter Finari"}
        </MyButton>
      </form>
    </Form>
  );
};
