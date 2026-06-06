"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { slugify } from "@/lib/utils";
import { BODY_TYPES, FUEL_TYPES, TRANSMISSIONS, DRIVE_TYPES } from "@/lib/constants";

interface CarForm {
  brand: string; model: string; year: string; price: string;
  mileage: string; body_type: string; fuel_type: string;
  transmission: string; engine_volume: string; engine_power: string;
  drive_type: string; color: string; description: string;
  image_url: string; is_new: boolean; is_featured: boolean;
}

const init: CarForm = {
  brand: "", model: "", year: "2023", price: "", mileage: "0",
  body_type: "Седан", fuel_type: "Бензин", transmission: "Автомат",
  engine_volume: "2.0", engine_power: "", drive_type: "Передний",
  color: "", description: "", image_url: "", is_new: true, is_featured: false,
};

export default function NewCarPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [form, setForm] = useState<CarForm>(init);
  const [loading, setLoading] = useState(false);

  const set = (k: keyof CarForm, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const slug = slugify(`${form.brand}-${form.model}-${form.year}`);
      const payload = {
        ...form,
        slug,
        year: parseInt(form.year),
        price: parseInt(form.price),
        mileage: parseInt(form.mileage),
        engine_volume: parseFloat(form.engine_volume),
        engine_power: parseInt(form.engine_power) || 0,
        images: form.image_url ? [{ url: form.image_url, is_main: true, sort_order: 0 }] : [],
      };

      const res = await fetch("/api/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();

      toast({ variant: "success", title: "Автомобиль добавлен!" });
      router.push("/admin/cars");
    } catch {
      toast({ variant: "destructive", title: "Ошибка при добавлении" });
    } finally {
      setLoading(false);
    }
  };

  const TextField = ({ label, field, placeholder, type = "text" }: {
    label: string; field: keyof CarForm; placeholder?: string; type?: string;
  }) => (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input
        type={type}
        placeholder={placeholder}
        value={form[field] as string}
        onChange={(e) => set(field, e.target.value)}
      />
    </div>
  );

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <Button asChild variant="ghost" size="icon">
          <Link href="/admin/cars"><ArrowLeft className="w-4 h-4" /></Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Добавить автомобиль</h1>
          <p className="text-muted-foreground text-sm">Заполните все поля</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h3 className="font-semibold">Основная информация</h3>
          <div className="grid grid-cols-2 gap-4">
            <TextField label="Марка *" field="brand" placeholder="Toyota" />
            <TextField label="Модель *" field="model" placeholder="Camry" />
            <TextField label="Год *" field="year" type="number" placeholder="2023" />
            <TextField label="Цена (₸) *" field="price" type="number" placeholder="18500000" />
            <TextField label="Пробег (км)" field="mileage" type="number" placeholder="0" />
            <TextField label="Цвет" field="color" placeholder="Белый перламутр" />
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h3 className="font-semibold">Технические характеристики</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Тип кузова", field: "body_type" as keyof CarForm, options: BODY_TYPES },
              { label: "Топливо", field: "fuel_type" as keyof CarForm, options: FUEL_TYPES },
              { label: "Коробка", field: "transmission" as keyof CarForm, options: TRANSMISSIONS },
              { label: "Привод", field: "drive_type" as keyof CarForm, options: DRIVE_TYPES },
            ].map(({ label, field, options }) => (
              <div key={field} className="space-y-1.5">
                <Label>{label}</Label>
                <Select value={form[field] as string} onValueChange={(v) => set(field, v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {options.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            ))}
            <TextField label="Объём двигателя" field="engine_volume" type="number" placeholder="2.0" />
            <TextField label="Мощность (л.с.)" field="engine_power" type="number" placeholder="181" />
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h3 className="font-semibold">Фото и описание</h3>
          <div className="space-y-1.5">
            <Label>URL главного фото</Label>
            <Input
              placeholder="https://images.unsplash.com/..."
              value={form.image_url}
              onChange={(e) => set("image_url", e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Описание</Label>
            <Textarea
              placeholder="Описание автомобиля..."
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={4}
            />
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_new}
                onChange={(e) => set("is_new", e.target.checked)}
                className="accent-primary"
              />
              <span className="text-sm">Новый автомобиль</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_featured}
                onChange={(e) => set("is_featured", e.target.checked)}
                className="accent-primary"
              />
              <span className="text-sm">Показывать на главной</span>
            </label>
          </div>
        </div>

        <Button type="submit" size="lg" disabled={loading} className="w-full">
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? "Сохраняем..." : "Добавить автомобиль"}
        </Button>
      </form>
    </div>
  );
}
