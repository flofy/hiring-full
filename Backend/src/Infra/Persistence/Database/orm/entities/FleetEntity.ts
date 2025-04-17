import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config";

interface FleetAttributes {
  id: number; // Utilisez number pour un INTEGER auto-incrémenté
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface FleetCreationAttributes
  extends Optional<FleetAttributes, "id" | "createdAt" | "updatedAt"> {}

class Fleet
  extends Model<FleetAttributes, FleetCreationAttributes>
  implements FleetAttributes
{
  public id!: number;
  public userId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Fleet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // Modifié pour être un INTEGER auto-incrémenté
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Fleet",
    tableName: "fleets",
  },
);

export default Fleet;