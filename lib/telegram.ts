import type { Application } from "@/types";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function sendTelegramMessage(text: string): Promise<void> {
  if (!BOT_TOKEN || !CHAT_ID) return;

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: "HTML" }),
  });
}

export function formatApplicationMessage(app: Application): string {
  const typeLabels: Record<string, string> = {
    car: "Заявка на автомобиль",
    credit: "Заявка на кредит",
    selection: "Заявка на подбор авто",
    callback: "Обратный звонок",
  };

  let msg = `🚗 <b>${typeLabels[app.type] || "Новая заявка"}</b>\n\n`;
  msg += `👤 Имя: ${app.name}\n`;
  msg += `📞 Телефон: ${app.phone}\n`;

  if (app.car_name) msg += `🚙 Автомобиль: ${app.car_name}\n`;
  if (app.down_payment) msg += `💰 Первоначальный взнос: ${app.down_payment.toLocaleString()} ₸\n`;
  if (app.loan_term) msg += `📅 Срок кредита: ${app.loan_term} лет\n`;
  if (app.message) msg += `💬 Сообщение: ${app.message}\n`;

  msg += `\n⏰ ${new Date().toLocaleString("ru-KZ", { timeZone: "Asia/Almaty" })}`;

  return msg;
}
