import { getAuthHeaders } from '@/lib/api';
import { Category } from '@/types/dashboard';

export async function createNewCategory(category: Category): Promise<Category> {
    try {
        console.log('Creating new category:', category);
        const headers = await getAuthHeaders();
        const { name, color, icon, description } = category;
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, color, icon, description })
        });


        if (!response.ok) {
            const errorData = await response.text();
            console.error('Failed to create category. Status:', response.status, 'Error:', errorData);
            throw new Error(`Failed to create new category: ${response.status} - ${errorData}`);
        }

        const data: Category = await response.json();
        console.log('Category created successfully:', data);
        return data;
    } catch (error) {
        console.error('Error creating new category:', error);
        throw error;
    }
}