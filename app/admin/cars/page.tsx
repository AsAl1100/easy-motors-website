"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { formatPrice } from "@/lib/utils";
import { DEMO_CARS } from "@/lib/data";
import type { Car } from "@/types";

export default function AdminCarsPage() {
  const { toast } = useToast();
  const [cars, setCars] = useState<Car[]>(DEMO_CARS);
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

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Автомобили</h1>
          <p className="text-muted-foreground text-sm">{cars.length} позиций</p>
        </div>
        <Button asChild>
          <Link href="/admin/cars/new">
            <Plus className="w-4 h-4" />
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
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Фото</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Название</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Год</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Цена</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Статус</th>
                <th className="text-right px-4 py-3 text-muted-foreground font-medium">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((car) => {
                const img = car.images?.find((i) => i.is_main) ?? car.images?.[0];
                return (
                  <tr key={car.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="w-14 h-10 rounded-md overflow-hidden bg-secondary">
                        {img && (
                          <Image
                            src={img.url}
                            alt={car.model}
                            width={56}
                            height={40}
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
                      <Badge variant={car.is_active ? "green" : "outline"}>
                        {car.is_active ? "Активен" : "Скрыт"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
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
