import { ILocation } from '../../../types/ILocation';

export class InMemoryVehicleRepository {
    private vehicles: Map<string, any> = new Map();

    add(vehicle: any): void {
        this.vehicles.set(vehicle.serialNumber, vehicle);
    }
    remove(vehicleId: string): void {
        this.vehicles = new Map(
            Array.from(this.vehicles).filter(([key, vehicle]) => vehicle.id !== vehicleId)
        );
    }
    exists(id: string): boolean {
        return Array.from(this.vehicles.values()).some(vehicle => vehicle.id === id);
    }
    
    save(vehicle: any): void {
        this.vehicles.set(vehicle.serialNumber, vehicle);
    }

    findBySerialNumber(vehicleSerialNumber: string): any | null {
        Array.from(this.vehicles).filter(([key, vehicle]) => vehicle.id !== vehicleSerialNumber)
    }

    public registerVehicle(fleetId: string, vehicleSerialNumber: string): void {
        const key = this.getKey(fleetId, vehicleSerialNumber);
        if (this.vehicles.has(key)) {
            throw new Error('Vehicle already registered');
        }
        this.vehicles.set(key, { fleetId, vehicleSerialNumber });
    }

    public getVehicle(fleetId: string, vehicleSerialNumber: string): any {
        const key = this.getKey(fleetId, vehicleSerialNumber);
        return this.vehicles.get(key);
    }

    public updateLocation(serialNumber: string, location: ILocation): void {
        const vehicle = this.vehicles.get(serialNumber);
        if (!vehicle) {
          throw new Error(`Vehicle with serial number ${serialNumber} not found.`);
        }
        vehicle.location = location;
    }

    public getVehicleLocation(fleetId: string, vehicleSerialNumber: string): any {
        const vehicle = this.getVehicle(fleetId, vehicleSerialNumber);
        return vehicle ? vehicle.location : null;
    }

    private getKey(fleetId: string, vehicleSerialNumber: string): string {
        return `${fleetId}-${vehicleSerialNumber}`;
    }
}