import { Home, List, Proportions, PieChart, Settings } from "lucide-react";

export const navbarRoutes = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Transactions",
    url: "/transactions",
    icon: List,
  },
  {
    title: "Assets & Liabilities",
    url: "/networth",
    icon: PieChart,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: Proportions,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];
