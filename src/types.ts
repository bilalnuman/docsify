<<<<<<< HEAD
=======
// src/types/auth.ts
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
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

<<<<<<< HEAD
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


=======

// src/types/company.ts
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
export interface Company {
  id: number;
  name: string;
  created_at: string;
}

export interface CompanyPayload {
  name: string;
}

<<<<<<< HEAD
=======
// src/types/team.ts
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
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
<<<<<<< HEAD


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
=======
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
