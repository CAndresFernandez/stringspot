import { ICourt } from "./court";
import { IZone } from "./zone";

export interface ICenter {
  id?: number;
  name: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  number_courts?: number;
  zone?: IZone;
  courts: ICourt[];
}
