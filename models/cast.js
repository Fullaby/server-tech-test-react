'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cast extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Movie,{foreignKey: 'movieId'})
    }
  }
  Cast.init({
    movieId: {type: DataTypes.INTEGER,
    allowNull:false,
  validate:{
    notEmpty: {
      msg: 'movieId is required'
    },
    notNull:{
      msg: 'movieId is required'
    }
  }},
    name: {type: DataTypes.STRING,
    allowNull:false,
  validate:{
    notEmpty: {
      msg: 'name is required'
    },
    notNull:{
      msg: 'name is required'
    }
  }},
    profilePict: {type: DataTypes.STRING,
    allowNull:false,
  validate:{
    notEmpty: {
      msg: 'profilePict is required'
    },
    notNull:{
      msg: 'profilePict is required'
    }
  }}
  }, {
    sequelize,
    modelName: 'Cast',
  });
  return Cast;
};