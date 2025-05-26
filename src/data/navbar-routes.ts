import { AppRoutes } from "@/constants";
import {
  List,
  Proportions,
  PieChart,
  Settings,
  WalletMinimal,
  LayoutDashboard,
} from "lucide-react";

export const navbarRoutes = [
  {
    title: "Dashboard",
    url: AppRoutes.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    title: "Transactions",
    url: AppRoutes.TRANSACTIONS,
    icon: List,
  },
  {
    title: "Wallets",
    url: AppRoutes.WALLETS,
    icon: WalletMinimal,
  },
  {
    title: "Assets & Liabilities",
    url: AppRoutes.NETWORTH,
    icon: PieChart,
  },
  {
    title: "Reports",
    url: AppRoutes.REPORT,
    icon: Proportions,
  },
  {
    title: "Settings",
    url: AppRoutes.SETTINGS,
    icon: Settings,
  },
];
