"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Clock, MessageCircle, Instagram, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  PHONE_NUMBER,
  COMPANY_ADDRESS,
  COMPANY_2GIS_URL,
  COMPANY_INSTAGRAM,
  WORKING_HOURS,
  WHATSAPP_PHONE,
} from "@/lib/constants";

export default function ContactSection() {
  const waLink = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent("Здравствуйте! Хочу записаться на консультацию.")}`;

  const contacts = [
    {
      icon: Phone,
      label: "Телефон",
      value: PHONE_NUMBER,
      href: `tel:${PHONE_NUMBER}`,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: PHONE_NUMBER,
      href: waLink,
      external: true,
    },
    {
      icon: MapPin,
      label: "Адрес",
      value: COMPANY_ADDRESS,
      href: COMPANY_2GIS_URL !== "#" ? COMPANY_2GIS_URL : undefined,
      external: true,
    },
    {
      icon: Clock,
      label: "Режим работы",
      value: WORKING_HOURS,
      href: undefined,
    },
    ...(COMPANY_INSTAGRAM !== "#"
      ? [{ icon: Instagram, label: "Instagram", value: "@easymotors", href: COMPANY_INSTAGRAM, external: true }]
      : []),
  ];

  return (
    <section id="contacts" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Контакты
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Свяжитесь <span className="text-gradient-yellow">с нами</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Мы всегда готовы ответить на ваши вопросы и помочь с выбором автомобиля.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            {contacts.map((c) => {
              const Wrapper = c.href ? "a" : "div";
              return (
                <Wrapper
                  key={c.label}
                  {...(c.href
                    ? { href: c.href, target: c.external ? "_blank" : undefined, rel: "noopener noreferrer" }
                    : {})}
                  className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 group cursor-default"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <c.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{c.label}</p>
                    <p className="font-medium">{c.value}</p>
                  </div>
                </Wrapper>
              );
            })}

            {/* CTA Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button asChild size="lg" variant="whatsapp">
                <a href={waLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={`tel:${PHONE_NUMBER}`}>
                  <Phone className="w-5 h-5" />
                  Позвонить
                </a>
              </Button>
            </div>

            {/* 2GIS Button */}
            {COMPANY_2GIS_URL !== "#" && (
              <Button asChild size="lg" variant="outline" className="w-full">
                <a href={COMPANY_2GIS_URL} target="_blank" rel="noopener noreferrer">
                  <Navigation className="w-5 h-5" />
                  Открыть в 2GIS
                </a>
              </Button>
            )}
          </motion.div>

          {/* Map / Address card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col"
          >
            {/* Address hero */}
            <div className="flex-1 flex flex-col items-center justify-center p-10 text-center gap-6 min-h-64">
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Наш адрес</p>
                <p className="text-xl font-bold">{COMPANY_ADDRESS}</p>
                <p className="text-muted-foreground text-sm mt-2">г. Алматы, Казахстан</p>
              </div>
              {COMPANY_2GIS_URL !== "#" ? (
                <a
                  href={COMPANY_2GIS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  Маршрут в 2GIS
                </a>
              ) : (
                <p className="text-xs text-muted-foreground italic">
                  Ссылка на 2GIS будет добавлена
                </p>
              )}
            </div>

            {/* Bottom info strip */}
            <div className="border-t border-border grid grid-cols-2 divide-x divide-border">
              <div className="p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">Режим работы</p>
                <p className="text-sm font-semibold">{WORKING_HOURS}</p>
              </div>
              <div className="p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">Телефон</p>
                <a href={`tel:${PHONE_NUMBER}`} className="text-sm font-semibold text-primary hover:underline">
                  {PHONE_NUMBER}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
