import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const response = NextResponse.json({ success: true, message: "Logged out successfully" });
  
  response.cookies.delete("dss_vault_session");
  
  return response;
}
