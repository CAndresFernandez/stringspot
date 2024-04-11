import { ICourt } from "./court";
import { IUser } from "./user";

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
