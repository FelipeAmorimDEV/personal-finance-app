import { DashboardInfo } from '@/types/dashboard';
import { getAuthHeaders } from '@/lib/api';

export async function fetchDashboardInfo(): Promise<DashboardInfo> {
    // Get the base URL for server-side requests
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const headers = await getAuthHeaders();
    
    const response = await fetch(`${baseUrl}/dashboard`, {
        headers
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: DashboardInfo = await response.json();
    console.log('Dashboard info fetched successfully:', data);
    return data;
}