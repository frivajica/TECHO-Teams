const Sequelize = require("sequelize");
const db = require("../config/database");

class Role extends Sequelize.Model {}

Role.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    activo: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  },
  { sequelize: db, modelName: "roles" }
  );
  
  module.exports = Role;