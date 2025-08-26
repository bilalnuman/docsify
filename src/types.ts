// src/types/auth.ts
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


// src/types/company.ts
export interface Company {
  id: number;
  name: string;
  created_at: string;
}

export interface CompanyPayload {
  name: string;
}

// src/types/team.ts
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
