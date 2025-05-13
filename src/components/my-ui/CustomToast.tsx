"use client";
import { CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

interface CustomToastProps {
  type: "success" | "error" | "info" | "warning";
  message?: string;
  title?: string;
}

export const CustomToast = ({ type, message, title }: CustomToastProps) => {
  const toastConfig = {
    success: {
      light: {
        bg: "bg-[#d1fae5]",
        text: "text-[#10b981]",
        border: "border-[#10b981]/50",
      },
      dark: {
        bg: "dark:bg-[#164c38]",
        text: "dark:text-[#6ee7b7]",
        border: "dark:border-[#6ee7b7]/50",
      },
      icon: <CheckCircle className="w-5 h-5" />,
      defaultTitle: "Success!",
      defaultMessage: "Operation completed successfully.",
    },
    error: {
      light: {
        bg: "bg-[#fee2e2]",
        text: "text-[#ef4444]",
        border: "border-[#ef4444]/50",
      },
      dark: {
        bg: "dark:bg-[#4b1b1b]",
        text: "dark:text-[#f87171]",
        border: "dark:border-[#f87171]/50",
      },
      icon: <AlertCircle className="w-5 h-5" />,
      defaultTitle: "Error",
      defaultMessage: "Something went wrong. Please try again.",
    },
    info: {
      light: {
        bg: "bg-[#dbeafe]",
        text: "text-[#3b82f6]",
        border: "border-[#3b82f6]/50",
      },
      dark: {
        bg: "dark:bg-[#1e3a8a]",
        text: "dark:text-[#93c5fd]",
        border: "dark:border-[#93c5fd]/50",
      },
      icon: <Info className="w-5 h-5" />,
      defaultTitle: "Information",
      defaultMessage: "Here's some information you should know.",
    },
    warning: {
      light: {
        bg: "bg-[#fef3c7]",
        text: "text-[#f59e0b]",
        border: "border-[#f59e0b]/50",
      },
      dark: {
        bg: "dark:bg-[#4d3d14]",
        text: "dark:text-[#fcd34d]",
        border: "dark:border-[#fcd34d]/50",
      },
      icon: <AlertTriangle className="w-5 h-5" />,
      defaultTitle: "Warning",
      defaultMessage: "This action requires your attention.",
    },
  };

  const { light, dark, icon, defaultTitle, defaultMessage } = toastConfig[type];
  const toastTitle = title || defaultTitle;

  return (
    <div
      className={`p-2 md:p-4 rounded-md w-full min-w-96 max-w-2xl border ${light.bg} ${light.border} ${dark.bg} ${dark.border}`}
    >
      <div className="flex items-center gap-2">
        <span className={`${light.text} ${dark.text}`}>{icon}</span>
        <h3 className={`font-medium ${light.text} ${dark.text}`}>
          {toastTitle}
        </h3>
      </div>
      <p className={`text-sm mt-1 pl-7 ${light.text} ${dark.text}`}>
        {message || defaultMessage}
      </p>
    </div>
  );
};
