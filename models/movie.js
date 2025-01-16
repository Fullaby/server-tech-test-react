'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User,{foreignKey:'authorId'})
      this.belongsTo(models.Genre,{foreignKey:'genreId'})
      this.hasMany(models.Cast,{foreignKey: 'movieId'})
    }
  }
  Movie.init({
    title: {type: DataTypes.STRING,
    allowNull: false,
  validate:{
    notEmpty: {
      msg: 'title is required'
    },
    notNull:{
      msg: 'title is required'
    }
  }},
    slug: {type: DataTypes.STRING,
    allowNull: false,
  validate:{
    notEmpty: {
      msg: 'slug is required'
    },
    notNull:{
      msg: 'slug is required'
    }
  }},
    synopsis: {type: DataTypes.TEXT,
    allowNull: false,
  validate:{
    notEmpty: {
      msg: 'synopsis is required'
    },
    notNull:{
      msg: 'synopsis is required'
    }
  }},
    trailerUrl: {type: DataTypes.STRING,
    allowNull: false,
  validate:{
    notEmpty: {
      msg: 'trailerUrl is required'
    },
    notNull:{
      msg: 'trailerUrl is required'
    }
  }},
    imgUrl: {type: DataTypes.STRING,
    allowNull: false,
  validate:{
    notEmpty: {
      msg: 'imgUrl is required'
    },
    notNull:{
      msg: 'imgUrl is required'
    }
  }},
    rating: {type: DataTypes.INTEGER,
    allowNull: false,
  validate:{
    notEmpty: {
      msg: 'rating is required'
    },
    notNull:{
      msg: 'rating is required'
    },
   min: {
    args: [1],
    msg: 'rating range min is 1'
   },
   max: {
    args:[5],
    msg: 'rating range max is 5'
   }
  }},
    authorId: {type: DataTypes.INTEGER,
    allowNull: false,
  validate:{
    notEmpty: {
      msg: 'authorId is required'
    },
    notNull:{
      msg: 'authorId is required'
    }
  }},
    genreId: {type: DataTypes.INTEGER,
    allowNull: false,
  validate:{
    notEmpty: {
      msg: 'genreId is required'
    },
    notNull:{
      msg: 'genreId is required'
    }
  }}
  }, {
    sequelize,
    modelName: 'Movie',
  });
  Movie.beforeCreate((instance,options)=>{
    instance.slug= `${instance.title.split(' ').join('-')}`
  })
  return Movie;
};