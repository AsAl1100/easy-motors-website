"use client";

import { motion } from "framer-motion";
import { Shield, Zap, CreditCard, Headphones, Star, TrendingDown } from "lucide-react";

const advantages = [
  {
    icon: Shield,
    title: "Гарантия",
    description: "Все автомобили с заводской гарантией производителя и юридически чистой историей.",
  },
  {
    icon: Zap,
    title: "Быстрое оформление",
    description: "Оформим документы за 1 день. Минимум бумаг, максимум скорости.",
  },
  {
    icon: CreditCard,
    title: "Кредит без лишних хлопот",
    description: "Кредит от ведущих банков Казахстана. Решение за 15 минут, без первоначального взноса.",
  },
  {
    icon: Headphones,
    title: "Поддержка 24/7",
    description: "Наши менеджеры всегда на связи в WhatsApp, Telegram и по телефону.",
  },
  {
    icon: Star,
    title: "Честные цены",
    description: "Цены без скрытых комиссий. То, что видите в каталоге — то и платите.",
  },
  {
    icon: TrendingDown,
    title: "Выгодные условия",
    description: "Специальные предложения, скидки и бонусы для постоянных клиентов.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AdvantagesSection() {
  return (
    <section id="advantages" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Почему Easy Motors
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Преимущества, которые{" "}
            <span className="text-gradient-red">говорят сами</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Мы не просто продаём автомобили — мы помогаем вам сделать правильный выбор и сопровождаем на каждом шагу.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {advantages.map((adv) => (
            <motion.div
              key={adv.title}
              variants={item}
              className="group p-6 rounded-xl border border-border bg-card hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <adv.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{adv.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{adv.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
