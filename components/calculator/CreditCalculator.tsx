"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Calculator, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatPrice, calcMonthlyPayment, getWhatsAppLink } from "@/lib/utils";
import { WHATSAPP_PHONE, CREDIT_TERMS } from "@/lib/constants";

interface Props {
  initialPrice?: number;
  carName?: string;
}

export default function CreditCalculator({ initialPrice = 15000000, carName }: Props) {
  const [price, setPrice] = useState(initialPrice);
  const [downPct, setDownPct] = useState(20);
  const [term, setTerm] = useState(5);
  const [rate, setRate] = useState(18);
  const [monthly, setMonthly] = useState(0);

  const downPayment = Math.round((price * downPct) / 100);
  const loanAmount = price - downPayment;

  useEffect(() => {
    const m = calcMonthlyPayment(price, downPayment, term, rate);
    setMonthly(Math.round(m));
  }, [price, downPayment, term, rate]);

  const waMsg = `Здравствуйте! Хочу оформить кредит${carName ? ` на ${carName}` : ""}.\nЦена авто: ${formatPrice(price)}\nПервый взнос: ${formatPrice(downPayment)} (${downPct}%)\nСрок: ${term} лет\nПлатёж: ${formatPrice(monthly)}/мес.`;
  const waLink = getWhatsAppLink(WHATSAPP_PHONE, waMsg);

  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Calculator className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl font-bold">Кредитный калькулятор</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          {/* Price */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>Стоимость автомобиля</Label>
              <span className="text-sm font-semibold text-primary">{formatPrice(price)}</span>
            </div>
            <Slider
              min={1000000}
              max={60000000}
              step={500000}
              value={[price]}
              onValueChange={([v]) => setPrice(v)}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1 млн</span>
              <span>60 млн</span>
            </div>
          </div>

          {/* Down payment */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>Первоначальный взнос</Label>
              <span className="text-sm font-semibold text-primary">
                {downPct}% — {formatPrice(downPayment)}
              </span>
            </div>
            <Slider
              min={10}
              max={90}
              step={5}
              value={[downPct]}
              onValueChange={([v]) => setDownPct(v)}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>10%</span>
              <span>90%</span>
            </div>
          </div>

          {/* Term */}
          <div className="space-y-2">
            <Label>Срок кредита</Label>
            <Select value={term.toString()} onValueChange={(v) => setTerm(parseInt(v))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CREDIT_TERMS.map((t) => (
                  <SelectItem key={t} value={t.toString()}>
                    {t} {t === 1 ? "год" : t <= 4 ? "года" : "лет"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Rate */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>Процентная ставка</Label>
              <span className="text-sm font-semibold text-primary">{rate}% годовых</span>
            </div>
            <Slider
              min={12}
              max={28}
              step={0.5}
              value={[rate]}
              onValueChange={([v]) => setRate(v)}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>12%</span>
              <span>28%</span>
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="flex flex-col">
          <motion.div
            key={monthly}
            initial={{ opacity: 0.5, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6 flex-1"
          >
            <p className="text-muted-foreground text-sm mb-2">Ежемесячный платёж</p>
            <p className="text-5xl font-bold text-primary mb-1">{formatPrice(monthly)}</p>
            <p className="text-xs text-muted-foreground">в месяц</p>

            <div className="mt-6 space-y-3">
              {[
                { label: "Цена автомобиля", value: formatPrice(price) },
                { label: "Первоначальный взнос", value: `${formatPrice(downPayment)} (${downPct}%)` },
                { label: "Сумма кредита", value: formatPrice(loanAmount) },
                {
                  label: "Срок кредита",
                  value: `${term} ${term === 1 ? "год" : term <= 4 ? "года" : "лет"} (${term * 12} мес.)`,
                },
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-start gap-2 text-sm">
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className="font-medium text-right">{row.value}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
              * Расчёт является ориентировочным. Итоговые условия уточняйте у менеджера.
            </p>
          </motion.div>

          <Button asChild variant="whatsapp" size="lg" className="mt-4">
            <a href={waLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5" />
              Оформить в WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
