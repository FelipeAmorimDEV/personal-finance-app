import { DashboardInfo } from '@/types/dashboard';

export async function fetchDashboardInfo(userId: string): Promise<DashboardInfo> {
    // Get the base URL for server-side requests
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                   process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                   'http://localhost:3000';
    
    const response = await fetch(`${baseUrl}/api/dashboard-info?userId=${userId}`);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: DashboardInfo = await response.json();
    console.log('Dashboard info fetched successfully:', data);
    return data;
}