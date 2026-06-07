"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Car, FileText, TrendingUp, Plus, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Car as CarType } from "@/types";

export default function AdminDashboard() {
  const [cars, setCars] = useState<CarType[]>([]);
  const [appCount, setAppCount] = useState(0);

  useEffect(() => {
    fetch("/api/cars")
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && setCars(d))
      .catch(() => {});

    fetch("/api/applications")
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && setAppCount(d.length))
      .catch(() => {});
  }, []);

  const available = cars.filter((c) => c.status === "available").length;
  const onOrder = cars.filter((c) => c.status === "on_order").length;

  const stats = [
    { label: "Всего авто", value: cars.length, icon: Car, href: "/admin/cars", color: "text-primary" },
    { label: "В наличии", value: available, icon: CheckCircle, href: "/admin/cars", color: "text-green-500" },
    { label: "Под заказ", value: onOrder, icon: Clock, href: "/admin/cars", color: "text-yellow-500" },
    { label: "Заявок", value: appCount, icon: FileText, href: "/admin/applications", color: "text-blue-500" },
    { label: "Активных", value: cars.filter((c) => c.is_active).length, icon: TrendingUp, href: "/admin/cars", color: "text-emerald-500" },
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
            <Plus className="w-4 h-4 mr-1" />
            Добавить авто
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors group"
          >
            <s.icon className={`w-5 h-5 mb-3 ${s.color} group-hover:scale-110 transition-transform`} />
            <p className="text-3xl font-bold">{s.value}</p>
            <p className="text-muted-foreground text-sm mt-1">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-semibold mb-4">Быстрые действия</h2>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link href="/admin/cars/new">
                <Car className="w-4 h-4 mr-1" />
                Добавить автомобиль
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/applications">
                <FileText className="w-4 h-4 mr-1" />
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

        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-semibold mb-4">Инструкция для владельца</h2>
          <ol className="text-sm text-muted-foreground space-y-2">
            <li>1. <strong className="text-foreground">Добавить авто</strong> — нажмите «Добавить автомобиль»</li>
            <li>2. <strong className="text-foreground">Изменить цену</strong> — перейдите в редактирование авто</li>
            <li>3. <strong className="text-foreground">Сменить статус</strong> — «В наличии / Под заказ / Продано»</li>
            <li>4. <strong className="text-foreground">Скрыть авто</strong> — кнопка «Активен» в списке</li>
            <li>5. <strong className="text-foreground">Добавить фото</strong> — URL или загрузка с телефона</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
