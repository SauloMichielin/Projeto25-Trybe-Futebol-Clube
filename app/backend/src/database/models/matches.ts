import { Model, DataTypes } from 'sequelize';
import db from '.';
import teams from './teams';

class matches extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}
matches.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  homeTeamId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  homeTeamGoals: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  awayTeamId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  awayTeamGoals: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  inProgress: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
  },
}, {
  sequelize: db, modelName: 'matches', underscored: true, timestamps: false,
});

matches.belongsTo(teams, { as: 'homeTeam', foreignKey: 'homeTeamId' });
matches.belongsTo(teams, { as: 'awayTeam', foreignKey: 'awayTeamId' });

export default matches;
