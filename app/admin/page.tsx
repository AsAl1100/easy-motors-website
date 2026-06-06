"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Car, FileText, TrendingUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DEMO_CARS } from "@/lib/data";

export default function AdminDashboard() {
  const [appCount, setAppCount] = useState(0);

  useEffect(() => {
    fetch("/api/applications")
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && setAppCount(d.length))
      .catch(() => {});
  }, []);

  const stats = [
    { label: "Автомобилей", value: DEMO_CARS.length, icon: Car, href: "/admin/cars" },
    { label: "Заявок", value: appCount, icon: FileText, href: "/admin/applications" },
    { label: "Активных авто", value: DEMO_CARS.filter((c) => c.is_active).length, icon: TrendingUp, href: "/admin/cars" },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Дашборд</h1>
          <p className="text-muted-foreground text-sm">Обзор Easy Motors</p>
        </div>
        <Button asChild>
          <Link href="/admin/cars/new">
            <Plus className="w-4 h-4" />
            Добавить авто
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors group"
          >
            <div className="flex items-center justify-between mb-3">
              <s.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <p className="text-3xl font-bold">{s.value}</p>
            <p className="text-muted-foreground text-sm mt-1">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="font-semibold mb-4">Быстрые действия</h2>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <Link href="/admin/cars/new">
              <Car className="w-4 h-4" />
              Добавить автомобиль
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/applications">
              <FileText className="w-4 h-4" />
              Просмотр заявок
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/" target="_blank">
              Открыть сайт
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
