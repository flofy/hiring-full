import { GluegunToolbox } from 'gluegun';
import { FleetManager } from '../../../App/index';

module.exports = {
  name: 'register-vehicle',
  description: 'Register a vehicle in the specified fleet',
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, print } = toolbox;
    const fleetId = parameters.first;
    const vehicleSerialNumber = parameters.second;

    if (!fleetId || !vehicleSerialNumber) {
      print.error('Fleet ID and vehicle plate number are required');
      return;
    }

    try {
      const fleetManager = FleetManager.getInstance();
      fleetManager.registerVehicle(fleetId, vehicleSerialNumber);
    
      print.success(`Vehicle ${vehicleSerialNumber} registered to fleet ${fleetId}`);
    } catch (error) {
      print.error(`Error registering vehicle: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
};