import { Category } from '@/types/dashboard';

interface FetchCategoriesResponse {
    categories: Category[];
}

export async function fetchCategories(): Promise<FetchCategoriesResponse> {
    // Get the base URL for server-side requests
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                   process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                   'http://localhost:3000';
    
    const response = await fetch(`${baseUrl}/api/categories`);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: FetchCategoriesResponse = await response.json();
    console.log('Categories fetched successfully:', data);
    return data;
}   