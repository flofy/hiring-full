import { IVehicle, ILocation } from '../../types';

export class Vehicle implements IVehicle {
    public serialNumber: string;
    public location: ILocation | null = null;
    public fleetId: string | null = null;

    constructor(serialNumber: string, fleetId: string | null = null) {
        this.serialNumber = serialNumber;
        this.fleetId = fleetId;
    }

    public getSerialNumber(): string {
        return this.serialNumber;
    }

    setLocation(location: ILocation): void {
        this.location = location;
    }
    getLocation(): ILocation | null {
        return this.location;
    }

    updateLocation(location: ILocation): ILocation {
        if (this.location === location) {
            throw new Error('Location is the same as current location.');
        }
        this.location = location;
        return this.location;
    }
}