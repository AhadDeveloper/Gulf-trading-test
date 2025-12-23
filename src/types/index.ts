export interface Plan {
  id: number;
  name: string;
  price: number;
  daily: number;
  total: number;
}

export interface Profile {
  id: string;
  username: string;
  phone: string;
  address?: string | null;
  profileImage?: string | null;
  role: "user" | "admin";
  created_at: string;
  updated_at: string;
}

export type ActionResult<T> =
  | { data: T; error?: never }
  | { error: string; data?: never };
