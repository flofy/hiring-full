export class VehicleAlreadyRegisteredError extends Error {
    constructor(vehicleSerialNumber: string) {
        super(`The vehicle with serial number ${vehicleSerialNumber} is already registered.`);
        this.name = 'VehicleAlreadyRegisteredError';
    }
}