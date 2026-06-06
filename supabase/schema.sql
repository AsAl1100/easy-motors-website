-- Easy Motors — Supabase Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- CARS
-- ============================================================
CREATE TABLE IF NOT EXISTS cars (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug          TEXT UNIQUE NOT NULL,
  brand         TEXT NOT NULL,
  model         TEXT NOT NULL,
  year          INTEGER NOT NULL,
  price         BIGINT NOT NULL,
  mileage       INTEGER DEFAULT 0,
  body_type     TEXT,
  fuel_type     TEXT,
  transmission  TEXT,
  engine_volume DECIMAL(4,1),
  engine_power  INTEGER,
  drive_type    TEXT,
  color         TEXT,
  description   TEXT,
  is_new        BOOLEAN DEFAULT true,
  is_active     BOOLEAN DEFAULT true,
  is_featured   BOOLEAN DEFAULT false,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- CAR IMAGES
-- ============================================================
CREATE TABLE IF NOT EXISTS car_images (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  car_id     UUID NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
  url        TEXT NOT NULL,
  is_main    BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_car_images_car_id ON car_images(car_id);

-- ============================================================
-- APPLICATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS applications (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type         TEXT NOT NULL CHECK (type IN ('car','credit','selection','callback')),
  name         TEXT NOT NULL,
  phone        TEXT NOT NULL,
  car_id       UUID REFERENCES cars(id) ON DELETE SET NULL,
  car_name     TEXT,
  down_payment BIGINT,
  loan_term    INTEGER,
  message      TEXT,
  status       TEXT DEFAULT 'new' CHECK (status IN ('new','in_progress','completed','cancelled')),
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_created ON applications(created_at DESC);

-- ============================================================
-- SETTINGS
-- ============================================================
CREATE TABLE IF NOT EXISTS settings (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key        TEXT UNIQUE NOT NULL,
  value      TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Cars: public read, authenticated write
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read active cars" ON cars
  FOR SELECT USING (is_active = true);
CREATE POLICY "Service role full access" ON cars
  USING (auth.role() = 'service_role');

-- Car images: public read
ALTER TABLE car_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read car images" ON car_images
  FOR SELECT USING (true);
CREATE POLICY "Service role full access on images" ON car_images
  USING (auth.role() = 'service_role');

-- Applications: insert only for anon, full for service_role
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can create application" ON applications
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role reads all applications" ON applications
  FOR SELECT USING (auth.role() = 'service_role');
CREATE POLICY "Service role updates applications" ON applications
  FOR UPDATE USING (auth.role() = 'service_role');

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER cars_updated_at BEFORE UPDATE ON cars
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER applications_updated_at BEFORE UPDATE ON applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
