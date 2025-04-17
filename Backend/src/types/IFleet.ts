import { IVehicle } from './IVehicle';

export interface IFleet {
  id: string;
  userId: string;
  vehicles: IVehicle[];
}


