import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

// Initialise la connexion Sequelize à PostgreSQL
export const sequelize = new Sequelize(
	process.env.DB_NAME || "fleet_db",
	process.env.DB_USER || "fleet_user",
	process.env.DB_PASSWORD || "fleet_password",
	{
		host: process.env.DB_HOST || "localhost",
		dialect: "postgres",
		port: Number.parseInt(process.env.DB_PORT || "5432"),
		logging: process.env.NODE_ENV !== "production" ? console.log : false,
		define: {
			timestamps: true,
			underscored: true,
		},
	},
);

// Fonction pour tester la connexion à la base de données
export const testConnection = async (): Promise<boolean> => {
	try {
		await sequelize.authenticate();
		console.log("Connection to database has been established successfully.");
		return true;
	} catch (error) {
		console.error("Unable to connect to the database:", error);
		return false;
	}
};