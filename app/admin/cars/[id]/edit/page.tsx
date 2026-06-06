"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { BODY_TYPES, FUEL_TYPES, TRANSMISSIONS, DRIVE_TYPES } from "@/lib/constants";
import { DEMO_CARS } from "@/lib/data";
import type { Car } from "@/types";

export default function EditCarPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<Car>>({});

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/cars/${id}`);
        const data = await res.json();
        setForm(data);
      } catch {
        const car = DEMO_CARS.find((c) => c.id === id);
        if (car) setForm(car);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const set = (k: keyof Car, v: string | boolean | number) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/cars/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast({ variant: "success", title: "Сохранено!" });
      router.push("/admin/cars");
    } catch {
      toast({ variant: "destructive", title: "Ошибка сохранения" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-muted-foreground">Загрузка...</div>;
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <Button asChild variant="ghost" size="icon">
          <Link href="/admin/cars"><ArrowLeft className="w-4 h-4" /></Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Редактировать</h1>
          <p className="text-muted-foreground text-sm">
            {form.brand} {form.model} {form.year}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h3 className="font-semibold">Основная информация</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Марка", field: "brand" as keyof Car },
              { label: "Модель", field: "model" as keyof Car },
              { label: "Год", field: "year" as keyof Car, type: "number" },
              { label: "Цена (₸)", field: "price" as keyof Car, type: "number" },
              { label: "Пробег (км)", field: "mileage" as keyof Car, type: "number" },
              { label: "Цвет", field: "color" as keyof Car },
            ].map(({ label, field, type = "text" }) => (
              <div key={field} className="space-y-1.5">
                <Label>{label}</Label>
                <Input
                  type={type}
                  value={(form[field] as string | number) ?? ""}
                  onChange={(e) =>
                    set(field, type === "number" ? parseFloat(e.target.value) : e.target.value)
                  }
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h3 className="font-semibold">Технические характеристики</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Тип кузова", field: "body_type" as keyof Car, options: BODY_TYPES },
              { label: "Топливо", field: "fuel_type" as keyof Car, options: FUEL_TYPES },
              { label: "Коробка", field: "transmission" as keyof Car, options: TRANSMISSIONS },
              { label: "Привод", field: "drive_type" as keyof Car, options: DRIVE_TYPES },
            ].map(({ label, field, options }) => (
              <div key={field} className="space-y-1.5">
                <Label>{label}</Label>
                <Select
                  value={(form[field] as string) ?? ""}
                  onValueChange={(v) => set(field, v)}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {options.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h3 className="font-semibold">Описание</h3>
          <div className="space-y-1.5">
            <Label>Описание</Label>
            <Textarea
              value={(form.description as string) ?? ""}
              onChange={(e) => set("description", e.target.value)}
              rows={4}
            />
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_active ?? true}
                onChange={(e) => set("is_active", e.target.checked)}
                className="accent-primary"
              />
              <span className="text-sm">Активен (виден в каталоге)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_featured ?? false}
                onChange={(e) => set("is_featured", e.target.checked)}
                className="accent-primary"
              />
              <span className="text-sm">На главной</span>
            </label>
          </div>
        </div>

        <Button type="submit" size="lg" disabled={saving} className="w-full">
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          {saving ? "Сохраняем..." : "Сохранить изменения"}
        </Button>
      </form>
    </div>
  );
}
