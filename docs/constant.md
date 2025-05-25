# Constant Overview

This file documents the constant files used throughout the app for type safety, UI labels, and centralized control.

---

## `constant.ts`

**Purpose:**
Contains global enums and app-level constants.

**Key Enums:**

- `DBTables` – Central list of Supabase/DB table names.
- `AppRoutes` – All app routes for navigation and routing.
- `Theme`, `Currency`, `Greetings` – App options and labels.
- `LoadingTypeEnum`, `ErrorTypes` – Common status and error enums.

---

---

## `asset.constant.ts`

**Purpose:**  
Defines supported asset types like cash, bank account, property, etc., with type-safe enums and UI metadata.

**Exports:**

- `AssetTypeEnum` – Enum of asset types.
- `assetTypes` – Tuple of all asset types (used for iteration/validation).
- `AssetType` – Type derived from `assetTypes`.
- `assetTypeDetails` – Labels, icons, and colors for each type (used in UI).

**Example:**

```ts
assetTypeColorMap["cash"]; // "emerald"
```

---

## 🔹 `wallet.constant.ts`

**Purpose:**
Defines types of wallets like cash, bank, card, UPI, etc., used in the app.

_Structure similar to `asset.constant.ts`._

---

## 🔹 `debt.constant.ts`, `transaction.constant.ts`, `filter.constant.ts`

These files follow the same structure:

- Enums and type-safe arrays.
- UI metadata for dropdowns and filtering.
- Helpful for consistent labels and type inference.

---

```

```

---

### 📁 Folder-to-Section Mapping

`constants/` :

```bash
constants/
│
├── asset.constant.ts
├── wallet.constant.ts
├── transaction.constant.ts
├── debt.constant.ts
├── filter.constant.ts
└── constant.ts
```

```

```
