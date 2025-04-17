import type { IVehicle } from "../../../types/IVehicle";
import type { FleetRepository } from "../../../Domain/Fleet/FleetRepository";

export class InMemoryFleetRepository implements FleetRepository {
	private fleets: any[] = [];

	add(fleet: any): void {
		this.fleets.push(fleet);
	}
	remove(fleetId: string): void {
		this.fleets = this.fleets.filter((fleet) => fleet.id !== fleetId);
	}
	exists(id: string): boolean {
		return this.fleets.some((fleet) => fleet.id === id);
	}
	createFleet(userId: string): Promise<number> {
		const newFleet = {
			id: Math.floor(Math.random() * 1000000), // Generate a unique ID
			userId,
			vehicles: [],
		};
		this.fleets.push(newFleet);
		return new Promise((resolve) => resolve(newFleet.id));
	}

	save(fleet: any): Promise<void> {
		this.fleets.push(fleet);
		return new Promise((resolve) => resolve());
	}

	findById(id: number): any | null {
		return this.fleets.find((fleet) => fleet.id === id) || null;
	}

	findBySerialNumber(serialNumber: string): any | undefined {
		return this.fleets.find((fleet) => fleet.serialNumber === serialNumber);
	}

	registerVehicle(fleetId: number, vehicle: any): Promise<void> {
		const fleet = this.findById(fleetId);
		if (fleet) {
			fleet.vehicles = fleet.vehicles || [];
			fleet.vehicles.push(vehicle);
		}
		return new Promise((resolve) => resolve());
	}

	localizeVehicle(fleetId: number, vehicleId: string): any | null {
		const fleet = this.findById(fleetId);
		return (
			fleet?.vehicles?.find(
				(vehicle: IVehicle) => vehicle.serialNumber === vehicleId,
			) || null
		);
	}

	getVehicleLocation(
		fleetId: number,
		vehiclePlateNumber: string,
	): { lat: number; lng: number; alt?: number } | null {
		const vehicle = this.localizeVehicle(fleetId, vehiclePlateNumber);
		if (vehicle?.location) {
			const [lat, lng, alt] = vehicle.location.split(",").map(Number);
			return { lat, lng, alt: alt || undefined };
		}
		return null;
	}
}
