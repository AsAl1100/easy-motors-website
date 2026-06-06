"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Можно ли купить автомобиль в кредит?",
    a: "Да, мы работаем с 10+ банками Казахстана. Оформление займёт от 1 дня. Первоначальный взнос от 10%, срок до 7 лет.",
  },
  {
    q: "Есть ли гарантия на автомобили?",
    a: "Все новые автомобили продаются с официальной заводской гарантией производителя. Срок гарантии зависит от марки и составляет обычно 3-5 лет.",
  },
  {
    q: "Можно ли заказать автомобиль под заказ?",
    a: "Да, мы принимаем заказы на автомобили, которых нет в наличии. Срок ожидания — от 2 до 8 недель в зависимости от модели и комплектации.",
  },
  {
    q: "Можно ли приехать на тест-драйв?",
    a: "Конечно! Запишитесь на тест-драйв через WhatsApp или по телефону, и мы выберем удобное время для вас.",
  },
  {
    q: "Какие документы нужны для покупки?",
    a: "Для покупки за наличный расчёт нужен только удостоверение личности. Для кредита — удостоверение личности и ИИН. Справки о доходах не обязательны.",
  },
  {
    q: "Помогаете ли с регистрацией и страховкой?",
    a: "Да, мы оказываем помощь в постановке на учёт в ЦОН и помогаем оформить страховку ОГПО и КАСКО.",
  },
  {
    q: "Можно ли сдать старый автомобиль в зачёт?",
    a: "Да, мы принимаем автомобили в трейд-ин. Оценка производится бесплатно, стоимость зачисляется в счёт покупки нового авто.",
  },
];

export default function FAQSection() {
  return (
    <section className="py-24 bg-card/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Часто задаваемые <span className="text-gradient-red">вопросы</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-card rounded-xl border border-border px-6 data-[state=open]:border-primary/30"
              >
                <AccordionTrigger className="text-left font-medium">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
