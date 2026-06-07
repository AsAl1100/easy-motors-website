-- Easy Motors — Seed Data (9 real cars from catalog)
-- Run AFTER schema.sql
-- NOTE: Delete old demo data first if needed:
-- DELETE FROM car_images; DELETE FROM cars;

INSERT INTO cars (slug, brand, model, year, price, mileage, body_type, fuel_type, transmission,
  engine_volume, engine_power, drive_type, color, description, status,
  seats, trunk_volume, fuel_consumption, top_speed, acceleration, ground_clearance,
  is_new, is_active, is_featured)
VALUES
  (
    'changan-x5-plus-2023', 'Changan', 'X5 Plus', 2023, 8000000, 0,
    'SUV', 'Бензин', 'Вариатор', 1.5, 147, 'Передний', 'Чёрный',
    'Changan X5 Plus — стильный и мощный SUV с турбированным двигателем 1.5T. Спортивный дизайн с красными акцентами, просторный салон с коричневой кожей и панорамный люк.',
    'available', 5, 440, 7.5, 185, 10.0, 185, true, true, true
  ),
  (
    'changan-cs55-plus-2023', 'Changan', 'CS55 Plus', 2023, 9800000, 0,
    'Кроссовер', 'Бензин', 'Робот', 1.5, 147, 'Передний', 'Белый',
    'Changan CS55 Plus — современный кроссовер с 7-ступенчатым роботом, широким экраном, коричневым кожаным салоном и богатым оснащением по доступной цене.',
    'available', 5, 450, 7.2, 190, 9.5, 185, true, true, true
  ),
  (
    'byd-destroyer-05-2023', 'BYD', 'Destroyer 05', 2023, 8100000, 0,
    'Седан', 'Гибрид', 'Вариатор', 1.5, 204, 'Передний', 'Серый',
    'BYD Destroyer 05 — инновационный гибридный (DM-i) седан с экономичным расходом 4.4л/100км. Современный интерьер, просторный багажник 450л и мощность системы 204 л.с.',
    'available', 5, 450, 4.4, 170, 7.3, 170, true, true, false
  ),
  (
    'changan-cs75-pro-2023', 'Changan', 'CS75 Pro', 2023, 10500000, 0,
    'SUV', 'Бензин', 'Автомат', 2.0, 233, 'Передний', 'Белый',
    'Changan CS75 Pro — мощный SUV с 2.0-литровым турбодвигателем 233 л.с. и 8-ступенчатым автоматом. Большой объём багажника 535л, роскошный салон с коричневой кожей.',
    'available', 5, 535, 8.5, 215, 7.9, 185, true, true, false
  ),
  (
    'changan-cs75-plus-2023', 'Changan', 'CS75 Plus', 2023, 11000000, 0,
    'SUV', 'Бензин', 'Автомат', 2.0, 233, 'Передний', 'Серый',
    'Changan CS75 Plus — топовый SUV с двигателем 2.0T 233 л.с., 8-ступенчатым автоматом и panoramic крышей. Оранжевый кожаный салон, два экрана, клиренс 185 мм.',
    'available', 5, 535, 8.5, 215, 7.9, 185, true, true, true
  ),
  (
    'changan-eado-plus-2023', 'Changan', 'Eado Plus', 2023, 7300000, 0,
    'Седан', 'Бензин', 'Вариатор', 1.6, 123, 'Передний', 'Белый',
    'Changan Eado Plus — элегантный седан с экономичным 1.6-литровым двигателем, вариатором и просторным салоном. Отличный выбор для ежедневных поездок.',
    'available', 5, 450, 6.2, 175, 11.5, 160, true, true, false
  ),
  (
    'changan-eado-2023', 'Changan', 'Eado', 2023, 7600000, 0,
    'Седан', 'Бензин', 'Робот', 1.5, 156, 'Передний', 'Белый',
    'Changan Eado — спортивный седан с турбодвигателем 1.5T 156 л.с., 7-ступенчатым роботом и стильным дизайном с красными акцентами. Панорамный люк, большой дисплей.',
    'available', 5, 450, 6.8, 185, 9.8, 160, true, true, false
  ),
  (
    'chevrolet-cobalt-2023', 'Chevrolet', 'Cobalt', 2023, 6600000, 0,
    'Седан', 'Бензин', 'Автомат', 1.5, 106, 'Задний', 'Белый',
    'Chevrolet Cobalt — надёжный и доступный седан с задним приводом. Вместительный багажник 540л, простой и практичный салон. Идеален для города и трассы.',
    'available', 5, 540, 7.5, 170, 13.0, 155, true, true, false
  ),
  (
    'deepal-s07-2023', 'Deepal', 'S07', 2023, 11700000, 0,
    'SUV', 'Гибрид', 'Вариатор', 1.5, 313, 'Передний', 'Белый',
    'Deepal S07 — флагманский электрический SUV с увеличенным запасом хода. Мощность системы 313 л.с., разгон 0-100 за 5.9с, футуристический дизайн и роскошный оранжевый салон.',
    'available', 5, 520, 5.5, 190, 5.9, 180, true, true, true
  );

-- Insert main images for each car
INSERT INTO car_images (car_id, url, is_main, sort_order)
SELECT id, 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=85', true, 0
FROM cars WHERE slug = 'changan-x5-plus-2023';

INSERT INTO car_images (car_id, url, is_main, sort_order)
SELECT id, 'https://images.unsplash.com/photo-1614162692292-7ac56d7f373e?w=1200&q=85', true, 0
FROM cars WHERE slug = 'changan-cs55-plus-2023';

INSERT INTO car_images (car_id, url, is_main, sort_order)
SELECT id, 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200&q=85', true, 0
FROM cars WHERE slug = 'byd-destroyer-05-2023';

INSERT INTO car_images (car_id, url, is_main, sort_order)
SELECT id, 'https://images.unsplash.com/photo-1571987502951-3cc390f9b0e1?w=1200&q=85', true, 0
FROM cars WHERE slug = 'changan-cs75-pro-2023';

INSERT INTO car_images (car_id, url, is_main, sort_order)
SELECT id, 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=85', true, 0
FROM cars WHERE slug = 'changan-cs75-plus-2023';

INSERT INTO car_images (car_id, url, is_main, sort_order)
SELECT id, 'https://images.unsplash.com/photo-1617531653332-bd46c16f4d68?w=1200&q=85', true, 0
FROM cars WHERE slug = 'changan-eado-plus-2023';

INSERT INTO car_images (car_id, url, is_main, sort_order)
SELECT id, 'https://images.unsplash.com/photo-1532581291347-9c39cf10a73c?w=1200&q=85', true, 0
FROM cars WHERE slug = 'changan-eado-2023';

INSERT INTO car_images (car_id, url, is_main, sort_order)
SELECT id, 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&q=85', true, 0
FROM cars WHERE slug = 'chevrolet-cobalt-2023';

INSERT INTO car_images (car_id, url, is_main, sort_order)
SELECT id, 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200&q=85', true, 0
FROM cars WHERE slug = 'deepal-s07-2023';

-- Default settings
INSERT INTO settings (key, value) VALUES
  ('whatsapp_number', '77072702823'),
  ('phone_number', '+7 707 270 28 23'),
  ('address', 'ул. Жумекен Нажимеденова, 34/2П'),
  ('working_hours', 'Пн–Вс: 9:00–20:00')
ON CONFLICT (key) DO NOTHING;
