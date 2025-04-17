import { ILocation } from '../types';
import { CreateFleetCommand } from './Commands/CreateFleet/CreateFleetCommand';
import { CreateFleetHandler } from './Commands/CreateFleet/CreateFleetHandler';
import { RegisterVehicleCommand } from './Commands/RegisterVehicle/RegisterVehicleCommand';
import { RegisterVehicleHandler } from './Commands/RegisterVehicle/RegisterVehicleHandler';
import { FleetRepository } from '../Domain/Fleet/FleetRepository';
import { VehicleRepository } from '../Domain/Vehicle/VehicleRepository';
import { InMemoryFleetRepository } from '../Infra/Persistence/InMemory/InMemoryFleetRepository';
import { InMemoryVehicleRepository } from '../Infra/Persistence/InMemory/InMemoryVehicleRepository';
import { IVehicle } from '../types/IVehicle';

/**
 * FleetManager is an adapter that exposes the possible actions on fleets and vehicles.
 * It bridges the gap between the user interface (CLI, API, etc.) and the business domain
 * using CQRS commands and queries.
 */
export class FleetManager {
  private static instance: FleetManager;
  private fleetRepository: FleetRepository;
  private vehicleRepository: VehicleRepository;
  
  // Handlers
  private createFleetHandler: CreateFleetHandler;
  private registerVehicleHandler: RegisterVehicleHandler;
  
  /**
   * Private constructor to ensure Singleton pattern
   */
  private constructor(
    fleetRepository?: FleetRepository, 
    vehicleRepository?: VehicleRepository
  ) {
    this.fleetRepository = fleetRepository || new InMemoryFleetRepository();
    this.vehicleRepository = vehicleRepository || new InMemoryVehicleRepository();
    
    // Initialize handlers
    this.createFleetHandler = new CreateFleetHandler(this.fleetRepository);
    this.registerVehicleHandler = new RegisterVehicleHandler(this.fleetRepository, this.vehicleRepository);
    return this;
  }

  /**
   * Gets the unique instance of FleetManager (Singleton pattern)
   */
  public static getInstance(
    fleetRepository?: FleetRepository,
    vehicleRepository?: VehicleRepository
  ): FleetManager {
    if (!FleetManager.instance) {
      FleetManager.instance = new FleetManager(fleetRepository, vehicleRepository);
    }
    return FleetManager.instance;
  }

  /**
   * Creates a new fleet for a user
   * @param userId User ID of the fleet owner
   * @returns ID of the created fleet
   */
  public createFleet(userId: string): string {
    const command = new CreateFleetCommand(userId);
    return this.createFleetHandler.handle(command);
  }

  /**
   * Registers a vehicle in a fleet
   * @param fleetId Fleet ID
   * @param serialNumber Vehicle serial number
   */
  public registerVehicle(fleetId: string, serialNumber: string): void {
    const command = new RegisterVehicleCommand(fleetId, serialNumber);
    this.registerVehicleHandler.handle(command);
  }

  /**
   * Sets the location of a vehicle
   * @param fleetId Fleet ID
   * @param serialNumber Vehicle serial number
   * @param location Location coordinates
   */
  public setLocation(fleetId: string, serialNumber: string, location: ILocation): void {
    this.vehicleRepository.updateLocation(serialNumber, location);
  }

  /**
   * Finds a fleet by its ID
   * @param fleetId Fleet ID
   * @returns Found fleet or null
   */
  public findFleetById(fleetId: string): IVehicle[] | null {
    return this.fleetRepository.findById(fleetId);
  }
}