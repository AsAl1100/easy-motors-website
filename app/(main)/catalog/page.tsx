"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import CarCard from "@/components/catalog/CarCard";
import CatalogFilters from "@/components/catalog/CatalogFilters";
import SkeletonCard from "@/components/catalog/SkeletonCard";
import { DEMO_CARS } from "@/lib/data";
import type { CatalogFilters as FiltersType, Car } from "@/types";

export default function CatalogPage() {
  const [allCars, setAllCars] = useState<Car[]>([]);
  const [filters, setFilters] = useState<FiltersType>({});
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetch("/api/cars")
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && d.length && setAllCars(d))
      .catch(() => {});
  }, []);

  const filtered = useMemo(() => {
    let cars = [...allCars];

    if (filters.brand) cars = cars.filter((c) => c.brand === filters.brand);
    if (filters.body_type) cars = cars.filter((c) => c.body_type === filters.body_type);
    if (filters.fuel_type) cars = cars.filter((c) => c.fuel_type === filters.fuel_type);
    if (filters.transmission) cars = cars.filter((c) => c.transmission === filters.transmission);
    if (filters.year_from) cars = cars.filter((c) => c.year >= filters.year_from!);
    if (filters.year_to) cars = cars.filter((c) => c.year <= filters.year_to!);
    if (filters.price_from) cars = cars.filter((c) => c.price >= filters.price_from!);
    if (filters.price_to) cars = cars.filter((c) => c.price <= filters.price_to!);

    if (filters.sort === "price_asc") cars.sort((a, b) => a.price - b.price);
    else if (filters.sort === "price_desc") cars.sort((a, b) => b.price - a.price);
    else if (filters.sort === "year_desc") cars.sort((a, b) => b.year - a.year);
    else if (filters.sort === "year_asc") cars.sort((a, b) => a.year - b.year);

    return cars;
  }, [filters, allCars]);

  return (
    <div className="pt-20 min-h-screen">
      {/* Page Header */}
      <div className="bg-card/30 border-b border-border py-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              Каталог <span className="text-gradient-red">автомобилей</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              {filtered.length} автомобил{filtered.length === 1 ? "ь" : filtered.length < 5 ? "я" : "ей"} в наличии
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters — Desktop */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24">
              <CatalogFilters filters={filters} onChange={setFilters} />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Mobile filter toggle */}
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Фильтры
              </Button>
              <span className="text-sm text-muted-foreground">
                {filtered.length} авто
              </span>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="mb-6 lg:hidden">
                <CatalogFilters filters={filters} onChange={setFilters} />
              </div>
            )}

            {/* Cars Grid */}
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="text-6xl mb-4">🚗</div>
                <h3 className="text-xl font-semibold mb-2">Ничего не найдено</h3>
                <p className="text-muted-foreground mb-6">
                  Попробуйте изменить параметры фильтров
                </p>
                <Button onClick={() => setFilters({})}>Сбросить фильтры</Button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((car, i) => (
                  <motion.div
                    key={car.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <CarCard car={car} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
