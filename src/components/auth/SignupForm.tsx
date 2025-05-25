"use client";
import { signupFormSchema } from "@/schema/signupForm.schema";
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
import { Logo } from "@/components/my-ui/Logo";
import { useState } from "react";
import { toast } from "sonner";
import { CustomToast } from "@/components/my-ui/CustomToast";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { AppRoutes } from "@/constants/constant";
import { PasswordInput } from "@/components/my-ui/PasswordInput";
import { MyButton } from "../my-ui/MyButton";

export const SignupForm = () => {
  const route = useRouter();
  const [loading, setLoading] = useState(false);

  const signupForm = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: { fullName: "", email: "", password: "" },
  });

  async function onSubmit(data: z.infer<typeof signupFormSchema>) {
    try {
      setLoading(true);

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      if (responseData) {
        toast.custom(() => (
          <CustomToast
            type="success"
            title="Account Created"
            message="Account created successfully! Redirecting to login..."
          />
        ));
        route.replace(AppRoutes.LOGIN);
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.custom(() => (
        <CustomToast
          type="error"
          title="Error"
          message="Something went wrong. Please try again."
        />
      ));
    } finally {
      setLoading(false);
    }
  }

  function handleGoogleSignup() {
    // TODO: Implement Google signup
  }

  return (
    <Card className="w-full max-w-sm min-w-xs p-6">
      <CardHeader>
        <CardTitle className="flex-1 shrink-0 whitespace-nowrap mb-4 text-2xl flex justify-center items-center font-bold">
          Create your{" "}
          <Logo
            size="small"
            aspectRatio={2}
            variant="full"
            className="mx-1 mb-0.5"
          />{" "}
          Account
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
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Full Name e.g. Adiba Firoz"
                      className="rounded-xl"
                      type="text"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary hover:underline transition-colors cursor-pointer"
            aria-label="Navigate to login page"
          >
            Login
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
          onClick={handleGoogleSignup}
          disabled={loading}
        >
          <i className="ri-google-fill"></i>
          Google
        </Button>
      </CardFooter>
    </Card>
  );
};
