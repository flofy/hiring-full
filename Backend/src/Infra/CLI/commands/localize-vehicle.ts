import { Command } from 'commander';
import { Location } from "../../../Domain/Location/Location";
import { FleetManager } from "../../../App/index";

// Fonction d'exportation qui sera appelée par le fichier cli.ts
export function configureCommand(program: Command) {
  program
    .command('localize-vehicle')
    .description('Localize a vehicle at specific coordinates')
    .argument('<fleetId>', 'Fleet ID')
    .argument('<vehicleSerialNumber>', 'Vehicle serial number')
    .argument('<latitude>', 'Latitude coordinate')
    .argument('<longitude>', 'Longitude coordinate')
    .option('--alt <altitude>', 'Optional altitude')
    .action(async (fleetId, vehicleSerialNumber, lat, lng, options) => {
      try {
        const parsedLat = Number.parseFloat(lat);
        const parsedLng = Number.parseFloat(lng);
        const parsedAlt = options.alt ? Number.parseFloat(options.alt) : undefined;

        if (
          isNaN(parsedLat) ||
          isNaN(parsedLng) ||
          (parsedAlt !== undefined && isNaN(parsedAlt))
        ) {
          console.error("Latitude, longitude and altitude must be valid numbers");
          return;
        }

        const location = new Location({
          lat: parsedLat,
          lng: parsedLng,
          alt: parsedAlt,
        });
        
        const fleetManager = await FleetManager.getInstance();
        fleetManager.setLocation(
          Number.parseFloat(fleetId),
          vehicleSerialNumber,
          { latitude: parsedLat, longitude: parsedLng, altitude: parsedAlt },
        );

        console.log(`Vehicle ${vehicleSerialNumber} localized at ${location.toString()}`);
      } catch (error) {
        console.error(
          `Error localizing vehicle: ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    });
  
  return program;
}