import Fleet from "./entities/FleetEntity";
import Vehicle from "./entities/VehicleEntity";
import Location from "./entities/LocationEntity";

export const defineAssociations = (): void => {
  try {
    console.log("Defining database associations...");

    // Une flotte a plusieurs véhicules
    Fleet.hasMany(Vehicle, {
      sourceKey: "id", 
      foreignKey: "fleetId",
      as: "fleetVehicles"  // Changé de "vehicles" à "fleetVehicles"
    });

    // Un véhicule appartient à une flotte
    Vehicle.belongsTo(Fleet, {
      foreignKey: "fleetId",
      as: "fleet",
    });

    // Un véhicule a une localisation
    Vehicle.hasOne(Location, {
      sourceKey: "serialNumber", 
      foreignKey: "vehicleSerialNumber",
      as: "location"
    });

    // Une localisation appartient à un véhicule
    Location.belongsTo(Vehicle, {
      foreignKey: "vehicleSerialNumber",
      targetKey: "serialNumber",
      as: "vehicle",
    });

    console.log("Database associations defined successfully");
  } catch (error) {
    console.error("Error defining associations:", error);
    throw error;
  }
};