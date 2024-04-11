import { ICenter } from "./center";
import { IReservation } from "./reservation";

export interface ICourt {
  id: number;
  number: string;
  type: string;
  reservations: IReservation[];
  center: ICenter;
}
