import { getAuthHeaders } from '@/lib/api';
import { Account, Category } from '@/types/dashboard';

export async function createNewAccount(account: Account): Promise<Account> {
    try {
        console.log('Creating new account:', account);

        const { name, balance, color, icon } = account;
        const headers = await getAuthHeaders();
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transaction-account`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ name, color, icon, balance })
        });


        if (!response.ok) {
                throw new Error('Failed to create new account');
        }

        const data: Account = await response.json();
        console.log('Account created successfully:', data);
        return data;
    } catch (error) {
        console.error('Error creating new account:', error);
        throw new Error('Failed to create new account');
    }
}