// Location: a way to localize on planet earth, like GPS coordinates for example.
import type { ILocation } from "../../types";

export class Location implements ILocation {
	public latitude: number;
	public longitude: number;
	public altitude?: number;

	constructor({
		...location
	}: {
		lat: number;
		lng: number;
		alt?: number;
		latitude?: number;
		longitude?: number;
		elevation?: number;
	}) {
		this.latitude = location.latitude || location.lat;
		this.longitude = location.longitude || location.lng;
		this.altitude = location.elevation || location.alt || undefined;
	}

	public getLatitude(): number {
		return this.latitude;
	}

	public getLongitude(): number {
		return this.longitude;
	}

	public getAltitude(): number | undefined {
		return this.altitude;
	}

	public toString(): string {
		return `Location(lat: ${this.latitude}, lng: ${this.longitude}${this.altitude !== undefined ? `, alt: ${this.altitude}` : ""})`;
	}
}
