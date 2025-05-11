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
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from "../ui/card";
import { Logo } from "@/components/common/Logo";
import { useState } from "react";
import { apiResponseSchema } from "@/schema/ApiResponse.schema";
import { toast } from "sonner";
import { CustomToast } from "@/components/common/CustomToast";
import { Loader, Eye, EyeOff } from "lucide-react";
import { AppRoutes } from "@/constants/constant";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

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
        toast.custom(t => <CustomToast type="login-success" />);
        route.push(AppRoutes.HOME);
      } else {
        toast.custom(t => (
          <CustomToast type="login-error" message={responseData.message} />
        ));
      }
    } catch (error) {
      console.error("login error:", error);
      toast.custom(t => (
        <CustomToast
          type="login-error"
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
                    <Input
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
                    <div className="relative">
                      <Input
                        placeholder="Password"
                        className="rounded-xl"
                        disabled={loading}
                        type={passwordVisible ? "text" : "password"}
                        {...field}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        onClick={() => setPasswordVisible(prev => !prev)}
                        className="absolute inset-y-0 right-0 z-10 flex items-center px-2"
                        aria-label={
                          passwordVisible ? "Hide password" : "Show password"
                        }
                      >
                        {passwordVisible ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </Button>
                    </div>
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
              {loading ? <Loader className="animate-spin" /> : "Enter Finari"}
            </Button>
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
