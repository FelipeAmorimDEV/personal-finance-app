export interface Account {
  id: string;
  name: string;
  balance: number;
  color: string;
  icon: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  amount: number;
  type: 'income' | 'expense';
  description: string;
  date: string;
  accountId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionByAccount extends Transaction {
  accountName: string;
}

export interface TransactionByCategory extends Transaction {
  categoryName: string;
}

export interface DashboardInfo {
  accounts: Account[];
  transactionsByAccount: TransactionByAccount[];
  transactionsByCategory: TransactionByCategory[];
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
}
