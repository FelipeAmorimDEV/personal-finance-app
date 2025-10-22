import { createNewAccount } from "@/actions/create-account";            
import { NextResponse } from "next/server";
import { Account } from "@/types/dashboard";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const account = body.account as Account;

        console.log('Account to create:', account);

        // Pega o token do cookie
        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;
        
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Extrai apenas os campos necessários
        const { name, balance, color, icon } = account;

        // Faz a requisição diretamente do API route
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transaction-account`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ name, balance, color, icon })
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Backend error:', response.status, errorData);
            return NextResponse.json(
                { error: `Backend error: ${errorData}` }, 
                { status: response.status }
            );
        }

        const newAccount = await response.json();
        console.log('New account created:', newAccount);
        return NextResponse.json(newAccount, { status: 201 });
    } catch (error) {
        console.error('Error creating new account:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to create new account' }, 
            { status: 500 }
        );
    }
}