import { sequelize, testConnection } from "./config";

import Fleet from "./entities/FleetEntity";
import Vehicle from "./entities/VehicleEntity";
import Location from "./entities/LocationEntity";

import { defineAssociations } from "./link";


// Fonction pour synchroniser les modèles avec la base de données
const syncDatabase = async (force = false): Promise<void> => {
	try {
		
		if (force) {
            console.log("Dropping all tables...");
            await Fleet.sync({ force });
            await Vehicle.sync({ force });
            await Location.sync({ force });
        }
        // await defineAssociations();
		// await sequelize.sync({ force });
		console.log("Database synchronized successfully.");
	} catch (error) {
		console.error("Unable to synchronize the database:", error);
	}
};

export { sequelize, testConnection, Fleet, Vehicle, Location, syncDatabase};
