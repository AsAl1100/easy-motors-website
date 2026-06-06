"use client";

import { useState, useCallback } from "react";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  BODY_TYPES,
  FUEL_TYPES,
  TRANSMISSIONS,
  CAR_BRANDS,
} from "@/lib/constants";
import type { CatalogFilters as FiltersType } from "@/types";

interface Props {
  filters: FiltersType;
  onChange: (filters: FiltersType) => void;
}

const YEARS = Array.from({ length: 10 }, (_, i) => (2024 - i).toString());
const SORT_OPTIONS = [
  { value: "price_asc", label: "Цена: по возрастанию" },
  { value: "price_desc", label: "Цена: по убыванию" },
  { value: "year_desc", label: "Год: новые сначала" },
  { value: "year_asc", label: "Год: старые сначала" },
];

export default function CatalogFilters({ filters, onChange }: Props) {
  const set = useCallback(
    (key: keyof FiltersType, value: string | undefined) => {
      onChange({ ...filters, [key]: value || undefined });
    },
    [filters, onChange]
  );

  const reset = () => onChange({});
  const hasActive = Object.values(filters).some(Boolean);

  const SelectFilter = ({
    label,
    field,
    options,
  }: {
    label: string;
    field: keyof FiltersType;
    options: string[];
  }) => (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground uppercase tracking-wider">{label}</Label>
      <Select
        value={(filters[field] as string) ?? ""}
        onValueChange={(v) => set(field, v === "all" ? undefined : v)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Все" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все</SelectItem>
          {options.map((o) => (
            <SelectItem key={o} value={o}>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-xl p-5 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold">
          <Filter className="w-4 h-4 text-primary" />
          Фильтры
        </div>
        {hasActive && (
          <Button
            variant="ghost"
            size="sm"
            onClick={reset}
            className="text-xs text-muted-foreground h-7 px-2"
          >
            <X className="w-3 h-3 mr-1" />
            Сбросить
          </Button>
        )}
      </div>

      <Separator />

      {/* Sort */}
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground uppercase tracking-wider">Сортировка</Label>
        <Select
          value={filters.sort ?? ""}
          onValueChange={(v) => set("sort", v === "default" ? undefined : (v as FiltersType["sort"]))}
        >
          <SelectTrigger>
            <SelectValue placeholder="По умолчанию" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">По умолчанию</SelectItem>
            {SORT_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <SelectFilter label="Марка" field="brand" options={CAR_BRANDS} />
      <SelectFilter label="Тип кузова" field="body_type" options={BODY_TYPES} />
      <SelectFilter label="Топливо" field="fuel_type" options={FUEL_TYPES} />
      <SelectFilter label="Коробка передач" field="transmission" options={TRANSMISSIONS} />

      {/* Year */}
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground uppercase tracking-wider">Год от</Label>
          <Select
            value={filters.year_from?.toString() ?? ""}
            onValueChange={(v) =>
              onChange({ ...filters, year_from: v === "any" ? undefined : parseInt(v) })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Любой" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Любой</SelectItem>
              {YEARS.map((y) => (
                <SelectItem key={y} value={y}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground uppercase tracking-wider">Год до</Label>
          <Select
            value={filters.year_to?.toString() ?? ""}
            onValueChange={(v) =>
              onChange({ ...filters, year_to: v === "any" ? undefined : parseInt(v) })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Любой" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Любой</SelectItem>
              {YEARS.map((y) => (
                <SelectItem key={y} value={y}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
