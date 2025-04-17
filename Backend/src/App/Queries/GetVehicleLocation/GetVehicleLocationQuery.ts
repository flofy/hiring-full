export class GetVehicleLocationQuery {
    constructor(
        public readonly fleetId: string,
        public readonly vehiclePlateNumber: string
    ) {}
}