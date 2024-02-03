'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Variant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Variant.belongsTo(models.Image)
    }
  }
  Variant.init({
    title: DataTypes.STRING,
    ImageId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Variant',
  });
  return Variant;
};