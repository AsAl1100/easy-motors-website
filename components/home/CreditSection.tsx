"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calculator, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  "Срок кредита до 7 лет",
  "Решение за 15 минут",
  "Без справок о доходах (по 2 документам)",
  "Досрочное погашение без штрафов",
  "Сотрудничество с 10+ банками",
];

export default function CreditSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              Кредит
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-6">
              Авто в кредит на{" "}
              <span className="text-gradient-red">выгодных условиях</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Мы работаем с ведущими банками Казахстана и помогаем оформить кредит быстро и без лишних документов.
              Рассчитайте свой ежемесячный платёж прямо сейчас.
            </p>

            <ul className="space-y-3 mb-8">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm">{b}</span>
                </li>
              ))}
            </ul>

            <Button asChild size="lg">
              <Link href="/calculator">
                <Calculator className="w-5 h-5" />
                Рассчитать платёж
              </Link>
            </Button>
          </motion.div>

          {/* Right — Visual card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-card to-card/50 border border-border rounded-2xl p-8">
              <div className="text-center mb-8">
                <p className="text-muted-foreground text-sm mb-1">Ежемесячный платёж от</p>
                <p className="text-5xl font-bold text-primary">89 900 ₸</p>
                <p className="text-muted-foreground text-sm mt-1">при первом взносе 20%</p>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Цена авто", value: "11 500 000 ₸" },
                  { label: "Первый взнос", value: "2 300 000 ₸ (20%)" },
                  { label: "Сумма кредита", value: "9 200 000 ₸" },
                  { label: "Срок", value: "7 лет" },
                  { label: "Ставка", value: "от 21% годовых" },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                    <span className="text-muted-foreground text-sm">{row.label}</span>
                    <span className="font-semibold text-sm">{row.value}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-muted-foreground text-center mt-4">
                * Пример расчёта. Точные условия уточняйте у менеджера.
              </p>
            </div>

            {/* Decorative gradient */}
            <div className="absolute -inset-px bg-gradient-to-br from-primary/20 to-transparent rounded-2xl -z-10 blur-xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
