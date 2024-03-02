import { UserModel } from './models/user.model';

declare global {
  type User = UserModel;
}
export {};
