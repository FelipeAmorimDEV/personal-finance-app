
import { NextResponse } from "next/server";
import { Category } from "@/types/dashboard";
import { createNewCategory } from "@/actions/create-category.";
import { fetchCategories } from "@/actions/fetch-categories";
import { cookies } from "next/headers";

    export async function GET(request: Request) {
        try {
        const categories = await fetchCategories();
        console.log('Categories fetched successfully:', categories);
        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log('API Route - Received body:', body);
        
        const category = body.category as Category;
        console.log('API Route - Category to create:', category);

        // Pega o token do cookie
        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;
        
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Extrai apenas os campos necessários
        const { name, color, icon, description } = category;

        // Faz a requisição diretamente do API route
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ name, color, icon, description })
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Backend error:', response.status, errorData);
            return NextResponse.json(
                { error: `Backend error: ${errorData}` }, 
                { status: response.status }
            );
        }

        const newCategory = await response.json();
        console.log('API Route - New category created:', newCategory);
        return NextResponse.json(newCategory, { status: 201 });
    } catch (error) {
        console.error('API Route - Error creating new category:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to create new category' }, 
            { status: 500 }
        );
    }
}