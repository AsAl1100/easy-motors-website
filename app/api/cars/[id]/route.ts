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

  return NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function PUT(request: Request, { params }: Props) {
  const { id } = await params;
  try {
    const body = await request.json();
    const { images, ...carData } = body;

    const { createClient } = await import("@/lib/supabase/server");
    const supabase = createClient();

    const { data, error } = await supabase
      .from("cars")
      .update({ ...carData, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    // Replace images if explicitly provided
    if (Array.isArray(images)) {
      await supabase.from("car_images").delete().eq("car_id", id);
      if (images.length > 0) {
        await supabase.from("car_images").insert(
          images.map((img: { url: string; is_main: boolean; sort_order: number }) => ({
            car_id: id,
            url: img.url,
            is_main: img.is_main,
            sort_order: img.sort_order,
          }))
        );
      }
    }

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
