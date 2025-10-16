
import { NextResponse } from "next/server";
import { fetchCategories } from "@/actions/fetch-categories";
import { Category } from "@/types/dashboard";
import { createNewCategory } from "@/actions/create-category.";

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
    const body = await request.json();
    const category = body.category as Category;

    try {
        const newCategory = await createNewCategory(category);
        console.log('New category:', newCategory);
        return NextResponse.json(newCategory, { status: 201 });
    } catch (error) {
        console.error('Error creating new category:', error);
        return NextResponse.json({ error: 'Failed to create new category' }, { status: 500 });
    }
}