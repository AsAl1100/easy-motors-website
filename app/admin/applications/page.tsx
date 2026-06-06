"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import type { Application, ApplicationStatus } from "@/types";

const STATUS_LABELS: Record<ApplicationStatus, string> = {
  new: "Новая",
  in_progress: "В работе",
  completed: "Завершена",
  cancelled: "Отменена",
};

const TYPE_LABELS: Record<string, string> = {
  car: "На авто",
  credit: "На кредит",
  selection: "Подбор",
  callback: "Звонок",
};

const STATUS_VARIANTS: Record<ApplicationStatus, "outline" | "new" | "green" | "secondary"> = {
  new: "new",
  in_progress: "outline",
  completed: "green",
  cancelled: "secondary",
};

export default function AdminApplicationsPage() {
  const { toast } = useToast();
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/applications")
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && setApps(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id: string, status: ApplicationStatus) => {
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      await supabase.from("applications").update({ status }).eq("id", id);
      setApps((a) => a.map((app) => (app.id === id ? { ...app, status } : app)));
      toast({ variant: "success", title: "Статус обновлён" });
    } catch {
      toast({ variant: "destructive", title: "Ошибка" });
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Заявки</h1>
        <p className="text-muted-foreground text-sm">{apps.length} заявок всего</p>
      </div>

      {loading ? (
        <div className="text-muted-foreground text-center py-16">Загрузка...</div>
      ) : apps.length === 0 ? (
        <div className="text-muted-foreground text-center py-16">
          <p className="text-4xl mb-3">📋</p>
          <p>Заявок пока нет</p>
          <p className="text-sm mt-1">Они появятся здесь после первых обращений</p>
        </div>
      ) : (
        <div className="space-y-3">
          {apps.map((app) => (
            <div key={app.id} className="bg-card border border-border rounded-xl p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge variant="outline">{TYPE_LABELS[app.type] ?? app.type}</Badge>
                    <Badge variant={STATUS_VARIANTS[app.status]}>
                      {STATUS_LABELS[app.status]}
                    </Badge>
                  </div>
                  <p className="font-semibold">{app.name}</p>
                  <a
                    href={`tel:${app.phone}`}
                    className="text-primary text-sm hover:underline"
                  >
                    {app.phone}
                  </a>
                  {app.car_name && (
                    <p className="text-sm text-muted-foreground mt-1">🚗 {app.car_name}</p>
                  )}
                  {app.message && (
                    <p className="text-sm text-muted-foreground mt-1">💬 {app.message}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(app.created_at).toLocaleString("ru-KZ")}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Select
                    value={app.status}
                    onValueChange={(v) => updateStatus(app.id, v as ApplicationStatus)}
                  >
                    <SelectTrigger className="w-36 h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(STATUS_LABELS).map(([v, l]) => (
                        <SelectItem key={v} value={v} className="text-xs">{l}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
