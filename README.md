# Finari - AI-Assisted Personal Finance App

## Table of Contents

1. [Introduction](#introduction)
2. [Why Finari?](#why-finari)
3. [Key Features](#key-features)
4. [Tech Stack](#tech-stack)
5. [Project Roadmap](#project-roadmap)
6. [Installation](#installation)
7. [Configuration](#configuration)
8. [Contributing](#contributing)
9. [License](#license)

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

### Phase 3: Frontend Setup

- [x] Initialize Next.js + Tailwind project
- [x] Setup colors schema and prepare shadcn components
- [x] Ready Global CSS for schema
- [x] Create layout and theme (dark/light mode optional)
- [ ] Setup Redux for global state
- [ ] Build auth pages: login, register, reset password
- [ ] Build dashboard page (show cards, charts, reminders)
- [ ] Add forms to manually input data (transactions, assets, etc.)

### Phase 4: Data Visualization

- [ ] Integrate charts using Recharts or Nivo
- [ ] Create donut chart for asset types
- [ ] Bar graph for monthly income vs expense
- [ ] Line chart for debt repayment over time
- [ ] Add filters (monthly, yearly, category-wise)

### Phase 5: Smart Reminders

- [ ] Design UI for setting custom reminders (EMIs, bills)
- [ ] Store reminder data in DB
- [ ] Use Supabase Edge Functions or CRON jobs to trigger email/push
- [ ] Display upcoming reminders on dashboard

### Phase 6: Password Vault (Optional)

- [ ] Create vault_items table with encrypted fields
- [ ] Add client-side encryption before storing data
- [ ] Create secure UI to view/add/delete vault items
- [ ] Implement master password or pin for extra safety

### Phase 7: AI Assistant (Future)

- [ ] Connect OpenAI API
- [ ] Train prompt to give smart financial summaries
- [ ] Suggest budgeting tips or detect spending spikes
- [ ] UI assistant (chat-based or smart cards)

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

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
