import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCurrentUserServer } from "@/components/Dashborad/AppSidebar";


export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, loggedIn: false },
      { status: 401 }
    );
  }

  const userInfo = await getCurrentUserServer();

  return NextResponse.json({
    success: true,
    loggedIn: true,
    user: userInfo.data,
  });
}
