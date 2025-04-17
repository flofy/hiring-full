export class VehicleSerialNumber {
	private readonly value: string;

	constructor(value: string) {
		this.validate(value);
		this.value = value;
	}

	private validate(value: string): void {
		const serialNumberPattern = /^[A-Z0-9-]+$/; // Example pattern for serial numbers
		if (!serialNumberPattern.test(value)) {
			throw new Error("Invalid vehicle plate number format.");
		}
	}

	public getValue(): string {
		return this.value;
	}
}
