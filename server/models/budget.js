"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class budget extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  budget.init(
    {
      bugetId: DataTypes.STRING,
      budgetName: DataTypes.STRING,
      budget: DataTypes.INTEGER,
      spent: DataTypes.INTEGER,
      color: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "budget",
    }
  );
  return budget;
};
