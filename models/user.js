'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword}= require('../helpers/bcryptHelper');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Movie,{foreignKey:'authorId'})
    }
  }
  User.init({
    username: {type: DataTypes.STRING,
    allowNull: false,
  validate:{
    notEmpty: {
      msg: 'username is required'
    },
    notNull:{
      msg: 'username is required'
    }
  }},
    email: {type: DataTypes.STRING,
    allowNull: false,
    unique:{msg: 'email already used'},
  validate:{
    notEmpty: {
      msg: 'email is required'
    },
    notNull:{
      msg: 'email is required'
    },
    isEmail:{
      msg: 'invalid email format'
    }
  }},
    password: {type: DataTypes.STRING,
    allowNull: false,
  validate:{
    notEmpty: {
      msg: 'password is required'
    },
    notNull:{
      msg: 'password is required'
    }
  }},
    role: {type: DataTypes.STRING,
    allowNull: false,
  validate:{
    notEmpty: {
      msg: 'role is required'
    },
    notNull:{
      msg: 'role is required'
    }
  }},
    phoneNumber: {type: DataTypes.STRING,
    allowNull: false,
  validate:{
    notEmpty: {
      msg: 'phoneNumber is required'
    },
    notNull:{
      msg: 'phoneNumber is required'
    }
  }},
    address: {type: DataTypes.STRING,
    allowNull: false,
  validate:{
    notEmpty: {
      msg: 'address is required'
    },
    notNull:{
      msg: 'address is required'
    }
  }}
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance,options)=>{
    instance.password= hashPassword(instance.password),
    instance.role= "Admin"
  })
  return User;
};