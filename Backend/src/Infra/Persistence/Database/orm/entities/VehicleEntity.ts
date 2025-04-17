import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config";

interface VehicleAttributes {
  serialNumber: string;
  fleetId: number | null;
  createdAt?: Date;
  updatedAt?: Date;
  // Suppression de locationId car la relation sera gérée par la table Location
}

interface VehicleCreationAttributes
  extends Optional<VehicleAttributes, "fleetId" | "createdAt" | "updatedAt"> {}

class Vehicle
  extends Model<VehicleAttributes, VehicleCreationAttributes>
  implements VehicleAttributes
{
  public serialNumber!: string;
  public fleetId!: number | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Vehicle.init(
  {
    serialNumber: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    fleetId: {
      type: DataTypes.INTEGER, // S'assurer que c'est INTEGER si votre Fleet.id est un INTEGER
      allowNull: true,
      references: {
        model: "fleets",
        key: "id",
      },
    }
    // Suppression de locationId
  },
  {
    sequelize,
    modelName: "Vehicle",
    tableName: "vehicles",
  },
);

export default Vehicle;