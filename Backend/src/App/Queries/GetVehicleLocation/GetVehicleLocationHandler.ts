import { VehicleRepository } from "./../../../Domain/Vehicle/VehicleRepository";
import { ILocation } from "./../../../types";

export class GetVehicleLocationQuery {
    constructor(public readonly fleetId: string, public readonly vehiclePlateNumber: string) {}
}

export class GetVehicleLocationHandler {
    constructor(private vehicleRepository: VehicleRepository) {}

    public async handle(query: GetVehicleLocationQuery): Promise<ILocation | null> {
        const vehicle = await this.vehicleRepository.findBySerialNumber(query.vehiclePlateNumber);
        const location = vehicle ? vehicle.getLocation() : null;
        return location || null;
        
    }
}