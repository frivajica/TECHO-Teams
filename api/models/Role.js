const Sequelize = require("sequelize");
const db = require("../config/database");

class Role extends Sequelize.Model {}

Role.init(
  {
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
    }
  },
  { sequelize: db, modelName: "roles" }
  );
  
  module.exports = Role;