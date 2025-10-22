import { Transaction } from '@/types/dashboard';
import { getAuthHeaders } from '@/lib/api';
export async function createNewTransaction(transaction: Transaction): Promise<Transaction> {
    try {
        console.log('Creating new transaction:', transaction);

        const { accountId, categoryId, description, date, type, amount } = transaction;
        const headers = await getAuthHeaders();
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ accountId, categoryId, description, date, amount, type })
        });

        if (!response.ok) {
            throw new Error('Failed to create new transaction');
        }

        const data: Transaction = await response.json();
        console.log('Transaction created successfully:', data);
        return data;
    } catch (error) {
        console.error('Error creating new transaction:', error);
        throw new Error('Failed to create new transaction');
    }
}