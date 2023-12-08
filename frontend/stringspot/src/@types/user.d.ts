export interface IUser {
  id: number;
  logged?: boolean;
  email?: string;
  token: null | string;
  roles?: [];
  firstName: string;
  lastName: string;
}
