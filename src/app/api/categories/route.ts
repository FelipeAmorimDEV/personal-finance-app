
import { NextResponse } from "next/server";
import { Category } from "@/types/dashboard";
import { createNewCategory } from "@/actions/create-category.";
import { fetchCategories } from "@/actions/fetch-categories";

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

        const newCategory = await createNewCategory(category);
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