# Инструкция: Как опубликовать Easy Motors на Vercel

## Что тебе понадобится

- Аккаунт GitHub (бесплатно)
- Аккаунт Vercel (бесплатно)
- 15–30 минут времени

---

## Шаг 1 — Загрузи проект на GitHub

### Если GitHub Desktop установлен:
1. Открой **GitHub Desktop**
2. **File → Add Local Repository**
3. Выбери папку `C:\Users\admin\Documents\avtosalon_site`
4. Нажми **Publish repository**
5. Дай имя: `easy-motors` → **Publish**

### Если через командную строку:
```bash
cd C:\Users\admin\Documents\avtosalon_site

git init
git add .
git commit -m "Initial commit — Easy Motors"
git branch -M main
git remote add origin https://github.com/ВАШ_ЛОГИН/easy-motors.git
git push -u origin main
```

---

## Шаг 2 — Зарегистрируйся на Vercel

1. Зайди на **vercel.com**
2. Нажми **Sign Up**
3. Выбери **Continue with GitHub**
4. Авторизуй Vercel в GitHub

---

## Шаг 3 — Создай проект на Vercel

1. На главной странице Vercel нажми **Add New → Project**
2. Найди репозиторий `easy-motors` и нажми **Import**
3. Настройки оставь по умолчанию (Vercel сам определит Next.js)
4. Перед деплоем нажми **Environment Variables** и добавь переменные (см. ниже)
5. Нажми **Deploy**

---

## Шаг 4 — Добавь переменные окружения

В разделе **Environment Variables** добавь:

| Переменная | Значение | Описание |
|-----------|---------|----------|
| `NEXT_PUBLIC_SITE_URL` | `https://easy-motors.vercel.app` | URL сайта |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `77072702823` | Номер WhatsApp |
| `TELEGRAM_BOT_TOKEN` | `твой_токен` | Токен бота Telegram |
| `TELEGRAM_CHAT_ID` | `твой_chat_id` | ID чата для уведомлений |
| `ANTHROPIC_API_KEY` | `sk-ant-...` | Ключ AI-консультанта |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` | URL Supabase (если используешь) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` | Ключ Supabase (если используешь) |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` | Service key Supabase (если используешь) |

> ⚠️ Без Supabase и Anthropic сайт всё равно работает — просто без AI-чата и базы данных.

---

## Шаг 5 — Первый деплой

После нажатия Deploy Vercel автоматически:
1. Скачает код с GitHub
2. Установит зависимости (`npm install --legacy-peer-deps`)
3. Соберёт проект (`npm run build`)
4. Опубликует на адресе типа `easy-motors.vercel.app`

Время деплоя: **2–4 минуты**.

---

## Шаг 6 — Подключи свой домен (по желанию)

1. В Vercel перейди в **Settings → Domains**
2. Нажми **Add Domain**
3. Введи свой домен, например `easy-motors.kz`
4. Vercel покажет DNS-записи — добавь их в панели своего регистратора домена
5. Через 10–30 минут домен заработает

---

## Шаг 7 — Автоматические обновления

После любого `git push` в GitHub — Vercel автоматически пересобирает и публикует новую версию.

```bash
# Изменил файлы → загружай так:
git add .
git commit -m "Обновил список автомобилей"
git push
# Через 2 минуты сайт обновится автоматически
```

---

## Как настроить Google Sheets CRM (рекомендуется)

Каждая новая заявка будет автоматически появляться как строка в Google Таблице.

### Шаг 1 — Создай таблицу Google Sheets

1. Зайди на **sheets.google.com** → создай новую таблицу
2. Скопируй ID из адресной строки:
   `https://docs.google.com/spreadsheets/d/**ВОТ_ЭТО**/edit`
3. Сохрани ID — это `GOOGLE_SHEET_ID`

### Шаг 2 — Создай сервисный аккаунт Google

1. Зайди на **console.cloud.google.com**
2. Создай новый проект (или выбери существующий)
3. Включи **Google Sheets API**:
   - Слева: **APIs & Services → Library**
   - Найди "Google Sheets API" → **Enable**
4. Создай Service Account:
   - **APIs & Services → Credentials → Create Credentials → Service Account**
   - Название: `easy-motors-bot`
   - Нажми **Create and Continue → Done**
5. Открой созданный Service Account → вкладка **Keys**
6. **Add Key → Create new key → JSON**
7. Скачается файл JSON — открой его

### Шаг 3 — Достань данные из JSON файла

В скачанном JSON найди:
```json
{
  "client_email": "easy-motors-bot@your-project.iam.gserviceaccount.com",  ← это GOOGLE_SERVICE_ACCOUNT_EMAIL
  "private_key": "-----BEGIN RSA PRIVATE KEY-----\n..."                     ← это GOOGLE_PRIVATE_KEY
}
```

### Шаг 4 — Дай сервисному аккаунту доступ к таблице

1. Открой свою Google Таблицу
2. Нажми **Поделиться** (Share) в правом верхнем углу
3. Вставь `client_email` из JSON (например `easy-motors-bot@...iam.gserviceaccount.com`)
4. Выбери роль **Редактор** → **Отправить**

### Шаг 5 — Добавь в Vercel

| Переменная | Значение |
|-----------|---------|
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | `easy-motors-bot@...iam.gserviceaccount.com` |
| `GOOGLE_PRIVATE_KEY` | весь ключ из JSON, включая `-----BEGIN...` и `-----END...` |
| `GOOGLE_SHEET_ID` | ID таблицы из URL |

> ⚠️ При вставке `GOOGLE_PRIVATE_KEY` в Vercel — вставляй как есть, с `\n` внутри.
> Vercel автоматически обработает переносы строк.

### Результат

После настройки каждая заявка с сайта автоматически появится в таблице:

| Дата | Тип | Имя | Телефон | Автомобиль | Взнос | Срок | Сообщение | Статус | ID |
|------|-----|-----|---------|-----------|-------|------|-----------|--------|----|
| 06.06.2026 15:30 | Кредит | Асылбек | +7 707... | Toyota Camry | 1 500 000 | 60 мес | ... | Новая | uuid |

---

## Как получить Telegram Bot Token

1. Открой Telegram → найди **@BotFather**
2. Напиши `/newbot`
3. Введи название: `Easy Motors Bot`
4. Введи username: `EasyMotorsKzBot`
5. Скопируй полученный токен → вставь в `TELEGRAM_BOT_TOKEN`

**Получить TELEGRAM_CHAT_ID:**
1. Добавь бота в свою группу или напиши ему лично
2. Открой в браузере: `https://api.telegram.org/bot{ТОКЕН}/getUpdates`
3. Найди `"chat":{"id":...}` — это и есть твой chat_id

---

## Как настроить Supabase (необязательно)

Без Supabase сайт работает на демо-данных.
Supabase нужен для:
- Хранения реальных автомобилей (добавленных через админку)
- Хранения заявок клиентов

1. Зайди на **supabase.com** → создай проект
2. Перейди в **SQL Editor** → выполни `supabase/schema.sql`
3. Затем выполни `supabase/seed.sql` (демо-данные)
4. В **Settings → API** скопируй URL и ключи
5. Добавь их в Vercel Environment Variables

---

## Итог — после публикации у тебя будет

- ✅ Сайт доступен в интернете 24/7
- ✅ Автоматический HTTPS (бесплатно)
- ✅ Автообновление при каждом git push
- ✅ Уведомления о заявках в Telegram
- ✅ Бесплатный хостинг (Vercel Free — 100 GB трафика/мес)

---

## Поддержка

Если что-то не работает — проверь вкладку **Deployments** в Vercel.
Там видно логи ошибок.
