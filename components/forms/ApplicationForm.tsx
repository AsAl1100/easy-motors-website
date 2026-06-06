"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import type { ApplicationType } from "@/types";

interface Props {
  type: ApplicationType;
  carId?: string;
  carName?: string;
  title?: string;
}

export default function ApplicationForm({ type, carId, carName, title }: Props) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;

    setLoading(true);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type, car_id: carId, car_name: carName }),
      });

      if (!res.ok) throw new Error();

      setSuccess(true);
      toast({ variant: "success", title: "Заявка отправлена!", description: "Мы свяжемся с вами в ближайшее время." });
    } catch {
      toast({ variant: "destructive", title: "Ошибка", description: "Не удалось отправить заявку. Попробуйте снова." });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-10 text-center gap-4"
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold">Заявка отправлена!</h3>
        <p className="text-muted-foreground text-sm max-w-xs">
          Наш менеджер свяжется с вами в ближайшее время. Обычно мы отвечаем в течение 15 минут.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {title && <h3 className="font-semibold text-lg">{title}</h3>}
      {carName && (
        <div className="px-3 py-2 bg-primary/10 border border-primary/20 rounded-lg text-sm">
          <span className="text-muted-foreground">Автомобиль: </span>
          <span className="font-medium text-primary">{carName}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">Ваше имя *</Label>
          <Input
            id="name"
            placeholder="Асылбек"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Телефон *</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+7 777 000 00 00"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message">Сообщение (необязательно)</Label>
        <Textarea
          id="message"
          placeholder="Уточните ваш вопрос или пожелания..."
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          rows={3}
        />
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Send className="w-4 h-4" />
        )}
        {loading ? "Отправляем..." : "Отправить заявку"}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
      </p>
    </form>
  );
}
