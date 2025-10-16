
import { NextResponse } from "next/server";
import { DashboardInfo } from '@/types/dashboard';
import { fetchDashboardInfo } from "@/actions/fetch-dashboard-info";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    console.log('User ID:', userId);

    if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const dashboardInfo = await fetchDashboardInfo(userId);
    console.log('Dashboard info fetched successfully:', dashboardInfo);
    return NextResponse.json(dashboardInfo);
}
