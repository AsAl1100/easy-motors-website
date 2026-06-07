"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
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
import { BODY_TYPES, FUEL_TYPES, TRANSMISSIONS, DRIVE_TYPES, CAR_STATUSES, CAR_BRANDS } from "@/lib/constants";
import { DEMO_CARS } from "@/lib/data";
import type { Car, CarImage } from "@/types";

export default function EditCarPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<Car>>({});
  const [images, setImages] = useState<CarImage[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/cars/${id}`);
        const data = await res.json();
        const { images: imgs, ...carData } = data;
        setForm(carData);
        setImages(imgs ?? []);
      } catch {
        const car = DEMO_CARS.find((c) => c.id === id);
        if (car) {
          const { images: imgs, ...carData } = car;
          setForm(carData);
          setImages(imgs ?? []);
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const set = (k: keyof Car, v: string | boolean | number) =>
    setForm((f) => ({ ...f, [k]: v }));

  const addImageUrl = () => {
    const url = imageUrl.trim();
    if (!url) return;
    setImages((imgs) => [
      ...imgs,
      { id: `new-${Date.now()}`, car_id: id, url, is_main: imgs.length === 0, sort_order: imgs.length },
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
        { id: `new-${Date.now()}`, car_id: id, url, is_main: imgs.length === 0, sort_order: imgs.length },
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
    setSaving(true);
    try {
      const res = await fetch(`/api/cars/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          images: images.map((img) => ({
            url: img.url,
            is_main: img.is_main,
            sort_order: img.sort_order,
          })),
        }),
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
    return <div className="p-8 text-muted-foreground flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Загрузка...</div>;
  }

  const numField = (k: keyof Car) => (e: React.ChangeEvent<HTMLInputElement>) =>
    set(k, e.target.value === "" ? "" : parseFloat(e.target.value));

  return (
    <div className="p-6 max-w-4xl">
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
        {/* Основная информация */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-base">Основная информация</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Марка</Label>
              <Select value={(form.brand as string) ?? ""} onValueChange={(v) => set("brand", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CAR_BRANDS.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            {(["model", "year", "price", "mileage", "color"] as const).map((field) => (
              <div key={field} className="space-y-1.5">
                <Label>
                  {{ model: "Модель", year: "Год", price: "Цена (₸)", mileage: "Пробег (км)", color: "Цвет" }[field]}
                </Label>
                <Input
                  type={["year","price","mileage"].includes(field) ? "number" : "text"}
                  value={(form[field] as string | number) ?? ""}
                  onChange={(e) =>
                    set(field, ["year","price","mileage"].includes(field)
                      ? parseFloat(e.target.value) || 0
                      : e.target.value)
                  }
                />
              </div>
            ))}
          </div>

          <div className="space-y-1.5">
            <Label>Статус наличия</Label>
            <Select value={(form.status as string) ?? "available"} onValueChange={(v) => set("status", v)}>
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
              { label: "Тип кузова", field: "body_type" as keyof Car, options: BODY_TYPES },
              { label: "Топливо", field: "fuel_type" as keyof Car, options: FUEL_TYPES },
              { label: "Коробка передач", field: "transmission" as keyof Car, options: TRANSMISSIONS },
              { label: "Привод", field: "drive_type" as keyof Car, options: DRIVE_TYPES },
            ].map(({ label, field, options }) => (
              <div key={field} className="space-y-1.5">
                <Label>{label}</Label>
                <Select value={(form[field] as string) ?? ""} onValueChange={(v) => set(field, v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {options.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            ))}
            {([
              { field: "engine_volume" as keyof Car, label: "Объём двигателя (л)" },
              { field: "engine_power" as keyof Car, label: "Мощность (л.с.)" },
              { field: "seats" as keyof Car, label: "Количество мест" },
              { field: "trunk_volume" as keyof Car, label: "Объём багажника (л)" },
              { field: "fuel_consumption" as keyof Car, label: "Расход топлива (л/100км)" },
              { field: "acceleration" as keyof Car, label: "Разгон 0–100 (сек)" },
              { field: "top_speed" as keyof Car, label: "Макс. скорость (км/ч)" },
              { field: "ground_clearance" as keyof Car, label: "Клиренс (мм)" },
            ] as { field: keyof Car; label: string }[]).map(({ field, label }) => (
              <div key={field} className="space-y-1.5">
                <Label>{label}</Label>
                <Input
                  type="number"
                  step="any"
                  value={(form[field] as number | undefined) ?? ""}
                  onChange={numField(field)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Фотографии */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-base">Фотографии</h3>

          {images.length > 0 && (
            <div className="space-y-2">
              {images.map((img, i) => (
                <div key={img.id} className="flex items-center gap-2 bg-secondary/40 rounded-lg px-3 py-2">
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

        {/* Описание */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-base">Описание и настройки</h3>
          <div className="space-y-1.5">
            <Label>Описание</Label>
            <Textarea
              value={(form.description as string) ?? ""}
              onChange={(e) => set("description", e.target.value)}
              rows={4}
            />
          </div>
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_active ?? true}
                onChange={(e) => set("is_active", e.target.checked)}
                className="accent-primary" />
              <span className="text-sm">Активен (виден в каталоге)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_new ?? true}
                onChange={(e) => set("is_new", e.target.checked)}
                className="accent-primary" />
              <span className="text-sm">Новый автомобиль</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_featured ?? false}
                onChange={(e) => set("is_featured", e.target.checked)}
                className="accent-primary" />
              <span className="text-sm">На главной странице</span>
            </label>
          </div>
        </div>

        <Button type="submit" size="lg" disabled={saving} className="w-full">
          {saving && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
          {saving ? "Сохраняем..." : "Сохранить изменения"}
        </Button>
      </form>
    </div>
  );
}
