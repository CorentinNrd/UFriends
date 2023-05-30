export interface User {
  id: string | undefined;
  first_name: string | undefined;
  last_name: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  password: string | undefined;
  roles: string | undefined;
  gender: string | undefined;
  createdAt: string | undefined;
  updatedAt: string | undefined;
  deleteAt: string | undefined;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface RegisterUser {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation?: string;
  roles: string;
  gender: string;
}
