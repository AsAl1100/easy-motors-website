import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { DEMO_CARS } from "@/lib/data";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(request: Request) {
  try {
    const { message, history = [] } = await request.json();

    if (!message) {
      return NextResponse.json({ error: "No message" }, { status: 400 });
    }

    // Get cars from DB or demo data
    let cars = DEMO_CARS;
    try {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = createClient();
      const { data } = await supabase.from("cars").select("*").eq("is_active", true);
      if (data?.length) cars = data;
    } catch {
      // Use demo data
    }

    const carsContext = cars.map((c) => ({
      id: c.id,
      slug: c.slug,
      name: `${c.brand} ${c.model} ${c.year}`,
      price: c.price,
      body_type: c.body_type,
      fuel_type: c.fuel_type,
      transmission: c.transmission,
      engine_volume: c.engine_volume,
      engine_power: c.engine_power,
      mileage: c.mileage,
    }));

    const systemPrompt = `Ты — AI-консультант автосалона Easy Motors (Казахстан, г. Алматы). Отвечай только на русском языке, коротко, дружелюбно и по делу.

Текущий каталог автомобилей (${cars.length} шт.):
${JSON.stringify(carsContext, null, 2)}

Правила:
- Помогай подобрать авто по бюджету, типу, семейным потребностям и т.д.
- При расчёте кредита: платёж = P × r × (1+r)^n / ((1+r)^n - 1), где P=сумма кредита, r=ставка/12/100, n=месяцы. Ставка по умолчанию 18%.
- НИКОГДА не упоминай переплату или общую сумму — только ежемесячный платёж.
- Цены указывай в тенге (₸), например: 15 000 000 ₸.
- Если спрашивают про машину не из каталога — скажи, что можем заказать.
- Предлагай WhatsApp (+7 777 123-45-67) для детального обсуждения.
- Не пиши длинные тексты — максимум 3-4 предложения на ответ.`;

    const messages = [
      ...history,
      { role: "user" as const, content: message },
    ];

    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 512,
      system: systemPrompt,
      messages,
    });

    const aiText = response.content[0].type === "text" ? response.content[0].text : "";
    const updatedHistory = [...messages, { role: "assistant" as const, content: aiText }];

    return NextResponse.json({ response: aiText, messages: updatedHistory });
  } catch (error) {
    console.error("AI chat error:", error);
    return NextResponse.json(
      { response: "Извините, произошла ошибка. Пожалуйста, свяжитесь с нами по WhatsApp или по телефону.", messages: [] },
      { status: 200 }
    );
  }
}
