// Vehicle: a car, truck, motocycle, or any transportation mode that can help me to move from point A to point B on planet earth.
import type { ILocation } from "../types";

export interface IVehicle {
	serialNumber: string;
	location: ILocation | null;
	fleetId: number | null;
	getSerialNumber(): string;
	setLocation(location: ILocation): void;
	getLocation(): ILocation | null;
	updateLocation(location: ILocation): void;
}
