import type { Fleet } from "./Fleet";
import type { ILocation } from "../../types";

export interface FleetRepository {
	save(fleet: Fleet): Promise<void>;
	findById(id: number): Promise<Fleet | null>;
	createFleet(userId: string): Promise<number>; // Returns the fleetId
	registerVehicle(fleetId: number, vehicleSerialNumber: string): Promise<void>;
	localizeVehicle(
		fleetId: number,
		vehicleSerialNumber: string,
	): Promise<ILocation | null>;
}
