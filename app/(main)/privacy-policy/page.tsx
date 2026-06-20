import type { Metadata } from "next";
import { SITE_NAME, COMPANY_EMAIL, COMPANY_PHONE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Политика конфиденциальности | ${SITE_NAME}`,
  description: "Политика конфиденциальности Easy Motors — как мы собираем, используем и храним ваши данные.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="bg-card/30 border-b border-border py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Политика <span className="text-gradient-red">конфиденциальности</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            {SITE_NAME} — защита персональных данных наших клиентов
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground leading-relaxed">
          <p>
            Настоящая политика конфиденциальности описывает, как {SITE_NAME} собирает,
            использует и защищает персональные данные, которые вы предоставляете при
            заполнении форм на сайте, в рекламных объявлениях (включая лид-формы в Instagram
            и Facebook) или при обращении к нам напрямую.
          </p>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">Какие данные мы собираем</h2>
            <p>Имя, номер телефона, адрес электронной почты, а также информация об интересующем автомобиле и бюджете покупки.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">Как мы используем данные</h2>
            <p>
              Полученные данные используются исключительно для связи с вами по вопросам
              подбора автомобиля, консультации и оформления заявки. Мы не передаём ваши
              данные третьим лицам и не используем их для иных целей без вашего согласия.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">Хранение данных</h2>
            <p>Данные хранятся в защищённой базе данных и доступны только сотрудникам {SITE_NAME}, ответственным за обработку заявок.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">Ваши права</h2>
            <p>Вы можете запросить удаление или изменение своих данных, написав нам на {COMPANY_EMAIL} или позвонив по номеру {COMPANY_PHONE}.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">Контакты</h2>
            <p>По всем вопросам, связанным с обработкой персональных данных, обращайтесь: {COMPANY_EMAIL}, {COMPANY_PHONE}.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
