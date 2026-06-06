// ===== ДАННЫЕ КОМПАНИИ — изменяй только здесь =====
export const COMPANY_PHONE: string = "+7 707 270 28 23";
export const WHATSAPP_PHONE: string = "77072702823"; // для wa.me/XXXXXXXXXX
export const COMPANY_ADDRESS: string = "ул. Жумекен Нажимеденова, 34/2П";
// Вставь ссылку 2GIS; если нет — оставь "#"
export const COMPANY_2GIS_URL: string = "https://2gis.kz/astana/firm/70000001103990031?m=71.499085%2C51.113414%2F16";
// Вставь ссылку Instagram; если нет — оставь "#"
export const COMPANY_INSTAGRAM: string = "https://www.instagram.com/easy_motors01?igsh=dnJrdHZiZ21yaWxo";
export const COMPANY_EMAIL: string = "info@easy-motors.kz";
export const WORKING_HOURS: string = "Пн–Вс: 9:00–20:00";
// ====================================================

// Алиасы (для обратной совместимости внутри компонентов)
export const PHONE_NUMBER = COMPANY_PHONE;
export const WHATSAPP_NUMBER = WHATSAPP_PHONE;
export const ADDRESS = COMPANY_ADDRESS;
export const EMAIL = COMPANY_EMAIL;

export const SITE_NAME = "Easy Motors";
export const SITE_DESCRIPTION =
  "Автомобили в наличии и под заказ в Казахстане. Подберем автомобиль под ваш бюджет.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://easy-motors.kz";

export const BODY_TYPES = [
  "Седан",
  "Кроссовер",
  "SUV",
  "Универсал",
  "Хэтчбек",
  "Купе",
  "Минивэн",
];

export const FUEL_TYPES = ["Бензин", "Дизель", "Гибрид", "Электро", "Газ/Бензин"];

export const TRANSMISSIONS = ["Автомат", "Механика", "Робот", "Вариатор"];

export const DRIVE_TYPES = ["Передний", "Задний", "Полный (4WD)", "Полный (AWD)"];

export const CAR_BRANDS = [
  "Toyota",
  "Hyundai",
  "Kia",
  "Changan",
  "Chevrolet",
  "Geely",
  "BYD",
  "Lexus",
  "Mercedes-Benz",
  "BMW",
];

export const CREDIT_RATES = {
  min: 12,
  max: 28,
  default: 18,
};

export const CREDIT_TERMS = [1, 2, 3, 4, 5, 6, 7];

export const NAV_LINKS = [
  { href: "/catalog", label: "Каталог" },
  { href: "/calculator", label: "Калькулятор" },
  { href: "/#advantages", label: "О нас" },
  { href: "/#contacts", label: "Контакты" },
];
