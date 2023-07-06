import { UserModel } from './user.model';

export interface BookingModel {
  id: number;
  service: string;
  dateTime: string;
  user: Omit<UserModel, 'id' | 'active'>;
  active: boolean;
}
