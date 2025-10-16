import { DashboardInfo } from '@/types/dashboard';

export async function fetchDashboardInfo(userId: string): Promise<DashboardInfo> {
    // Check if we're in build mode or if the API is not available
    const isBuildTime = process.env.NODE_ENV === 'production' && !process.env.VERCEL_URL;
    
    if (isBuildTime) {
        // Return mock data during build time
        console.log('Using mock data during build time');
        return {
            accounts: [],
            transactionsByAccount: [],
            transactionsByCategory: [],
            totalBalance: 0,
            totalIncome: 0,
            totalExpense: 0
        };
    }

    // Get the base URL for server-side requests
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                   process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                   'http://localhost:3000';
    
    try {
        const response = await fetch(`${baseUrl}/api/dashboard-info?userId=${userId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: DashboardInfo = await response.json();
        console.log('Dashboard info fetched successfully:', data);
        return data;
    } catch (error) {
        console.error('Error fetching dashboard info:', error);
        
        // Return mock data as fallback
        console.log('Using mock data as fallback');
        return {
            accounts: [],
            transactionsByAccount: [],
            transactionsByCategory: [],
            totalBalance: 0,
            totalIncome: 0,
            totalExpense: 0
        };
    }
}