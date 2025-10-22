import ReportsClient from './reports-client';
import { fetchDashboardInfo } from '@/actions/fetch-dashboard-info';
import { fetchTransactions } from '@/actions/fetch-transactions';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ReportsPage() {
  const currentDate = new Date();
  const currentMonth = (currentDate.getMonth() + 1).toString();
  const currentYear = currentDate.getFullYear().toString();
  
  const [dashboardData, transactionsData] = await Promise.all([
    fetchDashboardInfo(),
    fetchTransactions({ month: currentMonth, year: currentYear })
  ]);

  return (
    <ReportsClient
      accounts={dashboardData.accounts}
      transactionsByCategory={dashboardData.transactionsByCategory}
      transactions={transactionsData.transactions}
      totalBalance={dashboardData.totalBalance}
      totalIncome={dashboardData.totalIncome}
      totalExpense={dashboardData.totalExpense}
    />
  );
}
