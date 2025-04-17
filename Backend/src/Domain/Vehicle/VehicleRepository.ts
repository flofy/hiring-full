import type { IVehicle, ILocation } from "../../types";

export interface VehicleRepository {
	save(vehicle: IVehicle): void;
	remove(vehicleSerialNumber: string): void;
	exists(vehicleSerialNumber: string): Promise<boolean>;
	findBySerialNumber(serialNumber: string): Promise<IVehicle | null>;
	updateLocation(serialNumber: string, location: ILocation): void;
}
