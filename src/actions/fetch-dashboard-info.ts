import { DashboardInfo } from '@/types/dashboard';

export async function fetchDashboardInfo(userId: string): Promise<DashboardInfo> {
    // Get the base URL for server-side requests
    const baseUrl = process.env.NEXT_PUBLIC_API_URL
    const response = await fetch(`${baseUrl}/dashboard?userId=${userId}`);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: DashboardInfo = await response.json();
    console.log('Dashboard info fetched successfully:', data);
    return data;
}