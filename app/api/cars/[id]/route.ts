import { NextResponse } from "next/server";
import { DEMO_CARS } from "@/lib/data";

interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(_: Request, { params }: Props) {
  const { id } = await params;

  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = createClient();
    const { data, error } = await supabase
      .from("cars")
      .select("*, images:car_images(*)")
      .eq("id", id)
      .single();

    if (!error && data) return NextResponse.json(data);
  } catch {
    // Fall through
  }

  const car = DEMO_CARS.find((c) => c.id === id || c.slug === id);
  if (!car) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(car);
}

export async function PUT(request: Request, { params }: Props) {
  const { id } = await params;
  try {
    const body = await request.json();
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = createClient();

    const { data, error } = await supabase
      .from("cars")
      .update({ ...body, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: Props) {
  const { id } = await params;
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = createClient();

    const { error } = await supabase.from("cars").delete().eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
