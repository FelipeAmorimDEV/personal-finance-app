import { Transaction } from '@/types/dashboard';
import { getAuthHeaders } from '@/lib/api';

interface FetchTransactionsResponse {
  transactions: Transaction[];
  total: number;
}

interface FetchTransactionsParams {
  month?: string;
  year?: string;
  type?: 'income' | 'expense' | 'all';
  categoryId?: string;
  accountId?: string;
}

export async function fetchTransactions(params: FetchTransactionsParams = {}): Promise<FetchTransactionsResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const headers = await getAuthHeaders();
  
  // Constrói query params
  const queryParams = new URLSearchParams();
  if (params.month) queryParams.append('month', params.month);
  if (params.year) queryParams.append('year', params.year);
  if (params.type && params.type !== 'all') queryParams.append('type', params.type);
  if (params.categoryId) queryParams.append('categoryId', params.categoryId);
  if (params.accountId) queryParams.append('accountId', params.accountId);
  
  const url = `${baseUrl}/transactions${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  
  const response = await fetch(url, {
    headers,
    cache: 'no-store'
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  return data;
}
