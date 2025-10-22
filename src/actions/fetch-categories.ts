import { Category } from '@/types/dashboard';
import { getAuthHeaders } from '@/lib/api';

interface FetchCategoriesResponse {
    categories: Category[];
}

export async function fetchCategories(): Promise<FetchCategoriesResponse> {
    // Get the base URL for server-side requests
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const headers = await getAuthHeaders();
    
    const response = await fetch(`${baseUrl}/categories`, {
        headers
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: FetchCategoriesResponse = await response.json();
    console.log('Categories fetched successfully:', data);
    return data;
}   