import { Command } from 'commander';
import { FleetManager } from '../../../App/index';

export function configureCommand(program: Command) {
  program
    .command('register-vehicle')
    .description('Register a vehicle in a fleet')
    .argument('<fleetId>', 'Fleet ID')
    .argument('<vehicleSerialNumber>', 'Vehicle serial number')
    .action(async (fleetId, vehicleSerialNumber) => {
      try {
        const fleetManager = await FleetManager.getInstance();
        fleetManager.registerVehicle(Number.parseInt(fleetId), vehicleSerialNumber);
        
        console.log(`Vehicle ${vehicleSerialNumber} registered in fleet ${fleetId}`);
      } catch (error) {
        console.error(`Error registering vehicle: ${error instanceof Error ? error.message : String(error)}`);
      }
    });
  
  return program;
}