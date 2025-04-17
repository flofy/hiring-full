import { ILocation } from "../../types";

export interface LocationRepository {
    save(
        id: string,
        fleetId: string,
        vehicleSerialNumber: string,
        lat: string,
        lng: string,
        alt: string
    ): void;
    findById(id: string): ILocation | null;
}