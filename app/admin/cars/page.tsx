"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, Search, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { formatPrice } from "@/lib/utils";
import { DEMO_CARS } from "@/lib/data";
import type { Car } from "@/types";

type BadgeVariant = "green" | "yellow" | "destructive" | "outline" | "default" | "secondary" | "new";
const STATUS_LABELS: Record<string, { label: string; variant: BadgeVariant }> = {
  available: { label: "В наличии", variant: "green" },
  on_order:  { label: "Под заказ", variant: "yellow" },
  sold:      { label: "Продано",   variant: "destructive" },
};

export default function AdminCarsPage() {
  const { toast } = useToast();
  const [cars, setCars] = useState<Car[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/cars")
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && d.length && setCars(d))
      .catch(() => {});
  }, []);

  const filtered = cars.filter((c) =>
    `${c.brand} ${c.model}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Удалить ${name}?`)) return;
    try {
      await fetch(`/api/cars/${id}`, { method: "DELETE" });
      setCars((cs) => cs.filter((c) => c.id !== id));
      toast({ variant: "success", title: "Удалено", description: name });
    } catch {
      toast({ variant: "destructive", title: "Ошибка удаления" });
    }
  };

  const toggleActive = async (car: Car) => {
    try {
      await fetch(`/api/cars/${car.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !car.is_active }),
      });
      setCars((cs) => cs.map((c) => c.id === car.id ? { ...c, is_active: !c.is_active } : c));
    } catch {
      toast({ variant: "destructive", title: "Ошибка" });
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Автомобили</h1>
          <p className="text-muted-foreground text-sm">{cars.length} позиций</p>
        </div>
        <Button asChild>
          <Link href="/admin/cars/new">
            <Plus className="w-4 h-4 mr-1" />
            Добавить
          </Link>
        </Button>
      </div>

      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Поиск по марке или модели..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Фото</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Название</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Год</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Цена</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Наличие</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Видимость</th>
                <th className="text-right px-4 py-3 text-muted-foreground font-medium">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((car) => {
                const img = car.images?.find((i) => i.is_main) ?? car.images?.[0];
                const statusInfo = STATUS_LABELS[car.status ?? "available"] ?? STATUS_LABELS.available;
                return (
                  <tr key={car.id} className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
                    <td className="px-4 py-3">
                      <div className="w-16 h-11 rounded-md overflow-hidden bg-secondary">
                        {img && (
                          <Image
                            src={img.url}
                            alt={car.model}
                            width={64}
                            height={44}
                            className="object-cover w-full h-full"
                          />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {car.brand} {car.model}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{car.year}</td>
                    <td className="px-4 py-3 font-semibold text-primary">{formatPrice(car.price)}</td>
                    <td className="px-4 py-3">
                      <Badge variant={statusInfo.variant}>
                        {statusInfo.label}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs gap-1"
                        onClick={() => toggleActive(car)}
                      >
                        {car.is_active
                          ? <><Eye className="w-3 h-3 text-green-500" /> Активен</>
                          : <><EyeOff className="w-3 h-3 text-muted-foreground" /> Скрыт</>
                        }
                      </Button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                          <Link href={`/admin/cars/${car.id}/edit`}>
                            <Pencil className="w-3.5 h-3.5" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:text-destructive"
                          onClick={() => handleDelete(car.id, `${car.brand} ${car.model}`)}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            Ничего не найдено
          </div>
        )}
      </div>
    </div>
  );
}
