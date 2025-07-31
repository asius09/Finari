export type CurrencyCode =
  | "USD"
  | "EUR"
  | "INR"
  | "GBP"
  | "JPY"
  | "CNY"
  | "AUD";

export interface Currency {
  code: CurrencyCode;
  name: string;
  symbol: string;
  country: string;
}

export const CURRENCIES: Currency[] = [
  {
    code: "USD",
    name: "US Dollar",
    symbol: "$",
    country: "United States",
  },
  {
    code: "EUR",
    name: "Euro",
    symbol: "€",
    country: "European Union",
  },
  {
    code: "INR",
    name: "Indian Rupee",
    symbol: "₹",
    country: "India",
  },
  {
    code: "GBP",
    name: "British Pound",
    symbol: "£",
    country: "United Kingdom",
  },
  {
    code: "JPY",
    name: "Japanese Yen",
    symbol: "¥",
    country: "Japan",
  },
  {
    code: "CNY",
    name: "Chinese Yuan",
    symbol: "¥",
    country: "China",
  },
  {
    code: "AUD",
    name: "Australian Dollar",
    symbol: "A$",
    country: "Australia",
  },
];
