import TransactionsClient from './transactions-client';
import { fetchTransactions } from '@/actions/fetch-transactions';
import { fetchCategories } from '@/actions/fetch-categories';
import { fetchDashboardInfo } from '@/actions/fetch-dashboard-info';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function TransactionsPage() {
  // Busca dados iniciais
  const currentDate = new Date();
  const currentMonth = (currentDate.getMonth() + 1).toString();
  const currentYear = currentDate.getFullYear().toString();
  
  const [transactionsData, categoriesData, dashboardData] = await Promise.all([
    fetchTransactions({ month: currentMonth, year: currentYear }),
    fetchCategories(),
    fetchDashboardInfo()
  ]);

  return (
    <TransactionsClient
      initialTransactions={transactionsData.transactions}
      categories={categoriesData.categories}
      accounts={dashboardData.accounts}
      initialMonth={currentMonth}
      initialYear={currentYear}
    />
  );
}
