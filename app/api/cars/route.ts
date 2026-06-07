import { NextResponse } from "next/server";
import { DEMO_CARS } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const brand = searchParams.get("brand");
  const body_type = searchParams.get("body_type");
  const featured = searchParams.get("featured");
  const status = searchParams.get("status");

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
    if (status) query = query.eq("status", status);

    const { data, error } = await query.order("created_at", { ascending: false });
    if (!error && data) return NextResponse.json(data);
  } catch {
    // Fall through to demo data
  }

  let cars = DEMO_CARS;
  if (brand) cars = cars.filter((c) => c.brand === brand);
  if (body_type) cars = cars.filter((c) => c.body_type === body_type);
  if (featured === "true") cars = cars.filter((c) => c.is_featured);
  if (status) cars = cars.filter((c) => c.status === status);

  return NextResponse.json(cars);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { images, ...carData } = body;

    const { createClient } = await import("@/lib/supabase/server");
    const supabase = createClient();

    const { data: car, error } = await supabase
      .from("cars")
      .insert(carData)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    if (images && Array.isArray(images) && images.length > 0) {
      await supabase.from("car_images").insert(
        images.map((img: { url: string; is_main: boolean; sort_order: number }) => ({
          car_id: car.id,
          url: img.url,
          is_main: img.is_main,
          sort_order: img.sort_order,
        }))
      );
    }

    return NextResponse.json(car, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
