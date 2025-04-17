import type { VehicleRepository } from "../../../Domain/Vehicle/VehicleRepository";
import { Vehicle as DomainVehicle } from "../../../Domain/Vehicle/Vehicle";
import type { ILocation } from "../../../types";
import { Vehicle, Location } from "./orm";

export class DatabaseVehicleRepository implements VehicleRepository {
	async save(vehicle: DomainVehicle): Promise<void> {
		// Créer ou mettre à jour le véhicule
		await Vehicle.upsert({
			serialNumber: vehicle.getSerialNumber(),
			fleetId: vehicle.fleetId,
		});

		// Si le véhicule a une localisation, la créer ou la mettre à jour
		const location = vehicle.getLocation();
		if (location) {
			await Location.upsert({
				latitude: location.latitude,
				longitude: location.longitude,
				altitude: location.altitude,
				vehicleSerialNumber: vehicle.getSerialNumber(),
			});
		}
	}

	async findBySerialNumber(
		serialNumber: string,
	): Promise<DomainVehicle | null> {
		const vehicleData = await Vehicle.findOne({
			where: { serialNumber },
			include: [{ model: Location, as: "location" }],
		});

		if (!vehicleData) {
			return null;
		}

		const vehicle = new DomainVehicle(
			vehicleData.serialNumber,
			vehicleData.fleetId,
		);

		/*
    if (vehicleData.location) {
      vehicle.setLocation({
        latitude: parseFloat(vehicleData.location.latitude.toString()),
        longitude: parseFloat(vehicleData.location.longitude.toString()),
        altitude: vehicleData.location.altitude ? parseFloat(vehicleData.location.altitude.toString()) : undefined
      });
    }
    /** */

		return vehicle;
	}

	async updateLocation(
		serialNumber: string,
		location: ILocation,
	): Promise<void> {
		// Vérifier si le véhicule existe
		const vehicleExists = await Vehicle.findByPk(serialNumber);

		if (!vehicleExists) {
			throw new Error(`Vehicle with serial number ${serialNumber} not found`);
		}

		// Créer ou mettre à jour la localisation
		await Location.upsert({
			latitude: location.latitude,
			longitude: location.longitude,
			altitude: location.altitude,
			vehicleSerialNumber: serialNumber,
		});
	}

	async exists(serialNumber: string): Promise<boolean> {
		const count = await Vehicle.count({
			where: { serialNumber: serialNumber.toString() },
		});
		return count > 0;
	}

	async remove(serialNumber: string): Promise<void> {
		// Supprimer d'abord la localisation
		await Location.destroy({
			where: { vehicleSerialNumber: serialNumber },
		});

		// Puis supprimer le véhicule
		await Vehicle.destroy({
			where: { serialNumber },
		});
	}
}
