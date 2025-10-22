import { NextRequest, NextResponse } from "next/server";
import { getAuthHeaders } from "@/lib/api";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const headers = await getAuthHeaders();
    
    // Repassa os query params para o backend
    const backendUrl = new URL(`${process.env.NEXT_PUBLIC_API_URL}/transactions`);
    searchParams.forEach((value, key) => {
      backendUrl.searchParams.append(key, value);
    });
    
    const response = await fetch(backendUrl.toString(), {
      headers,
      method: 'GET'
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch transactions' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
