# Easy Motors — Сайт автосалона

Премиальный сайт автосалона на Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Supabase и Anthropic AI.

## Технологии

- **Next.js 15** (App Router, Server Components)
- **TypeScript** (строгая типизация)
- **Tailwind CSS** + **shadcn/ui** — стилизация
- **Framer Motion** — анимации
- **Supabase** — база данных, хранилище файлов
- **Telegram Bot API** — уведомления о заявках
- **Anthropic AI (claude-haiku-4-5)** — AI-консультант
- **WhatsApp** — кнопки связи

---

## Быстрый старт

### 1. Установка зависимостей

```bash
npm install
```

### 2. Переменные окружения

Скопируй `.env.example` в `.env.local` и заполни:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

TELEGRAM_BOT_TOKEN=123456:ABC-DEF...
TELEGRAM_CHAT_ID=-100123456789

ADMIN_PASSWORD=your-secure-password

ANTHROPIC_API_KEY=sk-ant-...

NEXT_PUBLIC_SITE_URL=https://easy-motors.kz
NEXT_PUBLIC_WHATSAPP_NUMBER=77771234567
```

### 3. Настройка Supabase

1. Создай проект на [supabase.com](https://supabase.com)
2. Перейди в **SQL Editor**
3. Выполни `supabase/schema.sql` — создаёт таблицы и политики
4. Выполни `supabase/seed.sql` — добавляет 12 демо-автомобилей

### 4. Запуск в режиме разработки

```bash
npm run dev
```

Сайт откроется по адресу: **http://localhost:3000**

---

## Страницы

| URL | Описание |
|-----|----------|
| `/` | Главная страница |
| `/catalog` | Каталог автомобилей с фильтрами |
| `/catalog/[slug]` | Страница автомобиля с галереей |
| `/calculator` | Кредитный калькулятор |
| `/admin` | Дашборд админ-панели |
| `/admin/cars` | Управление автомобилями |
| `/admin/cars/new` | Добавление нового авто |
| `/admin/applications` | Заявки от клиентов |

---

## Функции

### Каталог
- Фильтрация по марке, типу кузова, топливу, коробке, году, цене
- Сортировка по цене и году
- Адаптивная сетка карточек
- Skeleton-загрузка

### Кредитный калькулятор
- Слайдеры для цены, взноса, ставки
- Выбор срока 1–7 лет
- Мгновенный пересчёт ежемесячного платежа
- Отправка в WhatsApp

### Заявки
- Форма на конкретный автомобиль
- Сохранение в Supabase
- Уведомление в Telegram
- Toast-уведомление клиенту

### AI-консультант
- Плавающий чат-виджет (нижний правый угол)
- Подбор авто по бюджету и требованиям
- Расчёт ежемесячного платежа
- Ответы на основе реального каталога

### WhatsApp
- Floating-кнопка на всех страницах
- Умные сообщения с данными авто
- Кнопки на карточках и страницах авто

---

## Деплой на Vercel

### 1. Загрузи проект на GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/easy-motors.git
git push -u origin main
```

### 2. Подключи к Vercel

1. Зайди на [vercel.com](https://vercel.com)
2. **New Project** → выбери репозиторий
3. **Framework Preset**: Next.js (определится автоматически)
4. Добавь все переменные из `.env.local` в **Environment Variables**
5. Нажми **Deploy**

### 3. Домен

В настройках проекта на Vercel добавь свой домен.
Обнови `NEXT_PUBLIC_SITE_URL` на реальный URL после деплоя.

---

## Структура проекта

```
easy-motors/
├── app/
│   ├── (main)/           # Основной layout с шапкой/подвалом
│   │   ├── page.tsx      # Главная
│   │   ├── catalog/      # Каталог + карточки авто
│   │   └── calculator/   # Кредитный калькулятор
│   ├── admin/            # Админ-панель
│   ├── api/              # API-роуты
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Глобальные стили
├── components/
│   ├── ai/               # AI-чат
│   ├── calculator/       # Калькулятор
│   ├── car/              # Компоненты страницы авто
│   ├── catalog/          # Карточки и фильтры
│   ├── forms/            # Формы заявок
│   ├── home/             # Секции главной страницы
│   ├── layout/           # Header, Footer, WhatsApp
│   └── ui/               # shadcn/ui базовые компоненты
├── lib/
│   ├── supabase/         # Supabase клиенты
│   ├── data.ts           # Демо-данные (12 авто)
│   ├── constants.ts      # Константы
│   ├── telegram.ts       # Telegram уведомления
│   └── utils.ts          # Утилиты
├── supabase/
│   ├── schema.sql        # Схема БД
│   └── seed.sql          # Демо-данные для БД
├── types/
│   └── index.ts          # TypeScript типы
└── .env.example          # Пример переменных окружения
```

---

## Настройка Telegram-бота

1. Открой [@BotFather](https://t.me/BotFather) → `/newbot`
2. Получи `TELEGRAM_BOT_TOKEN`
3. Добавь бота в свой чат/группу и сделай его администратором
4. Получи `TELEGRAM_CHAT_ID`:
   - Для личного чата: напиши боту `/start`, зайди на `https://api.telegram.org/bot{TOKEN}/getUpdates`
   - Для группы: добавь бота, отправь любое сообщение и получи `chat.id` из того же URL

---

## Кастомизация

### Контакты
Отредактируй `lib/constants.ts`:
```ts
export const PHONE_NUMBER = "+7 (XXX) XXX-XX-XX";
export const WHATSAPP_NUMBER = "7XXXXXXXXXX";
export const ADDRESS = "г. Алматы, ул. ...";
```

### Цвета акцента
В `app/globals.css` измени:
```css
--primary: 348 83% 47%;  /* красный */
/* Для синего: 221 83% 53% */
```

### Добавление авто
- Без БД: редактируй `lib/data.ts`
- С Supabase: добавляй через `/admin/cars/new` или напрямую в БД

---

## Лицензия

MIT
