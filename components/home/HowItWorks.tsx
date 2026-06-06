"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Выбираете автомобиль",
    description: "Просматриваете наш каталог онлайн или приезжаете в салон. Консультант помогает подобрать авто под ваши запросы.",
  },
  {
    number: "02",
    title: "Рассчитываете кредит",
    description: "Используете наш калькулятор или оставляете заявку. Менеджер подбирает лучшие условия от банков-партнёров.",
  },
  {
    number: "03",
    title: "Оформляете документы",
    description: "Подписываете договор купли-продажи. Помогаем с регистрацией, страховкой и техосмотром.",
  },
  {
    number: "04",
    title: "Забираете автомобиль",
    description: "Забираете ключи и уезжаете на новом автомобиле. Мы остаёмся на связи по всем вопросам.",
  },
];

export default function HowItWorks() {
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
            Процесс
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Как проходит <span className="text-gradient-red">покупка</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Всего 4 простых шага — и вы за рулём своего нового автомобиля.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connection line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative flex flex-col items-center text-center p-6"
            >
              <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mb-5 relative z-10">
                <span className="text-2xl font-bold text-primary">{step.number}</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
