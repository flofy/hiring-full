import { ILocation } from '../types';
import { CreateFleetCommand } from './Commands/CreateFleet/CreateFleetCommand';
import { CreateFleetHandler } from './Commands/CreateFleet/CreateFleetHandler';
import { RegisterVehicleCommand } from './Commands/RegisterVehicle/RegisterVehicleCommand';
import { RegisterVehicleHandler } from './Commands/RegisterVehicle/RegisterVehicleHandler';
import { FleetRepository } from '../Domain/Fleet/FleetRepository';
import { VehicleRepository } from '../Domain/Vehicle/VehicleRepository';
import { configure } from '../Infra/Persistence';

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
    const defaultRepositories = configure('inmemory');
    this.fleetRepository = fleetRepository || defaultRepositories.fleetRepository;
    this.vehicleRepository = vehicleRepository || defaultRepositories.vehicleRepository;
    
    // Initialize handlers
    this.createFleetHandler = new CreateFleetHandler(this.fleetRepository);
    this.registerVehicleHandler = new RegisterVehicleHandler(this.fleetRepository, this.vehicleRepository);
    return this;
  }

  /**
   * Gets the unique instance of FleetManager (Singleton pattern)
   */
  public static async getInstance(
    fleetRepository?: FleetRepository,
    vehicleRepository?: VehicleRepository
  ): Promise<FleetManager> {
    if (!FleetManager.instance) {
      // Si les repositories ne sont pas fournis, les configurer
      if (!fleetRepository || !vehicleRepository) {
        const repositories = await configure();
        fleetRepository = fleetRepository || repositories.fleetRepository;
        vehicleRepository = vehicleRepository || repositories.vehicleRepository;
      }
      
      FleetManager.instance = new FleetManager(fleetRepository, vehicleRepository);
    }
    return FleetManager.instance;
  }

  /**
   * Creates a new fleet for a user
   * @param userId User ID of the fleet owner
   * @returns ID of the created fleet
   */
  public createFleet(userId: string): number {
    const command = new CreateFleetCommand(userId);
    return this.createFleetHandler.handle(command);
  }

  /**
   * Registers a vehicle in a fleet
   * @param fleetId Fleet ID
   * @param serialNumber Vehicle serial number
   */
  public registerVehicle(fleetId: number, serialNumber: string): void {
    const command = new RegisterVehicleCommand(fleetId, serialNumber);
    this.registerVehicleHandler.handle(command);
  }

  /**
   * Sets the location of a vehicle
   * @param fleetId Fleet ID
   * @param serialNumber Vehicle serial number
   * @param location Location coordinates
   */
  public setLocation(fleetId: number, serialNumber: string, location: ILocation): void {
    this.vehicleRepository.updateLocation(serialNumber, location);
  }
}