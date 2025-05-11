"use client";
import { LoginForm } from "@/components/auth/LoginForm";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  async function user() {
    const supabase = await createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log("Login User is : ", session);
  }
  user();
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <LoginForm />
    </div>
  );
}
