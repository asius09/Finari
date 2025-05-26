# Model Types

This document outlines the types used in the application.

## UserProfile

Exported as `UserProfile` from `modelTypes.ts`.

| Property   | Type     | Description                 |
| ---------- | -------- | --------------------------- | -------- |
| id         | `string` | UUID (same as auth.user id) |
| full_name  | `string` |                             |
| avatar_url | `string` | optional                    |
| theme      | `"light" | "dark"`                     | optional |
| currency   | `string` | e.g. 'INR', 'USD'           |
| created_at | `string` | ISO timestamp               |

## Wallet

Exported as `Wallet` from `modelTypes.ts`.

| Property   | Type     | Description                   |
| ---------- | -------- | ----------------------------- | ------------- | --- |
| id         | `string` | UUID                          |
| user_id    | `string` | FK to auth.users              |
| name       | `string` | e.g. Kotak Bank               |
| type       | `"bank"  | "cash"                        | "investment"` |     |
| balance    | `number` | updated based on transactions |
| icon       | `string` | optional icon name or URL     |
| created_at | `string` | ISO timestamp                 |

## Transaction

Exported as `Transaction` from `modelTypes.ts`.

| Property    | Type      | Description                     |
| ----------- | --------- | ------------------------------- | ------------- | --- |
| id          | `string`  |                                 |
| user_id     | `string`  | FK to auth.user.id              |
| wallet_id   | `string`  | FK to Wallet                    |
| amount      | `number`  |                                 |
| type        | `"income" | "expense"                       | "investment"` |     |
| category    | `string`  | e.g., 'Food', 'Bills', 'Salary' |
| description | `string`  | optional                        |
| date        | `string`  | ISO date string                 |
| created_at  | `string`  |                                 |

## FinancialSummary

Exported as `FinacialSummary` from `modelTypes.ts`.

| Property   | Type     | Description           |
| ---------- | -------- | --------------------- |
| id         | `string` |                       |
| user_id    | `string` |                       |
| date       | `string` | format: 'YYYY-MM-DD'  |
| income     | `number` | total income till now |
| expense    | `number` | total expense         |
| saveing    | `number` | total saving          |
| asets      | `number` | total assets till now |
| debts      | `number` | total debts till now  |
| created_at | `string` |                       |

## Debt

Exported as `Debt` from `modelTypes.ts`.

| Property             | Type     | Description                                           |
| -------------------- | -------- | ----------------------------------------------------- | --------- | ---------- | --------- | --- |
| id                   | `string` | UUID                                                  |
| user_id              | `string` | FK to auth.users                                      |
| name                 | `string` | e.g., 'Loan from Sarah', 'Credit Card Balance'        |
| debt_type            | `"loan"  | "credit_card"                                         | "p2p"     | "other"`   |           |
| principal_amount     | `number` | Original amount (if applicable)                       |
| outstanding_balance  | `number` |                                                       |
| interest_rate        | `number` | Annual rate (e.g., 0.05 for 5%)                       |
| repayment_frequency  | `"once"  | "weekly"                                              | "monthly" | "annually" | "custom"` |     |
| repayment_start_date | `string` | ISO date                                              |
| repayment_end_date   | `string` | ISO date (if known)                                   |
| next_payment_date    | `string` | ISO date                                              |
| payment_amount       | `number` | Regular payment amount (if applicable)                |
| notes                | `string` | For additional details (e.g., interest terms for P2P) |
| tenure               | `number` |                                                       |
| tenure_type          | `"once"  | "weekly"                                              | "monthly" | "annually" | "custom"` |     |
| created_at           | `string` |                                                       |

## Asset

Exported as `Asset` from `modelTypes.ts`.

| Property       | Type                      | Description                                                    |
| -------------- | ------------------------- | -------------------------------------------------------------- | ------------ | ---------- | --------------- | -------- | --- |
| id             | `string`                  | UUID                                                           |
| user_id        | `string`                  | FK to auth.users                                               |
| name           | `string`                  | User-defined name                                              |
| asset_type     | `"cash"                   | "bank_account"                                                 | "investment" | "property" | "personal_item" | "other"` |     |
| current_value  | `number`                  | Current estimated value                                        |
| purchase_date  | `string`                  |                                                                |
| purchase_price | `number`                  |                                                                |
| notes          | `string`                  |                                                                |
| created_at     | `string`                  | ISO timestamp                                                  |
| updated_at     | `string`                  | ISO timestamp (when current_value was last updated)            |
| details        | `Record<string, unknown>` | Flexible details object to hold any asset-specific information |
