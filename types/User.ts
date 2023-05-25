export interface User {
  _id: string;
  name: string;
  email: string;
  isRole: 'admin' | 'role';
  image?: string;
}
