import { useState } from "react";
import { MyInput } from "./MyInput";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  placeholder?: string;
  disabled?: boolean;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const PasswordInput = ({
  placeholder = "Password",
  disabled = false,
  value,
  onChange,
  className = "",
}: PasswordInputProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="relative">
      <MyInput
        placeholder={placeholder}
        className={`rounded-xl ${className}`}
        disabled={disabled}
        type={passwordVisible ? "text" : "password"}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={() => setPasswordVisible(prev => !prev)}
        className="absolute inset-y-0 right-0 z-10 flex items-center px-3"
        aria-label={passwordVisible ? "Hide password" : "Show password"}
      >
        {passwordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
      </Button>
    </div>
  );
};
