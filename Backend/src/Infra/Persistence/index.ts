import { InMemoryVehicleRepository } from "./InMemory/InMemoryVehicleRepository";
import { InMemoryFleetRepository } from "./InMemory/InMemoryFleetRepository";

import { DatabaseFleetRepository } from "./Database/DatabaseFleetRepository";
import { DatabaseVehicleRepository } from "./Database/DatabaseVehicleRepository";

import { testConnection, syncDatabase } from "./Database/orm";

export const configure = (mode: string = 'memory') => {
	let vehicles, fleets;
	// if (false && mode === 'memory' || process.env.NODE_ENV === "test") {
	if (false) {
		// Use inMemory Behavior
		mode = "inMemory";
		vehicles = new InMemoryVehicleRepository();
		fleets = new InMemoryFleetRepository();
	} else {
		// Use Postgres Behavior
		mode = "postgres";
        // Initialiser la connexion à la base de données
        testConnection()
            .then(() => syncDatabase(false)) // false = don't force drop and create database table
            .catch(err => {
                console.error("Database initialization failed:", err);
        });
		vehicles = new DatabaseVehicleRepository();
		fleets = new DatabaseFleetRepository();
	}
	console.log(`Using ${mode} mode for repositories`);
	return { vehicleRepository: vehicles, fleetRepository: fleets };
};
