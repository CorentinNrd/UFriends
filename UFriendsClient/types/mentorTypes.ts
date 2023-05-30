export interface RegisterMentor {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation?: string;
  roles: string;
  gender: string;
  description: string;
  experience: string;
  education: string;
  languages: string[];
  price: string;
}
