import { google } from "googleapis";
import type { Application } from "@/types";

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!email || !key) return null;

  return new google.auth.JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("ru-RU", { timeZone: "Asia/Almaty" });
}

const TYPE_LABELS: Record<string, string> = {
  credit: "Кредит",
  callback: "Звонок",
  test_drive: "Тест-драйв",
  trade_in: "Трейд-ин",
  consultation: "Консультация",
};

export async function appendApplicationToSheet(app: Application) {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const auth = getAuth();
  if (!auth || !sheetId) return;

  const sheets = google.sheets({ version: "v4", auth });

  // Ensure header row exists on first write
  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: "A1:J1",
  });

  if (!existing.data.values?.length) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: "A1:J1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [["Дата", "Тип", "Имя", "Телефон", "Автомобиль", "Взнос (тг)", "Срок (мес)", "Сообщение", "Статус", "ID"]],
      },
    });
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "A:J",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[
        formatDate(app.created_at),
        TYPE_LABELS[app.type] ?? app.type,
        app.name,
        app.phone,
        app.car_name ?? "—",
        app.down_payment ? app.down_payment.toLocaleString("ru-RU") : "—",
        app.loan_term ? `${app.loan_term} мес` : "—",
        app.message ?? "—",
        "Новая",
        app.id,
      ]],
    },
  });
}
