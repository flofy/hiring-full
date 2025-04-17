// Fleet: a collection a distinct vehicles.
export class Fleet {
	public id: number;
	public userId: string;
	public vehicles: Set<string>;

	constructor(id: number, userId: string) {
		this.id = id;
		this.userId = userId;
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
