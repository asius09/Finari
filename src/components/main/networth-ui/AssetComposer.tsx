"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
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
import { assetFormSchema } from "@/schema/asset.schema";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { AssetTypeEnum, assetTypes } from "@/constants/constant";
import { MyInput } from "@/components/my-ui/MyInput";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { MyTextarea } from "@/components/my-ui/MyTextarea";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { addAsset } from "@/store/slices/assetSlice";
import { CustomToast } from "@/components/my-ui/CustomToast";
import { toast } from "sonner";

type AssetFormType = z.infer<typeof assetFormSchema>;

interface AssetComposerProps {
  btnClassName: string;
  btnChildren: React.ReactNode;
  formTitle?: string;
  formDescription?: string;
  assetId?: string;
}

export const AssetComposer = ({
  btnClassName,
  btnChildren,
  formDescription = "",
  formTitle = "Add Assets",
  assetId,
}: AssetComposerProps) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const userId = user?.id;
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());

  const currency = "$";

  const assetForm = useForm<AssetFormType>({
    resolver: zodResolver(assetFormSchema),
    defaultValues: {
      name: "",
      asset_type: AssetTypeEnum.INVESTMENT,
      purchase_price: 0,
      purchase_date: format(new Date(), "yyyy-MM-dd"),
      notes: "",
    },
  });

  const onSubmit = async (data: AssetFormType) => {
    try {
      setLoading(true);
      const asset = {
        ...data,
        user_id: userId,
        current_value: data.purchase_price,
      };
      if (!userId) {
        throw new Error("User ID is required to add an asset");
      }
      const response = await dispatch(addAsset({ userId, asset }));
      if (addAsset.fulfilled.match(response)) {
        toast.custom(() => (
          <CustomToast
            type="success"
            title={assetId ? "Asset Updated" : "Asset Add"}
            message={`Your asset was successfully ${assetId ? "updated" : "Added"}`}
          />
        ));
        setOpen(false);
        assetForm.reset();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("Error submitting asset:", error);
      }
      toast.custom(() => (
        <CustomToast
          type="error"
          title={assetId ? "Failed to Updated Asset" : "Failed to Add Asset"}
          message={`Something went wrong, Please Try again`}
        />
      ));
    } finally {
      setLoading(false);
    }
  };

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
        <Form {...assetForm}>
          <form
            onSubmit={assetForm.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {/* Asset Name */}
            <FormField
              control={assetForm.control}
              name="name"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Asset Name</FormLabel>
                  <FormControl>
                    <MyInput
                      disabled={loading}
                      type="text"
                      placeholder="Asset Name"
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

            {/* Asset Types  */}
            <FormField
              control={assetForm.control}
              name="asset_type"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Asset Type</FormLabel>
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
                            field.value.slice(1) || "Select category"}
                        </span>
                        <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-card rounded-b-xl  z-50 min-w-md">
                      {assetTypes.map(asset => (
                        <DropdownMenuItem
                          className="p-3 border-1 border-border/30 hover:bg-muted-foreground/50"
                          key={asset}
                          onSelect={() => field.onChange(asset)}
                        >
                          {asset
                            .split("_")
                            .map(
                              word =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Purchase Price */}
            <FormField
              control={assetForm.control}
              name="purchase_price"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Purchase Price</FormLabel>
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

            {/* Purchase Date */}
            <FormField
              control={assetForm.control}
              name="purchase_date"
              render={({ field, fieldState }) => (
                <FormItem className="flex-1">
                  <FormLabel>Purchase Date</FormLabel>
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

            {/* Note/Description Input */}
            <FormField
              control={assetForm.control}
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
              Add Asset
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
