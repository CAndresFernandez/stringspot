export interface IUser {
  id: number;
  logged?: boolean;
  email?: string;
  token: null | string;
  roles?: [];
  first_name: string;
  last_name: string;
}
