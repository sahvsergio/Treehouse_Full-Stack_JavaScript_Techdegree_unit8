'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book.init(
    {
      title:{ 
        type:DataTypes.STRING,
        validate:{
          notEmpty:{
            msg:"Title is required"
          }

        },
        allowNull: false,
      },
      author: {
        type:DataTypes.STRING,
        validate:{
          notEmpty:{
            msg:"Author is required"
          }
        },
        allowNull: false
      },
      genre: DataTypes.STRING,
      year: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Book",
    }
  );
  return Book;
};