"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { Loader2, LogOutIcon } from "lucide-react";
import { CustomToast } from "../my-ui/CustomToast";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AppRoutes } from "@/constants/constant";
import { useState } from "react";
import { logoutUser } from "@/store/slices/authSlice";

export function LogoutButton() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector(state => state.auth);
  const [loading, setLoading] = useState<boolean>(false);
  const handleLogout = async () => {
    try {
      setLoading(true);
      if (!user) {
        console.warn("No user is currently logged in. Aborting logout.");
        toast.custom(() =>
          CustomToast({
            type: "info",
            title: "Not Logged In",
            message: "No active session found.",
          })
        );
        return;
      }
      await dispatch(logoutUser());
      router.replace(AppRoutes.LOGIN);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Failed to logout the user", error);
      }
      console.log("Failed to logout", error);
      toast.custom(() =>
        CustomToast({
          type: "error",
          title: "Failed to Logout! Please try again",
          message: "Something went wrong",
        })
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      onClick={handleLogout}
      disabled={loading}
      variant="ghost"
      className="text-logout-text hover:text-logout-hover w-full justify-start gap-2 px-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2 cursor-pointer"
    >
      {loading ? (
        <Loader2 className="size-4 group-data-[collapsible=icon]:size-6 animate-spin" />
      ) : (
        <LogOutIcon className="size-4 group-data-[collapsible=icon]:size-5" />
      )}
      <span className="group-data-[collapsible=icon]:hidden">Logout</span>
    </Button>
  );
}
