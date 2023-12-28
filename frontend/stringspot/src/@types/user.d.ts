import { IReservation } from "./reservation";

export interface IPastRes {
  id: number;
  user: IUser;
  center: string;
  court: string;
  zone: string;
  country: string;
  date: string;
  time: string;
}

export interface IUser {
  id: number;
  logged?: boolean;
  email?: string;
  token: null | string;
  roles?: [];
  first_name: string;
  last_name: string;
  reservation: IReservation;
  pastRes: IPastRes[];
}
