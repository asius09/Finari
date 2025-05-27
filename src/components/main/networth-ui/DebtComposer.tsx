"use client";

import { debtFormSchema, debtsSchema } from "@/schema/debts.schema";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  DebtTypeEnum,
  debtTypes,
  repaymentFrequencies,
  RepaymentFrequencyEnum,
} from "@/constants";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
} from "@radix-ui/react-dropdown-menu";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { MyInput } from "@/components/my-ui/MyInput";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { MyTextarea } from "@/components/my-ui/MyTextarea";
import { CustomToast } from "@/components/my-ui/CustomToast";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { addDebts, updateDebt } from "@/store/slices/debtSlice";

interface DebtComposerProps {
  btnClassName: string;
  btnChildren: React.ReactNode;
  formTitle?: string;
  formDescription?: string;
  debtId?: string;
}

type DebtFormType = z.infer<typeof debtFormSchema>;

export function DebtComposer({
  btnClassName,
  btnChildren,
  formTitle = "Add Debt",
  formDescription,
  debtId,
}: DebtComposerProps) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const userId: string = user?.id || "";
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const { debts } = useAppSelector(state => state.debt);
  const currency = "$";

  const index = debts.findIndex(debt => debt.id === debtId);
  const debt = debts[index];

  const debtForm = useForm<DebtFormType>({
    resolver: zodResolver(debtFormSchema),
    defaultValues: {
      name: "",
      debt_type: DebtTypeEnum.LOAN,
      interest_rate: 0,
      principal_amount: 0,
      outstanding_balance: 0,
      payment_amount: 0,
      repayment_frequency: RepaymentFrequencyEnum.MONTHLY,
      repayment_start_date: format(new Date(), "yyyy-MM-dd"),
      tenure: 12,
      tenure_type: RepaymentFrequencyEnum.MONTHLY,
      notes: "",
    },
  });

  const onSubmit = async (data: DebtFormType) => {
    try {
      setLoading(true);
      if (!userId) {
        console.error("Inavlide Request! No USER ID Found");
      }
      let response;
      if (debtId) {
        const newDebt = {
          id: debtId,
          user_id: userId,
          name: data.name,
          debt_type: data.debt_type,
          principal_amount: data.principal_amount,
          outstanding_balance: data.outstanding_balance,
          interest_rate: data.interest_rate,
          repayment_frequency: data.repayment_frequency,
          repayment_start_date: data.repayment_start_date,
          repayment_end_date: debt.repayment_end_date,
          next_payment_date: debt.next_payment_date,
          payment_amount: data.payment_amount,
          notes: data.notes || "",
          tenure: data.tenure,
          tenure_type: data.tenure_type,
          created_at: debt.created_at,
        };
        const validate = debtsSchema.partial().safeParse(newDebt);
        if (!validate.success) {
          const error = validate.error.flatten().fieldErrors;
          console.log("Validation Failed!", error);
          return;
        }
        //TODO: Update Feautre...
        response = await dispatch(updateDebt({ userId, debt: newDebt }));
      } else {
        response = await dispatch(addDebts({ userId, debt: data }));
      }
      if (addDebts.fulfilled.match(response)) {
        toast.custom(() =>
          CustomToast({
            type: "success",
            title: `Debt ${debtId ? "added" : "updated"} Successfully`,
          })
        );
        setOpen(false);
        debtForm.reset();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("Error submitting asset:", error);
      }
      toast.custom(() => (
        <CustomToast
          type="error"
          title={debtId ? "Failed to Updated Debt" : "Failed to Add Debt"}
          message={`Something went wrong, Please Try again`}
        />
      ));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debtId) {
      debtForm.reset({
        name: debt.name,
        debt_type: debt.debt_type,
        interest_rate: debt.interest_rate,
        principal_amount: debt.principal_amount,
        outstanding_balance: debt.outstanding_balance,
        payment_amount: debt.payment_amount,
        repayment_frequency: debt.repayment_frequency,
        repayment_start_date: debt.repayment_start_date,
        tenure: debt.tenure,
        tenure_type: debt.tenure_type,
        notes: debt.notes,
      });
    }
  }, [debtId, debt]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={loading || open}
          variant="default"
          className={cn("cursor-pointer", btnClassName)}
        >
          {btnChildren}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {formTitle}
          </DialogTitle>
          <p className="text-sm text-muted-foreground text-center">
            {formDescription}
          </p>
        </DialogHeader>
        <Form {...debtForm}>
          <form
            onSubmit={debtForm.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {/* Debt Name and Type (Side by Side) */}
            <div className="flex w-full gap-2">
              <FormField
                control={debtForm.control}
                name="name"
                render={({ field, fieldState }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Debt Name</FormLabel>
                    <FormControl>
                      <MyInput
                        disabled={loading}
                        type="text"
                        placeholder="Debt Name"
                        autoComplete="off"
                        {...field}
                        onChange={e => {
                          field.onChange(e.target.value);
                        }}
                        className={cn(
                          fieldState.error &&
                            "border-destructive ring-destructive/20"
                        )}
                        aria-invalid={!!fieldState.error}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={debtForm.control}
                name="debt_type"
                render={({ field, fieldState }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Debt Type</FormLabel>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          disabled={loading}
                          variant="ghost"
                          className={cn(
                            "w-full flex items-center justify-between h-10 bg-input border border-input-border cursor-pointer",
                            fieldState.error && "border-destructive",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <span className="text-left flex-1">
                            {field.value.charAt(0).toUpperCase() +
                              field.value.slice(1) || "Select Type"}
                          </span>
                          <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-card rounded-b-xl  z-50 min-w-md">
                        {debtTypes.map(debt => (
                          <DropdownMenuItem
                            className="p-3 border-1 border-border/30 hover:bg-muted-foreground/50"
                            key={debt.toLowerCase().replace(" ", "_")}
                            onSelect={() => field.onChange(debt.toLowerCase())}
                          >
                            {debt}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Principal and Outstanding Balance (Side by Side) */}
            <div className="flex w-full gap-2">
              <FormField
                control={debtForm.control}
                name="principal_amount"
                render={({ field, fieldState }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Principal</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          {currency}
                        </span>
                        <MyInput
                          disabled={loading}
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
              <FormField
                control={debtForm.control}
                name="outstanding_balance"
                render={({ field, fieldState }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Outstanding</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          {currency}
                        </span>
                        <MyInput
                          disabled={loading}
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
            </div>

            <FormField
              control={debtForm.control}
              name="tenure"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Tenure</FormLabel>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <MyInput
                        disabled={loading}
                        type="number"
                        placeholder="e.g., 12"
                        {...field}
                        className={cn(
                          "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                          fieldState.error &&
                            "border-destructive ring-destructive/20"
                        )}
                        aria-invalid={!!fieldState.error}
                      />
                    </FormControl>
                    <FormField
                      control={debtForm.control}
                      name="tenure_type"
                      render={({ field: unitField }) => (
                        <FormItem className="w-32">
                          <FormControl>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  disabled={loading}
                                  variant="ghost"
                                  className="w-full justify-between bg-input text-foreground border border-input-border"
                                >
                                  {unitField.value || "Unit"}
                                  <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-28 z-50 border-input-border border-t-0">
                                {repaymentFrequencies.map(unit => (
                                  <DropdownMenuItem
                                    className="bg-input outline-0 hover:bg-input-border p-2"
                                    key={unit}
                                    onSelect={() => unitField.onChange(unit)}
                                  >
                                    {unit}
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Repayment Amount with Inline Currency Dropdown */}
            <FormField
              control={debtForm.control}
              name="payment_amount"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>EMI</FormLabel>
                  <div className="relative flex items-center space-x-2">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {currency}
                    </span>
                    <MyInput
                      disabled={loading}
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
                    {/* Repayment Frequency with Inline Dropdown */}
                    <FormField
                      control={debtForm.control}
                      name="repayment_frequency"
                      render={({ field }) => (
                        <FormItem className="w-32">
                          <FormControl>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  disabled={loading}
                                  variant="ghost"
                                  className="w-full justify-between bg-input text-foreground border border-input-border"
                                >
                                  {field.value.charAt(0).toUpperCase() +
                                    field.value.slice(1) || "Frequency"}
                                  <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-40 z-50">
                                {repaymentFrequencies.map(freq => (
                                  <DropdownMenuItem
                                    key={freq.toLowerCase().replace("_", "")}
                                    onSelect={() =>
                                      field.onChange(freq.toLowerCase())
                                    }
                                  >
                                    {freq}
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Interest Rate and Start Date (Side by Side) */}
            <div className="flex w-full gap-2">
              <FormField
                control={debtForm.control}
                name="interest_rate"
                render={({ field, fieldState }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Interest Rate</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          %
                        </span>
                        <MyInput
                          disabled={loading}
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
              <FormField
                control={debtForm.control}
                name="repayment_start_date"
                render={({ field, fieldState }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            disabled={loading}
                            variant="ghost"
                            className={cn(
                              "w-full justify-start text-left font-normal h-10 bg-input border border-input-border Hover:bg-input",
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
                            selected={date}
                            onSelect={date => {
                              setDate(date || new Date());
                              field.onChange(date);
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage className="absolute -bottom-5 text-xs" />
                  </FormItem>
                )}
              />
            </div>

            {/* Note/Description Input */}
            <FormField
              control={debtForm.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <MyTextarea
                      disabled={loading}
                      placeholder="Add any additional notes..."
                      className="resize-none min-h-10"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={loading} type="submit" className="w-full h-10">
              Add Debt
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
