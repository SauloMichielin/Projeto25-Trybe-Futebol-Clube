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
    defaultValue: 'true',
  },
}, {
  sequelize: db, modelName: 'matches', underscored: true, timestamps: false,
});

matches.belongsTo(teams, { foreignKey: 'homeTeamId', as: 'homeTeam' });
matches.belongsTo(teams, { foreignKey: 'awayTeamId', as: 'awayTeam' });
teams.hasMany(matches, { foreignKey: 'awayTeamId', as: 'awayMatches' });
teams.hasMany(matches, { foreignKey: 'homeTeamId', as: 'homeMatches' });

export default matches;
