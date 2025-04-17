import { IVehicle, ILocation } from "../../types";

export interface VehicleRepository {
    save(vehicle: IVehicle): void;
    remove(vehicleSerialNumber: string): void;
    exists(vehicleSerialNumber: string): boolean;
    registerVehicle(fleetId: string, vehicleSerialNumber: string): void;
    findBySerialNumber(serialNumber: string): Promise<IVehicle | null>;
    updateLocation(serialNumber: string, location: ILocation): void;
}