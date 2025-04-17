import { v4 as uuidv4 } from "uuid";
import type { CreateFleetCommand } from "./CreateFleetCommand";
import type { FleetRepository } from "../../../Domain/Fleet/FleetRepository";
import { Fleet } from "../../../Domain/Fleet/Fleet";

export class CreateFleetHandler {
	private fleetRepository: FleetRepository;

	constructor(fleetRepository: FleetRepository) {
		this.fleetRepository = fleetRepository;
	}

	handle(command: CreateFleetCommand): number {
		const fleetId = Math.floor(Math.random() * 1000000);
		const userId = uuidv4();
		const fleet: Fleet = new Fleet(fleetId, userId);
		this.fleetRepository.save(fleet);

		return fleetId;
	}
}
