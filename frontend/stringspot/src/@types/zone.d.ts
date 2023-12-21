import { ICenter } from "./center";

export interface ICountry {
  id: number;
  name: string;
  abbr: string;
  continent: string;
}

export interface IZone {
  id: number;
  city: string;
  post_code: string;
  country: ICountry;
  centers: ICenter[];
}
