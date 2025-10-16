import { TransactionByAccount } from '@/types/dashboard';
import TransactionItem from './TransactionItem';

const transactions = [
  {
    name: 'Supermercado',
    category: 'Alimentação',
    date: '04/09',
    amount: '- R$ 650,00',
    amountColor: 'red' as const,
    icon: (
      <div className="w-8 h-8 bg-[#EF4444] rounded-lg flex items-center justify-center">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 14L12 9L17 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    )
  },
  {
    name: 'Salario',
    category: 'Salario',
    date: '04/09',
    amount: '+ R$ 1.250,00',
    amountColor: 'green' as const,
    icon: (
      <div className="w-8 h-8 bg-[#34D399] rounded-lg flex items-center justify-center">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 10L12 15L17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    )
  },
  {
    name: 'Netflix',
    category: 'Entretenimento',
    date: '04/09',
    amount: '- R$ 50,00',
    amountColor: 'red' as const,
    icon: (
      <div className="w-8 h-8 bg-[#EF4444] rounded-lg flex items-center justify-center">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 14L12 9L17 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    )
  },
  {
    name: 'Supermercado',
    category: 'Alimentação',
    date: '04/09',
    amount: '- R$ 650,00',
    amountColor: 'red' as const,
    icon: (
      <div className="w-8 h-8 bg-[#EF4444] rounded-lg flex items-center justify-center">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 14L12 9L17 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    )
  },
  {
    name: 'Salario',
    category: 'Salario',
    date: '04/09',
    amount: '+ R$ 1.250,00',
    amountColor: 'green' as const,
    icon: (
      <div className="w-8 h-8 bg-[#34D399] rounded-lg flex items-center justify-center">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 10L12 15L17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    )
  }
];

export default function RecentTransactions({ transactionsByAccount }: { transactionsByAccount: TransactionByAccount[] }) {
  const transactions = transactionsByAccount.slice(0, 5);
  const transacctionFormatted = transactions.map((transaction) => ({
    name: transaction.accountName,
    category: transaction.categoryId,
    description: transaction.description,
    date: transaction.date,
    amount: transaction.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
    amountColor: transaction.type === 'income' ? 'green' : 'red',
    icon: transaction.type === 'expense' ? (
      <div className="w-12 h-12 bg-[#BD434350] rounded-lg flex items-center justify-center">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.5 12V18C22.5 18.1989 22.421 18.3897 22.2803 18.5303C22.1397 18.671 21.9489 18.75 21.75 18.75H15.75C15.5511 18.75 15.3603 18.671 15.2197 18.5303C15.079 18.3897 15 18.1989 15 18C15 17.8011 15.079 17.6103 15.2197 17.4697C15.3603 17.329 15.5511 17.25 15.75 17.25H19.9397L12.75 10.0603L9.53062 13.2806C9.46096 13.3503 9.37824 13.4057 9.28719 13.4434C9.19615 13.4812 9.09855 13.5006 8.99999 13.5006C8.90143 13.5006 8.80383 13.4812 8.71278 13.4434C8.62174 13.4057 8.53902 13.3503 8.46936 13.2806L1.71936 6.53062C1.57863 6.38988 1.49957 6.19901 1.49957 5.99999C1.49957 5.80097 1.57863 5.6101 1.71936 5.46936C1.8601 5.32863 2.05097 5.24957 2.24999 5.24957C2.44901 5.24957 2.63988 5.32863 2.78061 5.46936L8.99999 11.6897L12.2194 8.46936C12.289 8.39963 12.3717 8.34431 12.4628 8.30657C12.5538 8.26883 12.6514 8.2494 12.75 8.2494C12.8486 8.2494 12.9461 8.26883 13.0372 8.30657C13.1282 8.34431 13.211 8.39963 13.2806 8.46936L21 16.1897V12C21 11.8011 21.079 11.6103 21.2197 11.4697C21.3603 11.329 21.5511 11.25 21.75 11.25C21.9489 11.25 22.1397 11.329 22.2803 11.4697C22.421 11.6103 22.5 11.8011 22.5 12Z" fill="#BD4343"/>
</svg>
      </div>
    ) : (
      <div className="w-12 h-12 bg-[#33B18350] rounded-lg flex items-center justify-center">
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.5 5.25V11.25C22.5 11.4489 22.421 11.6397 22.2803 11.7803C22.1397 11.921 21.9489 12 21.75 12C21.5511 12 21.3603 11.921 21.2197 11.7803C21.079 11.6397 21 11.4489 21 11.25V7.06031L13.2806 14.7806C13.211 14.8504 13.1282 14.9057 13.0372 14.9434C12.9461 14.9812 12.8486 15.0006 12.75 15.0006C12.6514 15.0006 12.5538 14.9812 12.4628 14.9434C12.3717 14.9057 12.289 14.8504 12.2194 14.7806L8.99999 11.5603L2.78061 17.7806C2.63988 17.9214 2.44901 18.0004 2.24999 18.0004C2.05097 18.0004 1.8601 17.9214 1.71936 17.7806C1.57863 17.6399 1.49957 17.449 1.49957 17.25C1.49957 17.051 1.57863 16.8601 1.71936 16.7194L8.46936 9.96937C8.53902 9.89964 8.62174 9.84432 8.71278 9.80658C8.80383 9.76884 8.90143 9.74941 8.99999 9.74941C9.09855 9.74941 9.19615 9.76884 9.28719 9.80658C9.37824 9.84432 9.46096 9.89964 9.53062 9.96937L12.75 13.1897L19.9397 6H15.75C15.5511 6 15.3603 5.92098 15.2197 5.78033C15.079 5.63968 15 5.44891 15 5.25C15 5.05109 15.079 4.86032 15.2197 4.71967C15.3603 4.57902 15.5511 4.5 15.75 4.5H21.75C21.9489 4.5 22.1397 4.57902 22.2803 4.71967C22.421 4.86032 22.5 5.05109 22.5 5.25Z" fill="#33B183"/>
</svg>

      </div>
    )
  }));
  
  return (
    <div className="px-4 bg-[#31375A] rounded-lg p-4">
      <h2 className="text-white text-lg font-semibold mb-4">Transações Recentes</h2>
      <div className="space-y-1">
        {transacctionFormatted.map((transaction, index) => (
          <TransactionItem
            key={index}
            name={transaction.description}
            category={transaction.category}
            description={transaction.description}
            date={transaction.date}
            amount={transaction.amount}
            amountColor={transaction.amountColor as 'green' | 'red'}
            icon={transaction.icon}
          />
        ))}
      </div>
    </div>
  );
}
