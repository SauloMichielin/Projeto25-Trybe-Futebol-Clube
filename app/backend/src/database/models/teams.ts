import { Model, DataTypes } from 'sequelize';
import db from '.';

class teams extends Model {
  declare id: number;
  declare teamName: string;
}
teams.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  teamName: {
    allowNull: false,
    type: DataTypes.STRING(20),
  },
}, {
  sequelize: db, modelName: 'teams', underscored: true, timestamps: false,
});

export default teams;
