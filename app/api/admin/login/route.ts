import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { password } = await request.json();
  const correctPassword = process.env.ADMIN_PASSWORD;
  const secretToken = process.env.ADMIN_SECRET_TOKEN;

  if (!correctPassword || password !== correctPassword) {
    return NextResponse.json({ error: "Неверный пароль" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_token", secretToken!, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30, // 30 дней
    path: "/",
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete("admin_token");
  return response;
}
