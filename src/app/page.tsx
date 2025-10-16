import Header from '../components/Header';
import SummaryCard from '../components/SummaryCard';
import RecentTransactions from '../components/RecentTransactions';
import MyAccounts from '../components/MyAccounts';
import ExpensesByCategory from '../components/ExpensesByCategory';
import { fetchDashboardInfo } from '@/actions/fetch-dashboard-info';
import HomeClient from './home-client';
import PageClient from './page-client';
import { fetchCategories } from '@/actions/fetch-categories';

export default async function Home() {

  const { accounts, transactionsByAccount, transactionsByCategory, totalBalance, totalIncome, totalExpense } = await fetchDashboardInfo("b23a7adf-e397-4dfe-9d58-51921c65a68a");
  const categories = await fetchCategories();

  console.log('Dashboard info:', { accounts, transactionsByAccount, transactionsByCategory, totalBalance, totalIncome, totalExpense });
  return (
    <div className="min-h-screen bg-[#20233B] pb-20">
      <Header />
      
      <main className="px-4 py-6 pb-20">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          {/* Saldo Total Card */}
          <SummaryCard
            title="Saldo total"
            value={totalBalance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            percentage="+12.5% vs mês anterior"
            percentageColor="green"
            bgColor="bg-[#4A69E0]"
            icon={
              <div className="w-10 h-10 bg-[#5C78E0] rounded-lg flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" strokeWidth="2"/>
                  <path d="M12 7V12L15 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            }
          />
          
          {/* Entradas Card */}
          <SummaryCard
            title="Entradas"
            value={totalIncome.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                percentage="+12.5% vs mês anterior"
            percentageColor="green"
            bgColor="bg-[#303452]"
            icon={
              <div className="w-10 h-10 bg-[#33B18350] rounded-lg flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.5 5.25V11.25C22.5 11.4489 22.421 11.6397 22.2803 11.7803C22.1397 11.921 21.9489 12 21.75 12C21.5511 12 21.3603 11.921 21.2197 11.7803C21.079 11.6397 21 11.4489 21 11.25V7.06031L13.2806 14.7806C13.211 14.8504 13.1282 14.9057 13.0372 14.9434C12.9461 14.9812 12.8486 15.0006 12.75 15.0006C12.6514 15.0006 12.5538 14.9812 12.4628 14.9434C12.3717 14.9057 12.289 14.8504 12.2194 14.7806L8.99999 11.5603L2.78061 17.7806C2.63988 17.9214 2.44901 18.0004 2.24999 18.0004C2.05097 18.0004 1.8601 17.9214 1.71936 17.7806C1.57863 17.6399 1.49957 17.449 1.49957 17.25C1.49957 17.051 1.57863 16.8601 1.71936 16.7194L8.46936 9.96937C8.53902 9.89964 8.62174 9.84432 8.71278 9.80658C8.80383 9.76884 8.90143 9.74941 8.99999 9.74941C9.09855 9.74941 9.19615 9.76884 9.28719 9.80658C9.37824 9.84432 9.46096 9.89964 9.53062 9.96937L12.75 13.1897L19.9397 6H15.75C15.5511 6 15.3603 5.92098 15.2197 5.78033C15.079 5.63968 15 5.44891 15 5.25C15 5.05109 15.079 4.86032 15.2197 4.71967C15.3603 4.57902 15.5511 4.5 15.75 4.5H21.75C21.9489 4.5 22.1397 4.57902 22.2803 4.71967C22.421 4.86032 22.5 5.05109 22.5 5.25Z" fill="#33B183"/>
</svg>

              </div>
            }
          />
          
          {/* Saídas Card */}
          <SummaryCard
            title="Saídas"
            value={totalExpense.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            percentage="+12.5% vs mês anterior"
            percentageColor="red"
            bgColor="bg-[#303452]"
            icon={
              <div className="w-10 h-10 bg-[#BD434350] rounded-lg flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.5 12V18C22.5 18.1989 22.421 18.3897 22.2803 18.5303C22.1397 18.671 21.9489 18.75 21.75 18.75H15.75C15.5511 18.75 15.3603 18.671 15.2197 18.5303C15.079 18.3897 15 18.1989 15 18C15 17.8011 15.079 17.6103 15.2197 17.4697C15.3603 17.329 15.5511 17.25 15.75 17.25H19.9397L12.75 10.0603L9.53062 13.2806C9.46096 13.3503 9.37824 13.4057 9.28719 13.4434C9.19615 13.4812 9.09855 13.5006 8.99999 13.5006C8.90143 13.5006 8.80383 13.4812 8.71278 13.4434C8.62174 13.4057 8.53902 13.3503 8.46936 13.2806L1.71936 6.53062C1.57863 6.38988 1.49957 6.19901 1.49957 5.99999C1.49957 5.80097 1.57863 5.6101 1.71936 5.46936C1.8601 5.32863 2.05097 5.24957 2.24999 5.24957C2.44901 5.24957 2.63988 5.32863 2.78061 5.46936L8.99999 11.6897L12.2194 8.46936C12.289 8.39963 12.3717 8.34431 12.4628 8.30657C12.5538 8.26883 12.6514 8.2494 12.75 8.2494C12.8486 8.2494 12.9461 8.26883 13.0372 8.30657C13.1282 8.34431 13.211 8.39963 13.2806 8.46936L21 16.1897V12C21 11.8011 21.079 11.6103 21.2197 11.4697C21.3603 11.329 21.5511 11.25 21.75 11.25C21.9489 11.25 22.1397 11.329 22.2803 11.4697C22.421 11.6103 22.5 11.8011 22.5 12Z" fill="#BD4343"/>
</svg>

              </div>
            }
          />
        </div>
        
        {/* Minhas Contas */}
        <MyAccounts accounts={accounts} />
      
        
        {/* Recent Transactions */}
        <RecentTransactions transactionsByAccount={transactionsByAccount} />

          
        {/* Gastos por Categoria */}
        <ExpensesByCategory transactionsByCategory={transactionsByCategory} />

        
      </main>
       
      {/* Modal */}
      <PageClient 
      categories={categories.categories} 
        accounts={accounts}
      />

      
    </div>
  );
}
