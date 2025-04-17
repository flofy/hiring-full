export class FleetId {
	private readonly value: string;

	constructor(value: string) {
		if (!value) {
			throw new Error("FleetId cannot be empty.");
		}
		this.value = value;
	}

	public getValue(): string {
		return this.value;
	}

	public equals(other: FleetId): boolean {
		return this.value === other.value;
	}
}
