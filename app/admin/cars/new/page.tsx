"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Plus, Trash2, Upload, Star } from "lucide-react";
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
import { BODY_TYPES, FUEL_TYPES, TRANSMISSIONS, DRIVE_TYPES, CAR_STATUSES, CAR_BRANDS } from "@/lib/constants";

interface ImageEntry {
  url: string;
  is_main: boolean;
  sort_order: number;
}

interface CarForm {
  brand: string; model: string; year: string; price: string;
  mileage: string; body_type: string; fuel_type: string;
  transmission: string; engine_volume: string; engine_power: string;
  drive_type: string; color: string; description: string;
  status: string;
  seats: string; trunk_volume: string; fuel_consumption: string;
  top_speed: string; acceleration: string; ground_clearance: string;
  is_new: boolean; is_featured: boolean;
}

const init: CarForm = {
  brand: "Changan", model: "", year: "2025", price: "", mileage: "0",
  body_type: "SUV", fuel_type: "Бензин", transmission: "Автомат",
  engine_volume: "1.5", engine_power: "", drive_type: "Передний",
  color: "", description: "", status: "available",
  seats: "5", trunk_volume: "", fuel_consumption: "", top_speed: "",
  acceleration: "", ground_clearance: "", is_new: true, is_featured: false,
};

function TextField({ label, field, form, onChange, placeholder, type = "text" }: {
  label: string;
  field: keyof CarForm;
  form: CarForm;
  onChange: (k: keyof CarForm, v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input
        type={type}
        placeholder={placeholder}
        value={form[field] as string}
        onChange={(e) => onChange(field, e.target.value)}
        step={type === "number" ? "any" : undefined}
      />
    </div>
  );
}

export default function NewCarPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [form, setForm] = useState<CarForm>(init);
  const [images, setImages] = useState<ImageEntry[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (k: keyof CarForm, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  const setStr = (k: keyof CarForm, v: string) => set(k, v);

  const addImageUrl = () => {
    const url = imageUrl.trim();
    if (!url) return;
    setImages((imgs) => [
      ...imgs,
      { url, is_main: imgs.length === 0, sort_order: imgs.length },
    ]);
    setImageUrl("");
  };

  const removeImage = (i: number) => {
    setImages((imgs) => {
      const next = imgs.filter((_, idx) => idx !== i).map((img, idx) => ({
        ...img,
        is_main: idx === 0,
        sort_order: idx,
      }));
      return next;
    });
  };

  const setMain = (i: number) => {
    setImages((imgs) =>
      imgs.map((img, idx) => ({ ...img, is_main: idx === i }))
    );
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Upload failed");
      }
      const { url } = await res.json();
      setImages((imgs) => [
        ...imgs,
        { url, is_main: imgs.length === 0, sort_order: imgs.length },
      ]);
      toast({ variant: "success", title: "Фото загружено!" });
    } catch (e: unknown) {
      toast({ variant: "destructive", title: "Ошибка загрузки", description: e instanceof Error ? e.message : "Требуется Supabase Storage" });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.brand || !form.model || !form.price) {
      toast({ variant: "destructive", title: "Заполните обязательные поля (марка, модель, цена)" });
      return;
    }
    setLoading(true);

    try {
      const slug = slugify(`${form.brand}-${form.model}-${form.year}`);
      const payload = {
        ...form,
        slug,
        year: parseInt(form.year) || 2025,
        price: parseInt(form.price),
        mileage: parseInt(form.mileage) || 0,
        engine_volume: parseFloat(form.engine_volume) || 0,
        engine_power: parseInt(form.engine_power) || 0,
        seats: parseInt(form.seats) || 5,
        trunk_volume: parseInt(form.trunk_volume) || null,
        fuel_consumption: parseFloat(form.fuel_consumption) || null,
        top_speed: parseInt(form.top_speed) || null,
        acceleration: parseFloat(form.acceleration) || null,
        ground_clearance: parseInt(form.ground_clearance) || null,
        images,
      };

      const res = await fetch("/api/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Error");
      }

      toast({ variant: "success", title: "Автомобиль добавлен!" });
      router.push("/admin/cars");
    } catch (e: unknown) {
      toast({ variant: "destructive", title: "Ошибка при добавлении", description: e instanceof Error ? e.message : undefined });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl">
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
        {/* Основная информация */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-base">Основная информация</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Марка *</Label>
              <Select value={form.brand} onValueChange={(v) => set("brand", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CAR_BRANDS.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <TextField label="Модель *" field="model" form={form} onChange={setStr} placeholder="CS75 Plus" />
            <TextField label="Год *" field="year" form={form} onChange={setStr} type="number" placeholder="2025" />
            <TextField label="Цена (₸) *" field="price" form={form} onChange={setStr} type="number" placeholder="11000000" />
            <TextField label="Пробег (км)" field="mileage" form={form} onChange={setStr} type="number" placeholder="0" />
            <TextField label="Цвет" field="color" form={form} onChange={setStr} placeholder="Серый металлик" />
          </div>

          <div className="space-y-1.5">
            <Label>Статус наличия</Label>
            <Select value={form.status} onValueChange={(v) => set("status", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {CAR_STATUSES.map((s) => (
                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Технические характеристики */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-base">Технические характеристики</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Тип кузова", field: "body_type" as keyof CarForm, options: BODY_TYPES },
              { label: "Топливо", field: "fuel_type" as keyof CarForm, options: FUEL_TYPES },
              { label: "Коробка передач", field: "transmission" as keyof CarForm, options: TRANSMISSIONS },
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
            <TextField label="Объём двигателя (л)" field="engine_volume" form={form} onChange={setStr} type="number" placeholder="1.5" />
            <TextField label="Мощность (л.с.)" field="engine_power" form={form} onChange={setStr} type="number" placeholder="150" />
            <TextField label="Количество мест" field="seats" form={form} onChange={setStr} type="number" placeholder="5" />
            <TextField label="Объём багажника (л)" field="trunk_volume" form={form} onChange={setStr} type="number" placeholder="450" />
            <TextField label="Расход топлива (л/100км)" field="fuel_consumption" form={form} onChange={setStr} type="number" placeholder="7.5" />
            <TextField label="Разгон 0–100 (сек)" field="acceleration" form={form} onChange={setStr} type="number" placeholder="9.5" />
            <TextField label="Макс. скорость (км/ч)" field="top_speed" form={form} onChange={setStr} type="number" placeholder="190" />
            <TextField label="Клиренс (мм)" field="ground_clearance" form={form} onChange={setStr} type="number" placeholder="185" />
          </div>
        </div>

        {/* Фотографии */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-base">Фотографии</h3>

          {images.length > 0 && (
            <div className="space-y-2">
              {images.map((img, i) => (
                <div key={i} className="flex items-center gap-2 bg-secondary/40 rounded-lg px-3 py-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt="" className="w-14 h-10 object-cover rounded" />
                  <span className="flex-1 text-xs truncate text-muted-foreground">{img.url}</span>
                  {img.is_main ? (
                    <span className="flex items-center gap-1 text-xs text-primary font-medium shrink-0">
                      <Star className="w-3 h-3 fill-primary" /> Главное
                    </span>
                  ) : (
                    <Button type="button" variant="ghost" size="sm" className="h-6 text-xs px-2 shrink-0"
                      onClick={() => setMain(i)}>
                      Главным
                    </Button>
                  )}
                  <Button type="button" variant="ghost" size="icon" className="h-6 w-6 shrink-0 hover:text-destructive"
                    onClick={() => removeImage(i)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <Input
              placeholder="Вставьте URL фотографии..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addImageUrl(); } }}
            />
            <Button type="button" variant="outline" onClick={addImageUrl} className="shrink-0">
              <Plus className="w-4 h-4 mr-1" /> Добавить
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUpload(file);
                e.target.value = "";
              }}
            />
            <Button
              type="button"
              variant="outline"
              disabled={uploading}
              onClick={() => fileRef.current?.click()}
            >
              {uploading
                ? <><Loader2 className="w-4 h-4 animate-spin mr-1" /> Загружаем...</>
                : <><Upload className="w-4 h-4 mr-1" /> Загрузить с устройства</>
              }
            </Button>
            <p className="text-xs text-muted-foreground">
              Требуется Supabase Storage bucket «car-images»
            </p>
          </div>
        </div>

        {/* Описание и настройки */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-base">Описание и настройки</h3>
          <div className="space-y-1.5">
            <Label>Описание автомобиля</Label>
            <Textarea
              placeholder="Опишите автомобиль..."
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={4}
            />
          </div>
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_new}
                onChange={(e) => set("is_new", e.target.checked)}
                className="accent-primary" />
              <span className="text-sm">Новый автомобиль</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_featured}
                onChange={(e) => set("is_featured", e.target.checked)}
                className="accent-primary" />
              <span className="text-sm">Показывать на главной</span>
            </label>
          </div>
        </div>

        <Button type="submit" size="lg" disabled={loading} className="w-full">
          {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
          {loading ? "Сохраняем..." : "Добавить автомобиль"}
        </Button>
      </form>
    </div>
  );
}
