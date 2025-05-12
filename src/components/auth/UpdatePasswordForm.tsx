"use client";
import { resetPasswordFormSchema } from "@/schema/resetPasswordForm.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Logo } from "@/components/common/Logo";
import { useState } from "react";
import { toast } from "sonner";
import { CustomToast } from "@/components/common/CustomToast";
import { Loader } from "lucide-react";
import { AppRoutes } from "@/constants/constant";
import { useRouter } from "next/navigation";
import { PasswordInput } from "../common/PasswordInput";
import { createClient } from "@/utils/supabase/client";

export const UpdatePasswordForm = () => {
  const route = useRouter();
  const [loading, setLoading] = useState(false);

  const resetPasswordForm = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  async function onSubmit(data: z.infer<typeof resetPasswordFormSchema>) {
    try {
      setLoading(true);
      const supabase = createClient();

      // First check if there's an active session
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        toast.custom(() => (
          <CustomToast
            type="error"
            title="Session Expired"
            message="No active session found. Please request a new password reset link."
          />
        ));
        route.push(AppRoutes.LOGIN);
        return;
      }

      const { data: updatePasswordData, error } =
        await supabase.auth.updateUser({
          password: data.password,
        });

      if (error) {
        let userMessage = "Failed to update password";
        if (error.message.includes("password")) {
          userMessage = "Password must be at least 6 characters";
        } else if (error.message.includes("session")) {
          userMessage = "Session expired. Please request a new reset link";
          route.push(AppRoutes.LOGIN);
        }
        toast.custom(() => (
          <CustomToast type="error" title="Error" message={userMessage} />
        ));
      } else {
        console.log("Password updated successfully:", updatePasswordData);
        toast.custom(() => (
          <CustomToast
            type="success"
            title="Password Updated"
            message="Your password has been successfully updated"
          />
        ));
        route.push(AppRoutes.LOGIN);
      }
    } catch (error) {
      console.error("Password update error:", error);
      toast.custom(() => (
        <CustomToast
          type="error"
          title="Error"
          message="Something went wrong. Please try again."
        />
      ));
      route.push(AppRoutes.LOGIN);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-sm min-w-xs p-6">
      <CardHeader>
        <CardTitle className="flex-1 shrink-0 whitespace-nowrap mb-4 text-xl flex justify-center items-center font-bold">
          Update your{" "}
          <Logo
            size="small"
            aspectRatio={2}
            variant="full"
            className="mx-1 mb-1"
          />{" "}
          Password
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...resetPasswordForm}>
          <form
            onSubmit={resetPasswordForm.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={resetPasswordForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pasword*</FormLabel>
                  <FormControl>
                    <PasswordInput
                      value={field.value}
                      onChange={field.onChange}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={resetPasswordForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password*</FormLabel>
                  <FormControl>
                    <PasswordInput
                      value={field.value}
                      onChange={field.onChange}
                      className="w-full"
                      placeholder="Confirm Password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="gradient"
              className="font-medium w-full h-10"
              disabled={loading}
            >
              {loading ? (
                <Loader className="animate-spin" />
              ) : (
                "Update Password"
              )}
            </Button>
          </form>
        </Form>
        <p className="text-center text-sm mt-4">
          Remember your password?{" "}
          <Link
            href={AppRoutes.LOGIN}
            className="text-primary hover:underline transition-colors cursor-pointer"
            aria-label="Navigate to login page"
          >
            Login
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
