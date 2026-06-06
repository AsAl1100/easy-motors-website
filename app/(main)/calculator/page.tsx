import type { Metadata } from "next";
import { Suspense } from "react";
import CreditCalculatorWrapper from "./CreditCalculatorWrapper";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Кредитный калькулятор | ${SITE_NAME}`,
  description: "Рассчитайте ежемесячный платёж по автокредиту. Простой и удобный калькулятор Easy Motors.",
};

export default function CalculatorPage() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="bg-card/30 border-b border-border py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Кредитный <span className="text-gradient-red">калькулятор</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Рассчитайте ежемесячный платёж за несколько секунд
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Suspense>
            <CreditCalculatorWrapper />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
