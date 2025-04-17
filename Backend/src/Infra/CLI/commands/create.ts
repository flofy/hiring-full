import type { GluegunToolbox } from "gluegun";
import { FleetManager } from "../../../../src/App/index";

module.exports = {
	name: "create",
	description: "Create a new fleet for the specified user",
	run: async (toolbox: GluegunToolbox) => {
		const { parameters, print } = toolbox;
		const userId = parameters.first;

		if (!userId) {
			print.error("User ID is required");
			return;
		}

		try {
			const fleetManager = await FleetManager.getInstance();
			const fleetId = fleetManager.createFleet(userId);

			print.info(`Fleet created with ID: ${fleetId}`);
		} catch (error) {
			print.error(
				`Error creating fleet: ${error instanceof Error ? error.message : String(error)}`,
			);
		}
	},
};
