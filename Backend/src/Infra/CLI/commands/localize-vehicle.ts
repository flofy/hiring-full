import { GluegunToolbox } from 'gluegun';
import { Location } from '../../../Domain/Location/Location';
import { FleetManager } from '../../../../src/App/index';

module.exports = {
  name: 'localize-vehicle',
  description: 'Localize a vehicle at specific coordinates',
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, print } = toolbox;
    const fleetId = parameters.first;
    const vehicleSerialNumber = parameters.second;
    const lat = parameters.third;
    const lng = parameters.options.lng; // || parameters.fourth;
    const alt = parameters.options.alt; // || parameters.fifth;

    if (!fleetId || !vehicleSerialNumber || !lat || !lng) {
      print.error('Fleet ID, vehicle plate number, latitude and longitude are required');
      return;
    }

    try {
      const parsedLat = parseFloat(lat);
      const parsedLng = parseFloat(lng);
      const parsedAlt = alt ? parseFloat(alt) : undefined;

      if (isNaN(parsedLat) || isNaN(parsedLng) || (parsedAlt !== undefined && isNaN(parsedAlt))) {
        print.error('Latitude, longitude and altitude must be valid numbers');
        return;
      }

      const location = new Location({lat:parsedLat, lng:parsedLng, alt:parsedAlt});
      const fleetManager = FleetManager.getInstance();
      fleetManager.setLocation(fleetId, vehicleSerialNumber, {latitude: parsedLat, longitude: parsedLng, alt: parsedAlt});
      
      print.success(`Vehicle ${vehicleSerialNumber} localized at ${location.toString()}`);
    } catch (error) {
      print.error(`Error localizing vehicle: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
};