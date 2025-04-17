import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config";

interface LocationAttributes {
  id: string;
  latitude: number;
  longitude: number;
  altitude?: number;
  vehicleSerialNumber: string; // Ajout de cette propriété
  createdAt?: Date;
  updatedAt?: Date;
}

interface LocationCreationAttributes
  extends Optional<
    LocationAttributes,
    "id" | "altitude" | "createdAt" | "updatedAt"
  > {}

class Location
  extends Model<LocationAttributes, LocationCreationAttributes>
  implements LocationAttributes
{
  public id!: string;
  public latitude!: number;
  public longitude!: number;
  public altitude?: number;
  public vehicleSerialNumber!: string; // Ajout de cette propriété
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Location.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 7),
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DECIMAL(10, 7),
      allowNull: false,
    },
    altitude: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    vehicleSerialNumber: { // Ajouter cette propriété
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: "Location",
    tableName: "locations",
  },
);

export default Location;