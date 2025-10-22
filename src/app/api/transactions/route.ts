import { createNewTransaction } from "@/actions/create-new-transaction";
import { Transaction } from "@/types/dashboard";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const transaction = body.transaction as Transaction;

    console.log('Transaction to create:', transaction);

    // Pega o token do cookie
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;
    
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Faz a requisição diretamente do API route
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(transaction)
    });

    if (!response.ok) {
        const errorData = await response.text();
        console.error('Backend error:', response.status, errorData);
        return NextResponse.json(
            { error: `Backend error: ${errorData}` }, 
            { status: response.status }
        );
    }

    const newTransaction = await response.json();
    console.log('New transaction created:', newTransaction);
    return NextResponse.json(newTransaction, { status: 201 });   
  } catch (error) {
    console.error('Error creating new transaction:', error);
    return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Failed to create new transaction' }, 
        { status: 500 }
    );
  }
}