-- Easy Motors — Seed Data (12 cars)
-- Run AFTER schema.sql

INSERT INTO cars (slug, brand, model, year, price, mileage, body_type, fuel_type, transmission, engine_volume, engine_power, drive_type, color, description, is_new, is_active, is_featured)
VALUES
  ('toyota-camry-2023', 'Toyota', 'Camry', 2023, 18500000, 0, 'Седан', 'Бензин', 'Автомат', 2.5, 181, 'Передний', 'Белый перламутр', 'Toyota Camry — легендарный бизнес-седан с безупречной репутацией.', true, true, true),
  ('hyundai-tucson-2023', 'Hyundai', 'Tucson', 2023, 15200000, 0, 'Кроссовер', 'Бензин', 'Автомат', 2.0, 150, 'Передний', 'Серебристый', 'Hyundai Tucson нового поколения — смелый дизайн и передовые технологии.', true, true, true),
  ('kia-sportage-2023', 'Kia', 'Sportage', 2023, 14800000, 0, 'Кроссовер', 'Бензин', 'Автомат', 2.0, 150, 'Полный (AWD)', 'Чёрный', 'Kia Sportage — динамичный кроссовер с уникальным дизайном.', true, true, true),
  ('changan-cs55-plus-2023', 'Changan', 'CS55 Plus', 2023, 11500000, 0, 'Кроссовер', 'Бензин', 'Автомат', 1.5, 185, 'Передний', 'Синий', 'Changan CS55 Plus — стильный кроссовер по выгодной цене.', true, true, false),
  ('changan-uni-k-2023', 'Changan', 'UNI-K', 2023, 16800000, 0, 'SUV', 'Бензин', 'Автомат', 2.0, 228, 'Полный (AWD)', 'Графитовый', 'Changan UNI-K — флагманский кроссовер с премиальным дизайном.', true, true, true),
  ('chevrolet-cobalt-2023', 'Chevrolet', 'Cobalt', 2023, 7200000, 0, 'Седан', 'Бензин', 'Автомат', 1.5, 106, 'Передний', 'Белый', 'Chevrolet Cobalt — надёжный и доступный седан для всей семьи.', true, true, false),
  ('chevrolet-tracker-2023', 'Chevrolet', 'Tracker', 2023, 11000000, 0, 'Кроссовер', 'Бензин', 'Автомат', 1.2, 133, 'Передний', 'Красный', 'Chevrolet Tracker — компактный и динамичный городской кроссовер.', true, true, false),
  ('geely-monjaro-2023', 'Geely', 'Monjaro', 2023, 16200000, 0, 'SUV', 'Гибрид', 'Автомат', 2.0, 238, 'Полный (4WD)', 'Белый', 'Geely Monjaro — современный гибридный SUV с мощным двигателем.', true, true, true),
  ('byd-song-plus-2023', 'BYD', 'Song Plus', 2023, 14500000, 0, 'Кроссовер', 'Гибрид', 'Автомат', 1.5, 204, 'Передний', 'Синий', 'BYD Song Plus — инновационный гибридный кроссовер.', true, true, false),
  ('lexus-es-2023', 'Lexus', 'ES', 2023, 32000000, 0, 'Седан', 'Гибрид', 'Автомат', 2.5, 218, 'Передний', 'Тёмно-синий', 'Lexus ES — воплощение японской роскоши и надёжности.', true, true, true),
  ('mercedes-benz-e-class-2023', 'Mercedes-Benz', 'E-Class', 2023, 45000000, 0, 'Седан', 'Бензин', 'Автомат', 2.0, 258, 'Задний', 'Обсидиан чёрный', 'Mercedes-Benz E-Class — эталон бизнес-класса.', true, true, true),
  ('bmw-5-series-2023', 'BMW', '5 Series', 2023, 42000000, 0, 'Седан', 'Бензин', 'Автомат', 2.0, 245, 'Задний', 'Альпийский белый', 'BMW 5 Series — радость вождения и комфорт бизнес-класса.', true, true, true);

-- Insert images for each car
INSERT INTO car_images (car_id, url, is_main, sort_order)
SELECT id, 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=1200&q=85', true, 0
FROM cars WHERE slug = 'toyota-camry-2023';

INSERT INTO car_images (car_id, url, is_main, sort_order)
SELECT id, 'https://images.unsplash.com/photo-1633169408895-7f4c5b23bebb?w=1200&q=85', true, 0
FROM cars WHERE slug = 'hyundai-tucson-2023';

INSERT INTO car_images (car_id, url, is_main, sort_order)
SELECT id, 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=1200&q=85', true, 0
FROM cars WHERE slug = 'kia-sportage-2023';

INSERT INTO car_images (car_id, url, is_main, sort_order)
SELECT id, 'https://images.unsplash.com/photo-1571987502951-3cc390f9b0e1?w=1200&q=85', true, 0
FROM cars WHERE slug = 'changan-cs55-plus-2023';

INSERT INTO car_images (car_id, url, is_main, sort_order)
SELECT id, 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=85', true, 0
FROM cars WHERE slug = 'changan-uni-k-2023';

INSERT INTO car_images (car_id, url, is_main, sort_order)
SELECT id, 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200&q=85', true, 0
FROM cars WHERE slug = 'chevrolet-cobalt-2023';

INSERT INTO car_images (car_id, url, is_main, sort_order)
SELECT id, 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=85', true, 0
FROM cars WHERE slug = 'chevrolet-tracker-2023';

INSERT INTO car_images (car_id, url, is_main, sort_order)
SELECT id, 'https://images.unsplash.com/photo-1614162692292-7ac56d7f373e?w=1200&q=85', true, 0
FROM cars WHERE slug = 'geely-monjaro-2023';

INSERT INTO car_images (car_id, url, is_main, sort_order)
SELECT id, 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=85', true, 0
FROM cars WHERE slug = 'byd-song-plus-2023';

INSERT INTO car_images (car_id, url, is_main, sort_order)
SELECT id, 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=1200&q=85', true, 0
FROM cars WHERE slug = 'lexus-es-2023';

INSERT INTO car_images (car_id, url, is_main, sort_order)
SELECT id, 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=85', true, 0
FROM cars WHERE slug = 'mercedes-benz-e-class-2023';

INSERT INTO car_images (car_id, url, is_main, sort_order)
SELECT id, 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=85', true, 0
FROM cars WHERE slug = 'bmw-5-series-2023';

-- Default settings
INSERT INTO settings (key, value) VALUES
  ('whatsapp_number', '77771234567'),
  ('phone_number', '+7 (777) 123-45-67'),
  ('address', 'г. Алматы, ул. Розыбакиева, 44'),
  ('working_hours', 'Пн–Вс: 9:00–20:00')
ON CONFLICT (key) DO NOTHING;
