import { Wallet } from "@/types/modelTypes";
export const demoWallets: Wallet[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    user_id: "demo-user",
    name: "Cash Wallet",
    type: "cash",
    balance: 1234,
    icon: "wallet",
    created_at: new Date().toISOString(),
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    user_id: "demo-user",
    name: "Kotak Bank",
    type: "bank",
    balance: 5678,
    icon: "bank",
    created_at: new Date().toISOString(),
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    user_id: "demo-user",
    name: "HDFC Savings",
    type: "bank",
    balance: 10000,
    icon: "piggy-bank",
    created_at: new Date().toISOString(),
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    user_id: "demo-user",
    name: "Stock Portfolio",
    type: "bank",
    balance: 25000,
    icon: "line-chart",
    created_at: new Date().toISOString(),
  },
];
