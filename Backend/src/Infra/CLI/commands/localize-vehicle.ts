import { Location } from "../../../Domain/Location/Location";
import { FleetManager } from "../../../../src/App/index";
import { type GluegunToolbox } from "../../../types/Gluegun";

module.exports = {
	name: "localize-vehicle",
	description: "Localize a vehicle at specific coordinates",
	run: async (toolbox: GluegunToolbox) => {
		const { parameters, print } = toolbox;
		const fleetId = parameters.first;
		const vehicleSerialNumber = parameters.second;
		const lat = parameters.third;
		const lng = parameters.options.lng || parameters.fourth;
		const alt = parameters.options.alt || parameters.fifth;

		if (!fleetId || !vehicleSerialNumber || !lat || !lng) {
			console.log('fdr:', parameters.fourth);
			print.error(
				"Fleet ID, vehicle plate number, latitude and longitude are required",
			);
			return;
		}

		try {
			const parsedLat = Number.parseFloat(lat);
			const parsedLng = Number.parseFloat(lng);
			const parsedAlt = alt ? Number.parseFloat(alt) : undefined;

			if (
				isNaN(parsedLat) ||
				isNaN(parsedLng) ||
				(parsedAlt !== undefined && isNaN(parsedAlt))
			) {
				print.error("Latitude, longitude and altitude must be valid numbers");
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

			print.success(
				`Vehicle ${vehicleSerialNumber} localized at ${location.toString()}`,
			);
		} catch (error) {
			print.error(
				`Error localizing vehicle: ${error instanceof Error ? error.message : String(error)}`,
			);
		}
	},
};
