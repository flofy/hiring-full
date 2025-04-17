// Fleet: a collection a distinct vehicles.
export class Fleet {
    private id: number | string;
    private vehicles: Set<string>;

    constructor(id: number | string) {
        this.id = id;
        this.vehicles = new Set();
    }

    public getId(): number | string {
        return this.id;
    }

    public registerVehicle(vehicleSerialNumber: string): void {
        if (this.vehicles.has(vehicleSerialNumber)) {
            throw new Error("Vehicle already registered.");
        }
        this.vehicles.add(vehicleSerialNumber);
    }

    public hasVehicle(vehicleSerialNumber: string): boolean {
        return this.vehicles.has(vehicleSerialNumber);
    }

    public getVehicles(): string[] {
        return Array.from(this.vehicles);
    }
}