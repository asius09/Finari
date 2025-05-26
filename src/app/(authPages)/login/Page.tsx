"use client";
import { LoginForm } from "@/components/auth/LoginForm";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <LoginForm />
    </div>
  );
}
