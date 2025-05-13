"use client";
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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  TrendingUp,
  Calendar as CalendarIcon,
  Loader,
  ChevronDown,
  X,
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

type TransactionFormValues = z.infer<typeof transactionInputSchema>;

export const InputComposer = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const currency = "₹";
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
  });

  const [date, setDate] = useState<Date>();

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
  const categories = ["Food", "Bills", "Salary", "Transport", "Entertainment"];
  const wallets = ["Cash", "Bank Account", "Credit Card"];

  const handleSubmit = (values: TransactionFormValues) => {
    console.log("Transaction submitted:", values);
    // TODO: Implement form submission logic
  };

  return (
    <Card className="relative w-full max-w-sm min-w-xs p-6">
      <button
        className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        onClick={() => console.log("Close clicked")}
      >
        <X className="h-4 w-4" />
      </button>
      <CardHeader>
        <div className="space-y-1 w-full text-center">
          <CardTitle className="text-xl font-bold">Add Transaction</CardTitle>
          <p className="text-sm text-muted-foreground">
            Tell us what you spent or received
          </p>
        </div>
      </CardHeader>
      <CardContent className="mt-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {/* Amount Input */}
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
                        onChange={e => {
                          const value = parseFloat(e.target.value);
                          field.onChange(isNaN(value) ? 0 : value);
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

            {/* Type Selector */}
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

            {/* Category Dropdown */}
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
                      {categories.map(category => (
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

            <div className="flex gap-4">
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
                          onSelect={selectedDate => {
                            setDate(selectedDate);
                            field.onChange(selectedDate?.toISOString());
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="absolute -bottom-5 text-xs" />
                  </FormItem>
                )}
              />
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
                          {field.value || "Select wallet"}
                          <ChevronDown className="h-4 w-4 ml-2" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {wallets.map(wallet => (
                          <DropdownMenuItem
                            key={wallet}
                            onSelect={() => field.onChange(wallet)}
                          >
                            {wallet}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormItem>
                )}
              />
            </div>

            {/* Note Input */}
            <FormField
              control={form.control}
              name="note"
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
      </CardContent>
    </Card>
  );
};
