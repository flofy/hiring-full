import { IVehicle, IFleet } from "../../types";

export interface FleetRepository {
    save(fleet: IFleet): void;
    findById(fleetId: string): IVehicle[] | null;
    createFleet(userId: string): string; // Returns the fleetId
    registerVehicle(fleetId: string, vehiclePlateNumber: string): void;
    localizeVehicle(fleetId: string, vehiclePlateNumber: string, lat: number, lng: number, alt?: number): void;
    getVehicleLocation(fleetId: string, vehiclePlateNumber: string): { lat: number; lng: number; alt?: number } | null;
}