export class LocalizeVehicleCommand {
	public fleetId: string;
	public vehicleSerialNumber: string; // Added this property
	public lat: string;
	public lng: string;
	public alt: string;

	constructor(
		fleetId: string,
		vehicleSerialNumber: string,
		lat: string,
		lng: string,
		alt: string,
	) {
		this.fleetId = fleetId;
		this.vehicleSerialNumber = vehicleSerialNumber; // Added this property
		this.lat = lat;
		this.lng = lng;
		this.alt = alt;
	}
}
