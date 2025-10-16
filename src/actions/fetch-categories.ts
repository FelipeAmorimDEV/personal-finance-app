import { Category } from '@/types/dashboard';


interface FetchCategoriesResponse {
    categories: Category[];
}
export async function fetchCategories(): Promise<FetchCategoriesResponse> {
    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
        const data: FetchCategoriesResponse = await response.json();
        console.log('Categories fetched successfully:', data);
        return data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}   