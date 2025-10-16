import { createNewTransaction } from "@/actions/create-new-transaction";
import { Transaction } from "@/types/dashboard";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
   const body = await request.json();
   const transaction = body.transaction as Transaction;

   console.log('Transaction1:', transaction);

  try {
    const newTransaction = await createNewTransaction(transaction);
    console.log('New transaction:', newTransaction);
    return NextResponse.json(newTransaction, { status: 201 });   
  } catch (error) {
    console.error('Error creating new transaction:', error);
    return NextResponse.json({ error: 'Failed to create new transaction' }, { status: 500 });
  }
}