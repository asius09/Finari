"use client";
import { loginFormSchema } from "@/schema/loginForm.schema";
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
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from "../ui/card";
import { Logo } from "@/components/my-ui/Logo";
import { useState } from "react";
import { apiResponseSchema } from "@/schema/ApiResponse.schema";
import { toast } from "sonner";
import { CustomToast } from "@/components/my-ui/CustomToast";
import { Loader } from "lucide-react";
import { AppRoutes } from "@/constants/constant";
import { useRouter } from "next/navigation";
import { PasswordInput } from "../my-ui/PasswordInput";
import { MyButton } from "../my-ui/MyButton";
import { MyInput } from "../my-ui/MyInput";

export const LoginForm = () => {
  const route = useRouter();
  const [loading, setLoading] = useState(false);

  const signupForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data: z.infer<typeof loginFormSchema>) {
    try {
      setLoading(true);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = apiResponseSchema.parse(await response.json());

      if (responseData.success) {
        console.log("User logged in successfully:", responseData?.data);
        toast.custom(() => (
          <CustomToast
            type="success"
            title="Login Successful"
            message="You have been successfully logged in"
          />
        ));
        route.push(AppRoutes.HOME);
      } else {
        toast.custom(() => (
          <CustomToast
            type="error"
            title="Login Failed"
            message={responseData.message}
          />
        ));
      }
    } catch (error) {
      console.error("login error:", error);
      toast.custom(() => (
        <CustomToast
          type="error"
          title="Login Error"
          message="Something went wrong. Please try again."
        />
      ));
    } finally {
      setLoading(false);
    }
  }

  function handleGoogleLogin() {
    // TODO: Implement Google Login
  }

  async function handleResetPassword(data: z.infer<typeof loginFormSchema>) {
    try {
      setLoading(true);
      const email = data.email;
      if (!email) {
        console.warn("[ResetPassword] Email is required for password reset");
        toast.custom(() => (
          <CustomToast
            type="error"
            title="Reset Password Error"
            message="Please enter your email address to reset password"
          />
        ));
        return;
      }
      console.log(
        "[ResetPassword] Initiating password reset for email:",
        email
      );

      const response = await fetch(
        `/api/auth/reset-password?email=${encodeURIComponent(email)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.json();
      console.log("[ResetPassword] API response:", responseData);

      if (responseData.success) {
        console.log("[ResetPassword] Reset link sent successfully");
        toast.custom(() => (
          <CustomToast
            type="success"
            title="Reset Link Sent"
            message="Password reset link sent to your email"
          />
        ));
      } else {
        console.warn(
          "[ResetPassword] Failed to send reset link:",
          responseData.message
        );
        toast.custom(() => (
          <CustomToast
            type="error"
            title="Reset Password Error"
            message={responseData.message || "Failed to send reset link"}
          />
        ));
      }
    } catch (error) {
      console.error("[ResetPassword] Unexpected error:", error);
      toast.custom(() => (
        <CustomToast
          type="error"
          title="Reset Password Error"
          message="Something went wrong. Please try again."
        />
      ));
    } finally {
      console.log("[ResetPassword] Process completed");
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-sm min-w-xs p-6">
      <CardHeader>
        <CardTitle className="flex-1 shrink-0 whitespace-nowrap mb-4 text-2xl flex justify-center items-center font-bold">
          Welcome back to{" "}
          <Logo
            size="small"
            aspectRatio={2}
            variant="full"
            className="mx-1 mb-0.5"
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...signupForm}>
          <form
            onSubmit={signupForm.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={signupForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email*</FormLabel>
                  <FormControl>
                    <MyInput
                      placeholder="Email e.g. adiba@example.com"
                      className="rounded-xl"
                      disabled={loading}
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={signupForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password*</FormLabel>
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
            <div className="w-full flex items-center justify-end">
              <Button
                type="button"
                variant={"link"}
                className="text-sm p-0 h-5"
                disabled={loading}
                onClick={e => {
                  e.preventDefault();
                  const email = signupForm.getValues("email");
                  handleResetPassword({ email, password: "" });
                }}
              >
                Reset your Password?
              </Button>
            </div>
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
        <p className="text-center text-xs mt-4">
          Create an account{" "}
          <Link
            href={AppRoutes.SIGNUP}
            className="text-primary hover:underline transition-colors cursor-pointer"
            aria-label="Navigate to login page"
          >
            Signup
          </Link>
        </p>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <div className="w-full flex items-center gap-x-4 text-muted-foreground text-xs py-4">
          <div className="flex-1 border-t border-border"></div>
          <span>OR</span>
          <div className="flex-1 border-t border-border"></div>
        </div>
        <Button
          className="font-medium w-full h-10"
          variant="outline"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <i className="ri-google-fill"></i>
          Google
        </Button>
      </CardFooter>
    </Card>
  );
};
