"use cleint"
import { apiClient } from "./axiosInstance";


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
import { ListingsResponse,Listing } from "./types";

export async function pingBackend() {
  const res = await fetch(`${API_BASE_URL}/ping`);
  if (!res.ok) throw new Error("Failed to connect to backend");
  return res.json();
}



// export async function fetchListings(q: string, page = 1, pageSize = 12): Promise<ListingsResponse> {
//   const res = await fetch(`${API_BASE_URL}/api/listings?location=${encodeURIComponent(q)}&page=${page}&pageSize=${pageSize}`);
//   if (!res.ok) throw new Error("Failed to load listings");
//   return res.json() as Promise<ListingsResponse>;
// }

// lib/api.ts

// Simple UUID generator for mock data
function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Fake images for demo
const sampleImages = [
  "https://images.unsplash.com/photo-1560185127-6ed189bf02f4",
  "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
  "https://images.unsplash.com/photo-1599427303058-f04e39f39e95"
];

// Generate some fake listings
function generateListings(count: number, location: string): Listing[] {
  return Array.from({ length: count }).map((_, i) => ({
    id: uuid(),
    title: `${location} Apartment ${i + 1}`,
    description: "A beautiful apartment located in the heart of the city.",
    price: Math.floor(Math.random() * 4000) + 1000,
    priceText: undefined,
    beds: Math.floor(Math.random() * 4) + 1,
    baths: Math.floor(Math.random() * 3) + 1,
    location,
    address: `${100 + i} Main Street, ${location}`,
    images: [sampleImages[Math.floor(Math.random() * sampleImages.length)]],
    noBrokerage: Math.random() > 0.5,
    ownerId: uuid(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    metadata: {}
  }));
}

// Mock API call
export async function fetchListings(
  q: string,
  page = 1,
  pageSize = 12
): Promise<ListingsResponse> {
  // Simulate network delay
  await new Promise(res => setTimeout(res, 500));

  const total = 50; // pretend there are 50 listings
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const all = generateListings(total, q);
  const items = all.slice(start, end);

  return {
    items,
    total,
    page,
    pageSize
  };
}
interface ApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

interface SendOtpPayload {
  method: "email" | "phone";
  contact: string;
}

export async function sendRegisterOtp(payload: SendOtpPayload) {
  const res = await apiClient<{ someField: string }>({
    url: "/users/register-otp",
    method: "post",
    data: payload,
    add_token:false
  });

  if (!res.success) {
    console.error(res.message);
  } else {
    console.log("OTP sent", res.data);
  }

  return res;  // returning so the caller can decide what to do
}


interface VerifyOtpPayload {
  login_method: "email" | "phone";  // match your backend's field name and accepted values
  contact: string;
  otp: string;
}

export async function verifyOtp(payload: VerifyOtpPayload) {
  const res = await apiClient<{ someField?: string }>({
    url: "/auth/verifyotp",
    method: "post",
    data: payload,
    add_token: false,  // usually OTP verification doesn't require auth token
  });

  if (!res.success) {
    console.error(res.message);
  } else {
    console.log("OTP verified", res.data);
  }

  return res;
}

export type Gender = "male" | "female" | "other";  // adjust to match your backend enum
export type LoginMethod = "email" | "phone";

export interface RegisterUserPayload {
  first_name: string;
  last_name: string;
  gender: Gender;
  dob?: string| null;  // ISO date string, e.g. "1990-01-01"
  email?: string |null;
  phone?: string| null;
  login_method: LoginMethod;
  password: string;
  otp: string;
}

export async function RegisterUser(payload: RegisterUserPayload) {
  const res = await apiClient<{ someField?: string }>({
    url: "/users",
    method: "post",
    data: payload,
    add_token: false, // usually OTP verification doesn't require auth token
  });

  if (!res.success) {
    console.error(res.message);
  } else {
    console.log("User registered", res.data);
  }

  return res;
}

interface LoginPayload {
  login_method: "email" | "phone";
  contact: string;
  password: string;
}

interface LoginResponseData {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export async function Userlogin(payload: LoginPayload): Promise<ApiResponse<LoginResponseData>> {
  const res = await apiClient<LoginResponseData>({
    url: "/auth/login",
    method: "post",
    data: payload,
    add_token: false,
  });

  if (!res.success) {
    console.error("Login failed:", res.message);
  } else {
    console.log("Login successful", res.data);
  }

  return res;
}


export async function sendForgetPasswordOtp(payload: SendOtpPayload) {
  const res = await apiClient<{ someField: string }>({
    url: "/auth/sendotp",
    method: "post",
    data: payload,
    add_token:false
  });

  if (!res.success) {
    console.error(res.message);
  } else {
    console.log("OTP sent", res.data);
  }

  return res;  // returning so the caller can decide what to do
}

interface ForgetPasswordChangePayload {
  login_method: "email" | "phone";
  contact: string;
  new_password: string;
  otp: string;
}

export async function forgetPasswordChange(payload: ForgetPasswordChangePayload) {
  const res = await apiClient<{ someField?: string }>({
    url: "/auth/forget-password-change",
    method: "post",
    data: payload,
    add_token: false, // no auth token needed
  });

  if (!res.success) {
    console.error("Forget password change failed:", res.message);
  } else {
    console.log("Password changed successfully", res.data);
  }

  return res;
}

// api.ts or wherever you keep API calls

export async function refreshAccessToken(refresh_token: string) {
  const res = await apiClient<{ access_token: string; refresh_token: string; token_type: string }>({
    url: "/auth/refresh",
    method: "post",
    data:refresh_token ,
    add_token: false,
  });
  return res;
}

