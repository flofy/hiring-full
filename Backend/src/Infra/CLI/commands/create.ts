import { GluegunToolbox } from 'gluegun';
import { CreateFleetCommand } from '../../../App/Commands/CreateFleet/CreateFleetCommand';
import { CreateFleetHandler } from '../../../App/Commands/CreateFleet/CreateFleetHandler';
import { InMemoryFleetRepository } from '../../Persistence/InMemory/InMemoryFleetRepository';

module.exports = {
  name: 'create',
  description: 'Create a new fleet for the specified user',
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, print } = toolbox;
    const userId = parameters.first;

    if (!userId) {
      print.error('User ID is required');
      return;
    }

    try {
      const fleetRepository = new InMemoryFleetRepository();
      const createFleetHandler = new CreateFleetHandler(fleetRepository);
      const command = new CreateFleetCommand(userId);
      const fleetId = createFleetHandler.handle(command);
      
      print.info(`Fleet created with ID: ${fleetId}`);
    } catch (error) {
      print.error(`Error creating fleet: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
};