export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  token?: string;
  access?: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

export type UserProfile = {
  email: string;
  name: string;
  profile_picture: string | null;
  phone_number: string;
  department: string;
  company: string;
  is_company: boolean;
  role: string;
  address: string;
  bio: string;
  date_joined: string;
  cover_picture: string | null;
};

export type UserData = {
  profile: UserProfile;
  is_subscribed: boolean;
};

export type UserResponse = {
  success: boolean;
  message: string;
  data: UserData;
};


export interface Company {
  id: number;
  name: string;
  created_at: string;
}

export interface CompanyPayload {
  name: string;
}

export interface Member {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface InvitePayload {
  email: string;
  name: string;
  role: string;
}


export type Plan = {
  id: number;
  name: string;
  plan_type: string;
  description: string | null;
  price: string; 
  billing_cycle: string; 
  max_users: number | null;
  training_generations_per_month: number | null;
  topic_meeting_generations_per_month: number | null;
  resource_downloads_limit: number | null;
  trial_days: number | null;
  is_active: boolean;
  title:string
};
