import type { FleetRepository } from "../../../Domain/Fleet/FleetRepository";
import { Fleet as DomainFleet } from "../../../Domain/Fleet/Fleet";
import { IVehicle, type ILocation } from "../../../types";
import { Fleet, Vehicle, Location } from "./orm";
import { v4 as uuidv4 } from "uuid";

export class DatabaseFleetRepository implements FleetRepository {
	async createFleet(userId: string): Promise<number> {
		const id = Math.floor(Math.random() * 1000000);
		await Fleet.create({
			id: id,
			userId: userId || uuidv4(),
		});
		return id;
	}

	async save(fleet: DomainFleet): Promise<void> {
		await Fleet.create({
			id: fleet.id,
			userId: fleet.userId || uuidv4(),
		});
	}

	async findById(id: number): Promise<DomainFleet | null> {
		const fleetData = await Fleet.findByPk(id, {
			include: [
				{
					model: Vehicle,
					as: "vehicles",
					include: [
						{
							model: Location,
							as: "location",
						},
					],
				},
			],
		});

		if (!fleetData) {
			return null;
		}

		const fleet = new DomainFleet(fleetData.id, fleetData.userId);

		// La méthode retourne une instance Fleet, pas un tableau de véhicules
		return fleet;
	}

	async registerVehicle(fleetId: number, serialNumber: string): Promise<void> {
		// Vérifier si la flotte existe
		const fleetExists = await Fleet.findByPk(fleetId);

		if (!fleetExists) {
			throw new Error(`Fleet with ID ${fleetId} not found`);
		}

		// Créer ou mettre à jour le véhicule
		const vehicle = await Vehicle.upsert({
			serialNumber: serialNumber,
			fleetId: fleetId,
		});
	}

	async localizeVehicle(
		fleetId: number,
		vehicleId: string,
	): Promise<ILocation | null> {
		const vehicleData = await Vehicle.findOne({
			where: {
				serialNumber: vehicleId,
				fleetId: fleetId,
			},
			include: [{ model: Location, as: "location" }],
		});

		if (!vehicleData) {
			return null;
		}

		return vehicleData.get("location") as ILocation;
	}

	async getVehicleLocation(
		fleetId: number,
		vehicleId: string,
	): Promise<ILocation | null> {
		return await this.localizeVehicle(fleetId, vehicleId);
	}
}
