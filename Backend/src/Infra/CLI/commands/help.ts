import type { GluegunToolbox } from "gluegun";

module.exports = {
	name: "help",
	alias: ["h"],
	description: "Display help information",
	run: async (toolbox: GluegunToolbox) => {
		const { print } = toolbox;

		print.info("Fleet Management CLI");
		print.info("-------------------");
		print.info("Usage:");
		print.info("  fleet create <userId>");
		print.info("  fleet register-vehicle <fleetId> <vehiclePlateNumber>");
		print.info(
			"  fleet localize-vehicle <fleetId> <vehiclePlateNumber> <lat> <lng> [alt]",
		);
		print.info("");
		print.info("Options:");
		print.info("  --help, -h     Show this help message");
		print.info("  --version, -v  Show version information");
	},
};
