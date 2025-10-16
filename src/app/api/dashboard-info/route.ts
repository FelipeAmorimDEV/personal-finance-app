
import { NextResponse } from "next/server";
import { DashboardInfo } from '@/types/dashboard';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    console.log('User ID:', userId);

    if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const dashboardInfo = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard?userId=${userId}`);
    const data: DashboardInfo = await dashboardInfo.json();
    console.log('Dashboard info fetched successfully:', data);
    return NextResponse.json(data);
}
