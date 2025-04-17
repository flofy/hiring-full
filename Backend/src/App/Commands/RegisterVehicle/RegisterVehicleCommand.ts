export class RegisterVehicleCommand {
	constructor(
		public readonly fleetId: number,
		public readonly vehicleSerialNumber: string,
	) {}
}
