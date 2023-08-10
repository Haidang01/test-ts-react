export interface IProduct {
  id?: number;
  name: string;
  price: number;
  img: string;
}
export interface IUser {
  id?: number;
  email: string;
  password: string;
  role: number;
}
export interface IRole {
  id?: number;
  name: string;
}
