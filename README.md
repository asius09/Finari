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

## Project Roadmap

### Phase 1: Planning & Design ✅

- [x] Finalize app name and tagline
- [x] Define core features and priorities
- [x] Design initial user flows (Login → Dashboard → Add Data)
- [x] Create UI wireframes (mobile-first and desktop)
- [x] Pick chart library and visualization types

### Phase 2: Backend & Database ✅

- [x] Set up Supabase project
- [x] Create tables: users, transactions, assets, debts, reminders, cards, vault_items
- [x] Configure Row-Level Security (RLS) and Policies
- [x] Implement Supabase Auth (email/password or magic link)

### Phase 3: Frontend Setup ✅

- [x] Initialize Next.js + Tailwind project
- [x] Setup colors schema and prepare shadcn components
- [x] Ready Global CSS for schema
- [x] Create layout and theme (dark/light mode optional)
- [x] Setup Redux for global state
- [x] Build auth pages: login, register, reset password
- [x] Build dashboard page (show cards, charts, reminders)
- [x] Add forms to manually input data (transactions, assets, etc.)

### Phase 4: Data Visualization ✅

- [x] Integrate charts using tremor.so
- [x] Create donut chart for asset types
- [x] Bar graph for monthly income vs expense
- [x] Line chart for debt repayment over time
- [x] Add filters (monthly, yearly, category-wise)

### Phase 5: Assets & Debts Management

- [ ] Create assets page with CRUD operations
- [ ] Add form for new assets (type, value, description)
- [ ] Display assets in table with sorting/filtering
- [ ] Implement edit/delete functionality
- [ ] Add asset type categorization (cash, investments, property, etc.)
- [ ] Create debts page with CRUD operations
- [ ] Add form for new debts (type, amount, interest rate, due date)
- [ ] Display debts in table with sorting/filtering
- [ ] Implement edit/delete functionality
- [ ] Add debt type categorization (loans, credit cards, mortgages, etc.)
- [ ] Add net worth calculation (assets - debts)
- [ ] Create visualizations for assets/debts breakdown

### Phase 6: Reports & Analytics

- [ ] Build reports page with multiple views
- [ ] Monthly/yearly financial summary
- [ ] Income vs expense comparison
- [ ] Asset allocation breakdown
- [ ] Debt repayment progress
- [ ] Add advanced filtering options
- [ ] Date range selector
- [ ] Category filters
- [ ] Custom grouping options
- [ ] Implement export functionality
- [ ] PDF report generation
- [ ] CSV data export
- [ ] Add visualization customization
- [ ] Chart type selection
- [ ] Color scheme options
- [ ] Data point display settings

### Phase 7: Settings & Configuration

- [ ] Create settings page with sections
- [ ] Profile management
- [ ] Account preferences
- [ ] Notification settings
- [ ] Security settings
- [ ] Implement profile editing
- [ ] Update personal info
- [ ] Change password
- [ ] Manage connected accounts
- [ ] Add preference controls
- [ ] Theme selection (light/dark/system)
- [ ] Default currency setting
- [ ] Date format options
- [ ] Implement notification management
- [ ] Email notification preferences
- [ ] Push notification settings
- [ ] Reminder frequency options

### Phase 8: Currency Management

- [ ] Integrate free currency conversion API
- [ ] Add currency converter widget
- [ ] Implement real-time exchange rates
- [ ] Add historical rate viewing
- [ ] Create currency settings
- [ ] Set default display currency
- [ ] Add multi-currency support
- [ ] Implement currency conversion for all values
- [ ] Add currency conversion features
- [ ] Inline value conversion
- [ ] Bulk conversion for reports
- [ ] Currency-specific formatting

### Phase 9: Data Visualization Enhancements

- [ ] Improve existing charts
- [ ] Add tooltips and data labels
- [ ] Implement zoom/pan functionality
- [ ] Add comparison features
- [ ] Create new visualizations
- [ ] Cash flow waterfall chart
- [ ] Net worth timeline
- [ ] Debt repayment schedule
- [ ] Budget vs actual comparison
- [ ] Add interactive features
- [ ] Click-to-filter functionality
- [ ] Drill-down capabilities
- [ ] Custom date range selection

### Bonus: Polish & Launch

- [ ] Responsive design testing
- [ ] Create Notion-style documentation
- [ ] Setup self-hosted or Vercel deployment
- [ ] Create backup/export data feature
- [ ] Add minimal onboarding guide

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

- `feat(auth): implement user login with Supabase`
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
