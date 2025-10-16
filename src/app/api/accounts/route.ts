import { createNewAccount } from "@/actions/create-account";            
import { NextResponse } from "next/server";
import { Account } from "@/types/dashboard";

export async function POST(request: Request) {
    const body = await request.json();
    const account = body.account as Account;

    try {
        const newAccount = await createNewAccount(account);
        console.log('New account:', newAccount);
        return NextResponse.json(newAccount, { status: 201 });
    } catch (error) {
        console.error('Error creating new account:', error);
        return NextResponse.json({ error: 'Failed to create new account' }, { status: 500 });
    }
}