import { Command } from 'commander';
import { FleetManager } from '../../../App/index';

export function configureCommand(program: Command) {
  program
    .command('create-fleet')
    .description('Create a new fleet for the specified user')
    .argument('<userId>', 'User ID')
    .option('--db', 'Use database persistence')
    .action(async (userId, options) => {
      try {
        const fleetManager = await FleetManager.getInstance();
        const fleetId = fleetManager.createFleet(userId);
        
        console.log(fleetId);
      } catch (error) {
        console.error(`Error creating fleet: ${error instanceof Error ? error.message : String(error)}`);
      }
    });
  
  return program;
}