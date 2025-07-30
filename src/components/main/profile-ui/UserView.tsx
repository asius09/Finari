"use client";

import { MyDropdownInput } from "@/components/my-ui/MyDropdowns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingTypeEnum, Theme, ThemeTypes } from "@/constants";
import { CurrencyCode, CURRENCIES } from "@/constants/currencies.constant";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { format } from "date-fns";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { debounce } from "@/utils/debounce";
import { updateUserProfile } from "@/store/slices/userSlice";
import { toast } from "sonner";
import { CustomToast } from "@/components/my-ui/CustomToast";
import { EditUserProfileDialog } from "@/components/main/profile-ui/EditUserProfle";
import { Skeleton } from "@/components/ui/skeleton";

export function UserView() {
  const dispatch = useAppDispatch();
  const { theme, setTheme } = useTheme();
  const { profile, loading } = useAppSelector(state => state.userProfile);
  const [userCurrency, setUserCurrency] = useState<CurrencyCode>(
    profile?.currency as CurrencyCode
  );

  const handleThemeChange = (theme: ThemeTypes) => {
    setTheme(theme);
  };

  const handleCurrencyChange = (currency: CurrencyCode) => {
    const debouncedUpdateProfile = debounce(async () => {
      try {
        if (profile?.id) {
          const result = await dispatch(
            updateUserProfile({
              updatedProfile: { currency: currency as CurrencyCode},
              userId: profile.id,
            })
          ).unwrap();

          toast.custom(() =>
            CustomToast({
              type: "success",
              message: `Currency change to ${result.currency} successfully!`,
            })
          );
        }
        setUserCurrency(currency);
      } catch (error) {
        console.error("Failed to change currency:", error);
        toast.custom(() =>
          CustomToast({
            type: "error",
            message: "Failed to change currency. Please try again.",
          })
        );
      }
    }, 300);

    debouncedUpdateProfile();
  };

  const handleAvatarChange = () => {
    toast.custom(() =>
      CustomToast({
        type: "info",
        title: "Feature Coming Soon",
        message:
          "Avatar change feature is currently unavailable. We're working on it and will update soon!",
      })
    );
  };

  // Update local state whenever profile changes
  useEffect(() => {
    if (profile) {
      setUserCurrency(profile.currency as CurrencyCode);
    }
  }, [profile]);

  if (loading === LoadingTypeEnum.PENDING) {
    return (
      <div className="flex flex-col gap-4">
        {/* Profile card skeleton */}
        <Card className="p-4">
          <CardContent className="flex flex-col items-center gap-4 md:flex-row md:justify-between md:items-start">
            {/* Profile content wrapper */}
            <div className="w-full flex flex-col items-center justify-center gap-6 md:flex-row md:items-start md:justify-start">
              {/* Avatar placeholder */}
              <Skeleton className="h-24 w-24 rounded-full" />

              {/* Profile text content placeholders */}
              <div className="flex flex-col gap-2 justify-center items-center md:justify-start md:items-start">
                {/* Full name placeholder */}
                <Skeleton className="h-8 w-48" />

                {/* Email and member since placeholders */}
                <div className="space-y-0.5 flex flex-col justify-center items-center md:justify-start md:items-start">
                  <Skeleton className="h-4 w-64" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </div>
            <Skeleton className="w-full h-10 md:w-24" />
          </CardContent>
        </Card>

        {/* Settings card skeleton */}
        <Card className="p-4">
          <CardContent className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            {/* Theme selector placeholder */}
            <div className="flex flex-col w-full gap-2 md:flex-row md:items-center md:gap-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full md:max-w-[200px]" />
            </div>

            {/* Currency selector placeholder */}
            <div className="flex flex-col w-full gap-2 md:flex-row md:items-center md:gap-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full md:max-w-[200px]" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-4">
        <CardContent className="flex flex-col items-center gap-4 md:flex-row md:justify-between md:items-start">
          <div className="w-full flex flex-col items-center justify-center gap-6 md:flex-row md:items-start md:justify-start">
            <Avatar className="relative h-24 w-24 border border-primary overflow-visible">
              <AvatarImage src={profile?.avatar_url} />
              <AvatarFallback className="text-5xl font-bold text-primary-hover">
                {profile?.full_name?.split(" ")[0]?.charAt(0) || "f"}
              </AvatarFallback>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full w-8 h-8 text-primary-foreground bg-primary absolute bottom-0 right-0 hover:bg-primary-hover cursor-pointer"
                onClick={handleAvatarChange}
              >
                <Pencil className="w-4 h-4" />
              </Button>
            </Avatar>

            <div className="flex flex-col gap-2 justify-center text-center md:text-left">
              <h1 className="text-2xl font-bold text-foreground tracking-tight">
                {profile?.full_name}
              </h1>
              <div className="space-y-0.5">
                <p className="text-base text-muted-foreground">
                  {profile?.email}
                </p>
                <p className="text-sm text-muted-foreground/80">
                  Member since{" "}
                  {profile?.created_at
                    ? format(new Date(profile.created_at), "yyyy")
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>

          <EditUserProfileDialog />
        </CardContent>
      </Card>
      <Card className="p-4">
        <CardContent className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col w-full gap-2 md:flex-row md:items-center md:gap-4">
            <p className="text-base md:text-lg text-foreground min-w-[80px]">
              Theme
            </p>
            <MyDropdownInput
              dropdownMenu={Object.values(Theme)}
              value={theme as string}
              placeholder="Select Theme"
              key={"user-theme"}
              onChange={theme => handleThemeChange(theme as ThemeTypes)}
              onSelect={theme => handleThemeChange(theme as ThemeTypes)}
              className="w-full md:max-w-[200px]"
            />
          </div>
          <div className="flex flex-col w-full gap-2 md:flex-row md:items-center md:gap-4">
            <p className="text-base md:text-lg text-foreground min-w-[80px]">
              Currency
            </p>
            <MyDropdownInput
              dropdownMenu={CURRENCIES.map(currency => currency.code)}
              value={userCurrency || "INR"} //Default Value
              placeholder="Select Currency"
              key={"user-currency"}
              onChange={currency =>
                handleCurrencyChange(currency as CurrencyCode)
              }
              onSelect={currency =>
                handleCurrencyChange(currency as CurrencyCode)
              }
              className="w-full md:max-w-[200px]"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
