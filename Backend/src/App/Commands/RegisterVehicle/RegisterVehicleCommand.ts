export class RegisterVehicleCommand {
    constructor(
        public readonly fleetId: string,
        public readonly vehicleSerialNumber: string
    ) {}
}