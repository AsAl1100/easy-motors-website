export type CarStatus = "available" | "on_order" | "sold";

export interface Car {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  body_type: string;
  fuel_type: string;
  transmission: string;
  engine_volume: number;
  engine_power: number;
  drive_type: string;
  color?: string;
  description: string;
  status: CarStatus;
  seats?: number;
  trunk_volume?: number;
  fuel_consumption?: number;
  top_speed?: number;
  acceleration?: number;
  ground_clearance?: number;
  is_new: boolean;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  images?: CarImage[];
}

export interface CarImage {
  id: string;
  car_id: string;
  url: string;
  is_main: boolean;
  sort_order: number;
}

export type ApplicationType = "car" | "credit" | "selection" | "callback";
export type ApplicationStatus = "new" | "in_progress" | "completed" | "cancelled";

export interface Application {
  id: string;
  type: ApplicationType;
  name: string;
  phone: string;
  car_id?: string;
  car_name?: string;
  down_payment?: number;
  loan_term?: number;
  message?: string;
  status: ApplicationStatus;
  created_at: string;
  updated_at: string;
}

export interface CatalogFilters {
  brand?: string;
  model?: string;
  year_from?: number;
  year_to?: number;
  price_from?: number;
  price_to?: number;
  body_type?: string;
  fuel_type?: string;
  transmission?: string;
  sort?: "price_asc" | "price_desc" | "year_desc" | "year_asc";
}

export interface CreditCalcResult {
  monthly_payment: number;
  loan_amount: number;
  down_payment: number;
  term_months: number;
  car_price: number;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface Review {
  id: string;
  name: string;
  text: string;
  rating: number;
  car?: string;
  date: string;
  avatar?: string;
}
