# Personal Finance App

This is a [Next.js](https://nextjs.org) project for personal finance management with a modern mobile-first design.

## Features

- 📊 Dashboard with financial overview
- 💳 Account management
- 🏷️ Category management
- 💰 Transaction tracking with filters
- 📅 Monthly transaction view
- 🔍 Advanced filtering (type, category, account)
- 📱 Mobile-responsive design
- 🎨 Modern UI with animations
- 🔐 JWT-based authentication

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### API Endpoints

The app expects a backend API running on `NEXT_PUBLIC_API_URL` with the following endpoints:

#### Authentication
- `POST /accounts` - Register new user (returns success message)
- `POST /sessions` - Login (returns `access_token`)

#### Dashboard & Data (requires authentication)
- `GET /dashboard` - Dashboard data
- `GET /categories` - Categories list
- `POST /categories` - Create category
- `POST /transaction-account` - Create account
- `POST /transactions` - Create transaction
- `GET /transactions?month={month}&year={year}&type={type}&categoryId={categoryId}&accountId={accountId}` - List transactions with filters

### Authentication

The app uses JWT token-based authentication:

1. Login with email and password at `/login`
2. Token is stored in `localStorage` and cookies
3. All API requests include the token in the `Authorization` header
4. If token is invalid or expired, user is redirected to login
5. Protected routes are handled by Next.js middleware

To use the app:
1. Create an account at `http://localhost:3000/register` or
2. Login at `http://localhost:3000/login` with existing credentials
3. Access is granted to the dashboard

### Pages

#### Register (`/register`) - Public
- Create new user account
- Form validation with real-time feedback
- Password strength validation
- Redirect to login after successful registration

#### Login (`/login`) - Public
- User authentication
- Email and password fields
- Automatic redirect to dashboard after login
- Link to registration page

#### Dashboard (`/`) - Protected
- Overview of financial summary (total balance, income, expenses)
- Account cards with balances
- Recent transactions
- Expenses by category
- Quick access to add transactions, categories, and accounts

#### Transactions (`/transactions`) - Protected
- Complete list of all transactions
- Filter by:
  - Month and Year
  - Type (income/expense/all)
  - Category
  - Account
- Real-time totals for income and expenses
- Visual indicators for transaction types
- Mobile-optimized interface

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
