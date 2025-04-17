import { RegisterVehicleCommand } from './RegisterVehicleCommand';
import { VehicleRepository } from '../../../Domain/Vehicle/VehicleRepository';
import { FleetRepository } from '../../../Domain/Fleet/FleetRepository';
import { VehicleAlreadyRegisteredError } from '../../../Domain/Exceptions/VehicleAlreadyRegisteredError';

export class RegisterVehicleHandler {
    private vehicleRepository: VehicleRepository;
    private fleetRepository: FleetRepository;
    
    constructor(fleetRepository: FleetRepository, vehicleRepository: VehicleRepository) {
        this.fleetRepository = fleetRepository;
        this.vehicleRepository = vehicleRepository;
    }

    public async handle(command: RegisterVehicleCommand): Promise<void> {
        const { fleetId, vehicleSerialNumber } = command;

        const vehicleExists = await this.vehicleRepository.exists(vehicleSerialNumber);

        if (vehicleExists) {
            throw new VehicleAlreadyRegisteredError(vehicleSerialNumber);
        }

        await this.vehicleRepository.registerVehicle(fleetId, vehicleSerialNumber);
    }
}