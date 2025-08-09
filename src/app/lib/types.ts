// frontend/src/lib/types.ts

export type UUID = string;

export interface Listing {
  id: UUID;
  title: string;
  description?: string;
  price: number;           // integer or float representing monthly price
  priceText?: string;      // optional formatted price like "$2,800/mo"
  beds?: number;
  baths?: number;
  location: string;        // "Chelsea", "Upper West", "New York, NY", etc.
  address?: string;
  images: string[];        // urls
  noBrokerage?: boolean;
  ownerId?: UUID;
  createdAt?: string;      // ISO date string
  updatedAt?: string;      // ISO date string
  metadata?: Record<string, any>;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export type ListingsResponse = Paginated<Listing>;

// Auth / forms
export interface LoginPayload {
  method: "email" | "phone";
  email?: string;
  phone?: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  method: "email" | "phone";
  email?: string;
  phone?: string;
  password: string;
  otp?: string;
}
