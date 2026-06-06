"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Gauge, Fuel, Settings2, MessageCircle, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice, getCarWhatsAppMessage, getWhatsAppLink } from "@/lib/utils";
import { WHATSAPP_PHONE } from "@/lib/constants";
import type { Car } from "@/types";

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const mainImage = car.images?.find((img) => img.is_main) ?? car.images?.[0];
  const displayName = `${car.brand} ${car.model} ${car.year}`;
  const waMessage = getCarWhatsAppMessage(displayName, car.price);
  const waLink = getWhatsAppLink(WHATSAPP_PHONE, waMessage);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        {mainImage ? (
          <Image
            src={mainImage.url}
            alt={displayName}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            Нет фото
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {car.is_new && (
            <Badge variant="new" className="text-xs">Новый</Badge>
          )}
          {car.mileage === 0 && (
            <Badge variant="green" className="text-xs">0 км</Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3">
          <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
            {car.brand} {car.model}
          </h3>
          <p className="text-muted-foreground text-sm">{car.year} год</p>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex flex-col items-center gap-1 py-2 px-1 rounded-lg bg-secondary text-center">
            <Gauge className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {car.mileage === 0 ? "Новый" : `${car.mileage.toLocaleString()} км`}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 py-2 px-1 rounded-lg bg-secondary text-center">
            <Fuel className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{car.engine_volume}L</span>
          </div>
          <div className="flex flex-col items-center gap-1 py-2 px-1 rounded-lg bg-secondary text-center">
            <Settings2 className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {car.transmission === "Автомат" ? "АКП" :
               car.transmission === "Механика" ? "МКП" : car.transmission}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          <p className="text-2xl font-bold text-primary">{formatPrice(car.price)}</p>
          <p className="text-xs text-muted-foreground">или от {Math.round(car.price * 0.8 / (7 * 12 * 10000) * 10000).toLocaleString()} ₸/мес.</p>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2">
          <Button asChild size="sm" className="col-span-2">
            <Link href={`/catalog/${car.slug}`}>Подробнее</Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link href={`/calculator?price=${car.price}&name=${encodeURIComponent(displayName)}`}>
              <Calculator className="w-4 h-4" />
              Кредит
            </Link>
          </Button>
          <Button asChild size="sm" variant="whatsapp">
            <a href={waLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
