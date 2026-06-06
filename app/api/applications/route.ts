import { NextResponse } from "next/server";
import { sendTelegramMessage, formatApplicationMessage } from "@/lib/telegram";
import { appendApplicationToSheet } from "@/lib/google-sheets";
import type { Application } from "@/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, phone, type } = body;
    if (!name || !phone || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const application: Partial<Application> = {
      type,
      name,
      phone,
      car_id: body.car_id,
      car_name: body.car_name,
      down_payment: body.down_payment,
      loan_term: body.loan_term,
      message: body.message,
      status: "new",
    };

    // Try to save to Supabase
    let savedApp: Application | null = null;
    try {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = createClient();
      const { data, error } = await supabase
        .from("applications")
        .insert(application)
        .select()
        .single();
      if (!error) savedApp = data;
    } catch {
      // Continue without DB
    }

    // Send Telegram notification
    const appForTelegram = {
      ...application,
      id: savedApp?.id ?? "temp",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as Application;

    // Telegram (optional — only if token is set)
    await sendTelegramMessage(formatApplicationMessage(appForTelegram));

    // Google Sheets (optional — only if credentials are set)
    await appendApplicationToSheet(appForTelegram).catch(() => {});

    return NextResponse.json({ success: true, id: savedApp?.id });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = createClient();
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json(data);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
