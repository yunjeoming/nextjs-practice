export interface User {
  id: string;
  name: string;
  email: string;
  isRole: 'admin' | 'role';
  image?: string;
}
