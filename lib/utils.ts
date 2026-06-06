import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ru-KZ", {
    style: "currency",
    currency: "KZT",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("ru-KZ").format(num);
}

export function calcMonthlyPayment(
  price: number,
  downPayment: number,
  termYears: number,
  annualRate: number
): number {
  const loanAmount = price - downPayment;
  if (loanAmount <= 0) return 0;
  const monthlyRate = annualRate / 100 / 12;
  const n = termYears * 12;
  if (monthlyRate === 0) return loanAmount / n;
  return (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, n)) /
    (Math.pow(1 + monthlyRate, n) - 1);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function getWhatsAppLink(phone: string, message: string): string {
  const encoded = encodeURIComponent(message);
  const clean = phone.replace(/\D/g, "");
  return `https://wa.me/${clean}?text=${encoded}`;
}

export function getCarWhatsAppMessage(carName: string, price: number): string {
  return `Здравствуйте! Меня интересует автомобиль ${carName}. Цена: ${formatPrice(price)}. Хочу узнать подробнее.`;
}

export function buildWhatsAppLink(whatsappPhone: string, message: string): string {
  const clean = whatsappPhone.replace(/\D/g, "");
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}
