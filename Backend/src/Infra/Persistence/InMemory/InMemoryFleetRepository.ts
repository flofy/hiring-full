import { IVehicle } from '../../../types/IVehicle';
import { FleetRepository } from '../../../Domain/Fleet/FleetRepository';

export class InMemoryFleetRepository implements FleetRepository {
  private fleets: any[] = [];

  add(fleet: any): void {
    this.fleets.push(fleet);
  }
  remove(fleetId: string): void {
    this.fleets = this.fleets.filter(fleet => fleet.id !== fleetId);
  }
  exists(id: string): boolean {
    return this.fleets.some(fleet => fleet.id === id);
  }
  createFleet(userId: string): string {
    const newFleet = {
      id: (Math.random() * 1e16).toString(36), // Generate a unique ID
      userId,
      vehicles: []
    };
    this.fleets.push(newFleet);
    return newFleet.id;
  }

  save(fleet: any): void {
    this.fleets.push(fleet);
  }

  findById(id: string): any | null {
    return this.fleets.find(fleet => fleet.id === id) || null;
  }

  findBySerialNumber(serialNumber: string): any | undefined {
    return this.fleets.find(fleet => fleet.serialNumber === serialNumber);
  }

  registerVehicle(fleetId: string, vehicle: any): void {
    const fleet = this.findById(fleetId);
    if (fleet) {
      fleet.vehicles = fleet.vehicles || [];
      fleet.vehicles.push(vehicle);
    }
  }

  localizeVehicle(fleetId: string, vehicleId: string): any | null {
    const fleet = this.findById(fleetId);
    return fleet?.vehicles?.find((vehicle: IVehicle) => vehicle.serialNumber === vehicleId) || null;
  }

  getVehicleLocation(fleetId: string, vehiclePlateNumber: string): { lat: number; lng: number; alt?: number } | null {
    const vehicle = this.localizeVehicle(fleetId, vehiclePlateNumber);
    if (vehicle?.location) {
      const [lat, lng, alt] = vehicle.location.split(',').map(Number);
      return { lat, lng, alt: alt || undefined };
    }
    return null;
  }
}