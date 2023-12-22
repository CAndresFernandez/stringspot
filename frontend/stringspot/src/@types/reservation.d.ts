import { IUser } from "./user";
import { ICenter } from "./center";

export interface ICourt {
  id: number;
  number: string;
  type: string;
  center: ICenter;
}

export interface IReservation {
  id: number;
  startTime: Date;
  endTime: Date;
  resType: string;
  active: boolean;
  createdAt: Date;
  user: IUser;
  court: ICourt;
}
