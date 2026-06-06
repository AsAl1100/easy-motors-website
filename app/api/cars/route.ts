import { NextResponse } from "next/server";
import { DEMO_CARS } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const brand = searchParams.get("brand");
  const body_type = searchParams.get("body_type");
  const featured = searchParams.get("featured");

  // Try Supabase first, fall back to demo data
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = createClient();

    let query = supabase
      .from("cars")
      .select("*, images:car_images(*)")
      .eq("is_active", true);

    if (brand) query = query.eq("brand", brand);
    if (body_type) query = query.eq("body_type", body_type);
    if (featured === "true") query = query.eq("is_featured", true);

    const { data, error } = await query.order("created_at", { ascending: false });
    if (!error && data) return NextResponse.json(data);
  } catch {
    // Fall through to demo data
  }

  let cars = DEMO_CARS;
  if (brand) cars = cars.filter((c) => c.brand === brand);
  if (body_type) cars = cars.filter((c) => c.body_type === body_type);
  if (featured === "true") cars = cars.filter((c) => c.is_featured);

  return NextResponse.json(cars);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = createClient();

    const { data, error } = await supabase
      .from("cars")
      .insert(body)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
