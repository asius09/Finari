# Finari - AI-Assisted Personal Finance App

## Table of Contents

1. [Introduction](#introduction)
2. [Why Finari?](#why-finari)
3. [Key Features](#key-features)
4. [Tech Stack](#tech-stack)
5. [Project Roadmap](#project-roadmap)
6. [Installation](#installation)
7. [Configuration](#configuration)
8. [Commit Standards](#commit-standards)
9. [Contributing](#contributing)
10. [License](#license)

## Introduction

Finari is a minimalist, AI-assisted personal finance app designed to track everything from cash and cards to assets and loans — all in one place. Built with privacy, clarity, and control at its core, Finari offers a comprehensive solution for personal finance management.

## Why Finari?

- 🛑 Stop switching between apps to manage or check finances
- 🎨 Visual, simple interface for instant clarity
- ⏱️ All transactions (manual or automatic) in one timeline
- 💼 Handles physical and digital assets alike
- 🚀 Future-ready: built to grow with AI, reminders, and enhanced security

## Key Features

- Minimal modern UI
- Manual & real-time transaction tracking
- Visual dashboards: charts, graphs, spending breakdowns
- Asset and liability management (banks, gold, loans, cards)
- Reminders for due dates (EMIs, bills, etc.)
- Secure vault for passwords and sensitive info
- AI-assisted budget suggestions (future)
- One-stop payment overview
- Privacy-first with strong encryption & RLS

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Edge Functions)
- **Charts**: Recharts or Nivo
- **State Management**: Zustand
- **AI**: OpenAI API (for future smart assistance)
- **Security**: Supabase RLS + AES encryption

Okay, this is a fantastic update! It sounds like you're really getting into the practical application and optimization, which is crucial for a real-world tool like Finari. Let's integrate these new goals and re-prioritize the roadmap.

I'll re-sequence some phases to reflect your immediate focus on user settings, data optimization, and historical data, while also adding the Google Auth login phase.

---

## Finari App Development Roadmap

### Phase 1: Planning & Design ✅

- [x] Finalize app name and tagline
- [x] Define core features and priorities
- [x] Design initial user flows (Login → Dashboard → Add Data)
- [x] Create UI wireframes (mobile-first and desktop)
- [x] Pick chart library and visualization types

---

### Phase 2: Backend & Database ✅

- [x] Set up Supabase project
- [x] Create tables: users, transactions, assets, debts, reminders, cards, vault_items
- [x] Configure Row-Level Security (RLS) and Policies
- [x] Implement Supabase Auth (email/password or magic link)

---

### Phase 3: Frontend Setup ✅

- [x] Initialize Next.js + Tailwind project
- [x] Setup colors schema and prepare shadcn components
- [x] Ready Global CSS for schema
- [x] Create layout and theme (dark/light mode optional)
- [x] Setup Redux for global state
- [x] Build auth pages: login, register, reset password
- [x] Build dashboard page (show cards, charts, reminders)
- [x] Add forms to manually input data (transactions, assets, etc.)

---

### Phase 4: Data Visualization ✅

- [x] Integrate charts using tremor.so
- [x] Create donut chart for asset types
- [x] Bar graph for monthly income vs expense
- [x] Line chart for debt repayment over time
- [x] Add filters (monthly, yearly, category-wise)

---

### Phase 5: Assets & Debts Management (In Progress)

- [x] Create assets page with CRUD operations
- [x] Add form for new assets (type, value, description)
- [ ] Display assets in table with sorting/filtering
- **Detail:** Implement a responsive data table component (e.g., using Shadcn UI's DataTable with TanStack Table).
- [ ] Implement edit/delete functionality
- **Detail:** Ensure optimistic updates for a smoother user experience, with rollbacks on API failure.
- [ ] Add asset type categorization (cash, investments, property, etc.)
- **Detail:** Use dropdowns or radio buttons for selection, and store in DB.
- [x] Create debts page with CRUD operations
- [ ] Add form for new debts (type, amount, interest rate, due date)
- **Detail:** Implement "inline dropdowns" for units (e.g., tenure unit, repayment frequency unit) and currency display within input fields.
- [ ] Display debts in table with sorting/filtering
- **Detail:** Similar to assets, use a responsive data table.
- [ ] Implement edit/delete functionality
- **Detail:** Apply optimistic updates and robust error handling.
- [ ] Add debt type categorization (loans, credit cards, mortgages, etc.)
- **Detail:** Use dropdowns or radio buttons for selection.
- [ ] Add net worth calculation (assets - debts)
- **Detail:** Implement a helper function or Redux selector to derive net worth from state. Display on dashboard.
- [ ] Create visualizations for assets/debts breakdown
- **Detail:** Use pie/donut charts for category distribution and bar charts for total assets/debts over time.

---

### Phase 6: User Profile & Settings (Next Immediate Focus)

**Goal:** Allow users to manage their profile and application preferences, including updating their data.

- [ ] Create **Settings Page** with distinct sections:
- [ ] **Profile Management:**
- [ ] Display user's current profile data (name, email, etc.).
- [ ] Implement **"User Update" forms** for necessary inputs (e.g., name, email, avatar URL).
- [ ] Implement change password functionality (requires current password verification).
- [ ] Handle updating user data in Supabase `auth.users` table and/or a `profiles` table.
- [ ] **Account Preferences:**
- [ ] Theme selection (light/dark/system).
- [ ] Default currency setting.
- [ ] Date format options.
- [ ] **Notification Settings:**
- [ ] Placeholder for future email notification preferences.
- [ ] Placeholder for future push notification settings.
- [ ] **Security Settings:**
- [ ] Implement **Google OAuth Login** integration with Supabase.
- [ ] Manage connected social accounts (Google).
- [ ] Option to enable/disable 2FA (Future consideration, not part of initial Google Auth).

---

### Phase 7: App Optimization & Data Handling (Ongoing Focus)

**Goal:** Improve app performance, data presentation, and prepare for historical data.

- [ ] **Test Current App Features & Optimize:**
- [ ] Comprehensive testing of existing functionalities (Auth, Dashboard, Add Forms).
- [ ] Identify performance bottlenecks (e.g., large data fetches).
- [ ] Refactor and improve codebase for maintainability and efficiency while documenting.
- [ ] **Enhance Filters:**
- [ ] Improve existing filters for transactions, assets, debts.
- [ ] Add more granular filtering options (e.g., custom date ranges, specific merchants/payees, exact amounts).
- [ ] Ensure filter state persists across navigation or is easily reset.
- [ ] **Transactions Page Optimization:**
- [ ] Implement **pagination/infinite scrolling** to show limited transactions per view (e.g., 20-50 per load) and fetch more on scroll/button click.
- [ ] Improve transaction page layout to be more aligned and responsive (e.g., a well-structured table or grid, optimized for small devices).
- [ ] **Temporary History Data (Simplified View):**
- [ ] Create a basic, simple way to view historical data for key metrics (e.g., total income/expenses per month, net worth snapshot). This could be a static list or simple summary cards.
- [ ] Focus on data aggregation that is easy to query and display initially.
- [ ] **Small Device Friendly:**
- [ ] Continuously review and optimize UI for mobile and tablet responsiveness (adjusting layouts, font sizes, spacing).

---

### Phase 8: Comprehensive Historical Data & Reports (Next Major Phase)

**Goal:** Implement robust historical data tracking and advanced reporting features.

- [ ] **Historical Data Implementation:**
- [ ] Ensure all relevant data points (transactions, asset values, debt balances) are timestamped for historical tracking.
- [ ] Implement backend queries to aggregate historical data efficiently (e.g., monthly snapshots of net worth, balances).
- [ ] Display historical data in interactive charts (e.g., Net worth timeline, asset value over time) with **real-time updates** (as data changes, charts reflect).
- [ ] **Export Functionality:**
- [ ] Implement exporting of transaction data (and possibly other data) to common formats:
- [ ] CSV data export (client-side implementation).
- [ ] Excel files.
- [ ] PDF report generation (consider serverless function for complex reports).
- [ ] **Build Dedicated Reports Page:**
- [ ] Monthly/yearly financial summary.
- [ ] Income vs expense comparison (e.g., side-by-side bars).
- [ ] Asset allocation breakdown (e.g., pie chart of asset types).
- [ ] Debt repayment progress (e.g., line chart of outstanding balance).
- [ ] Add advanced filtering options (date range, categories, custom grouping).
- [ ] Visualization customization (chart type selection, color schemes).

---

### Phase 9: Smart Reminders (Revisited)

**Goal:** Allow users to set custom reminders for financial obligations (EMIs, bills, etc.) and receive notifications.

- [ ] Design UI for setting custom reminders (EMIs, bills)
- **Detail:** Create a modal/drawer form with fields for reminder name, amount, due date (date picker), frequency (one-time, recurring with options), and notification preferences.
- [ ] Store reminder data in DB
- **Detail:** Utilize the `reminders` table with fields like `id`, `user_id`, `name`, `amount`, `due_date`, `frequency`, `last_notified_at`, `next_notification_date`, `is_completed`, and potentially `associated_entity_id` (linking to debts/bills). Implement RLS policies.
- [ ] Use Supabase Edge Functions or CRON jobs to trigger email/push
- **Detail:** Set up a daily/hourly Edge Function to query `reminders`. Implement notification logic via SendGrid (emails). Update reminder state after sending.
- [ ] Display upcoming reminders on dashboard
- **Detail:** Create a dedicated card or section on the dashboard to show a list of the next 3-5 upcoming reminders. Allow users to mark reminders as "completed."

---

### Phase 10: Currency Management

**Goal:** Provide multi-currency support and conversion tools.

- [ ] Integrate free currency conversion API (via Edge Function proxy).
- [ ] Add currency converter widget.
- [ ] Implement real-time exchange rates and historical rate viewing.
- [ ] Create currency settings (default display currency).
- [ ] Add multi-currency support for data entry.
- [ ] Implement currency conversion for all displayed values.
- [ ] Add currency conversion features (inline conversion, bulk for reports, formatting).

---

### Phase 11: AI Assistant (Future)

**Goal:** Integrate AI to provide smart financial insights and assistance.

- [ ] Connect OpenAI API (via secure Edge Function).
- [ ] Train prompt for smart financial summaries, budgeting tips, spending spike detection.
- [ ] UI assistant (chat-based or smart cards for proactive insights).

---

### Phase 12: Password Vault (Optional)

**Goal:** A secure place for users to store sensitive login credentials.

- [ ] Create `vault_items` table with encrypted fields.
- [ ] Implement **client-side encryption** using user-derived key (master password/PIN).
- [ ] Create secure UI to view/add/delete vault items (masked passwords, show/hide toggle).
- [ ] Implement master password/PIN for extra safety (never sent to server).

---

### Bonus: Polish & Launch

- [ ] Responsive design testing across various devices and screen sizes.
- [ ] Create Notion-style documentation for app usage and features.
- [ ] Setup self-hosted or Vercel deployment.
- [ ] Add minimal onboarding guide for first-time users.
- [ ] **Natural Language Logging (Future):** Allow users to input transactions/data using natural language (e.g., "Spent $50 on groceries yesterday at XYZ store"). This would likely involve an AI model to parse the input.

---

This revised roadmap better reflects your current priorities and provides more detailed steps for each. It's fantastic that you're focusing on core user experience (settings, data display, responsiveness) and planning for future optimizations. Good luck!

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/finari.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:

   - Create a `.env` file
   - Add your Supabase credentials

4. Run the development server:
   ```bash
   npm run dev
   ```

## Configuration

The middleware configuration is located in `src/middleware.ts`. You can modify the `matcher` array to include or exclude specific paths from middleware processing.

## Commit Standards

| **Type**        | **Purpose**                                                           |
| --------------- | --------------------------------------------------------------------- |
| `feature`       | A new feature                                                         |
| `fix`           | A bug fix                                                             |
| `docs`          | Documentation only changes                                            |
| `style`         | Changes that do not affect the meaning of the code (formatting, etc.) |
| `refactor`      | Code change that neither fixes a bug nor adds a feature               |
| `perf`          | Performance improvements                                              |
| `test`          | Adding or updating tests                                              |
| `chore`         | Build process or auxiliary tool changes                               |
| `ci`            | CI/CD-related changes                                                 |
| `revert`        | Revert a previous commit                                              |
| `UI`            | A new page, form, input or anything related changes or added          |
| `security`      | Security-related improvements or fixes                                |
| `i18n`          | Internationalization and localization changes                         |
| `accessibility` | Accessibility improvements                                            |
| `hotfix`        | Critical production bug fix                                           |

Examples:

- `feature(auth): implement user login with Supabase`
- `fix(cart): handle empty cart state in UI`
- `docs(readme): add setup instructions`
- `style(header): adjust spacing and font weights`
- `refactor(auth): simplify session token logic`
- `test(api): add unit test for login route`
- `chore(deps): update all packages to latest`
- `ci: add GitHub Actions workflow for linting`
- `UI(dashboard): add new analytics cards`
- `security(auth): implement rate limiting`
- `i18n(settings): add French translation`
- `accessibility(forms): add ARIA labels`
- `hotfix(payments): fix currency conversion bug`

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes following the commit standards
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

//API RESPONSE
https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/inr.json
## Documentation

The documentation in the `docs` folder is organized into the following categories:

- **Components**: Documentation for components
- **Configuration**: Documentation for configuration
- **Commit Standards**: Documentation for commit standards
- **Contributing**: Documentation for contributing
- **License**: Documentation for license
