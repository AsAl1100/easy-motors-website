"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CarCard from "@/components/catalog/CarCard";
import { DEMO_CARS } from "@/lib/data";
import { useState, useEffect } from "react";
import type { Car } from "@/types";

export default function PopularCars() {
  const [featured, setFeatured] = useState<Car[]>([]);

  useEffect(() => {
    fetch("/api/cars?featured=true")
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && d.length && setFeatured(d.slice(0, 6)))
      .catch(() => {});
  }, []);

  return (
    <section className="py-24 bg-card/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              Каталог
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3">
              Популярные <span className="text-gradient-red">автомобили</span>
            </h2>
          </div>
          <Button asChild variant="outline" className="self-start md:self-auto">
            <Link href="/catalog">
              Весь каталог
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((car, i) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <CarCard car={car} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
