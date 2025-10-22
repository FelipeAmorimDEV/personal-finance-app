import { createNewAccount } from "@/actions/create-account";            
import { NextResponse } from "next/server";
import { Account } from "@/types/dashboard";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log('=== ACCOUNT CREATION DEBUG ===');
        console.log('1. Received body type:', typeof body);
        console.log('2. Received body:', body);

        // Pega o token do cookie
        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;
        
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Usa o body direto como payload (já vem com name, balance, color, icon)
        const payload = { 
            name: body.name, 
            balance: body.balance, 
            color: body.color, 
            icon: body.icon 
        };
        console.log('10. Final payload:', payload);
        console.log('11. Payload stringified:', JSON.stringify(payload));

        const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/transaction-account`;
        console.log('12. Backend URL:', backendUrl);
        console.log('13. Sending to backend with headers:', {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.substring(0, 20)}...`,
        });

        // Faz a requisição diretamente do API route
        const response = await fetch(backendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
            cache: 'no-store'
        });

        console.log('14. Backend response status:', response.status);
        console.log('15. Backend response headers:', Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
            const errorData = await response.text();
            console.error('16. Backend error body:', errorData);
            
            // Tenta parsear o erro como JSON
            try {
                const errorJson = JSON.parse(errorData);
                console.error('17. Parsed error:', errorJson);
            } catch (e) {
                console.error('17. Could not parse error as JSON');
            }
            
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