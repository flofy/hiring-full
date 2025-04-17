import { randomUUID } from 'crypto';
import { LocationRepository } from '../../../Domain/Location/LocationRepository';
import { LocalizeVehicleCommand } from './LocalizeVehicleCommand';

export class LocalizeVehicleHandler {
    private locationRepository: LocationRepository;

    constructor(locationRepository: LocationRepository) {
        this.locationRepository = locationRepository;
    }
    public async handle(command: LocalizeVehicleCommand): Promise<void> {
        const { fleetId, vehicleSerialNumber, lat, lng, alt } = command;
        this.locationRepository.save(randomUUID(), fleetId, vehicleSerialNumber, lat, lng, alt);
    }
}