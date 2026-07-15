import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { phone, pin } = await request.json();

    const expectedPhone = process.env.ADMIN_PHONE || "3332221110";
    const expectedPin = process.env.ADMIN_PIN || "2103";

    if (phone === expectedPhone && pin === expectedPin) {
      const response = NextResponse.json({ success: true, message: "Authentication successful" });
      
      response.cookies.set({
        name: "dss_vault_session",
        value: "dss-authenticated-vault-session-2026",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24, // 24 hours
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: "Invalid Phone Number or PIN. Access denied." },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Authentication server error." },
      { status: 500 }
    );
  }
}
