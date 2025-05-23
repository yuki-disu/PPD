const Sequelize = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path as necessary
const AppError = require('../utilities/appError');

const Reviews = sequelize.define('reviews', {
      id: {
        type: Sequelize.DataTypes.CHAR(36),
        primaryKey: true,
        defaultValue: Sequelize.DataTypes.UUIDV4
      },
      user_id: {
        type: Sequelize.DataTypes.CHAR(36),
        allowNull: false
      },
      estate_id: {
        type: Sequelize.DataTypes.CHAR(36),
        allowNull: false
      },
      rating: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5
        }
      },
      review: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW
      }
    }, {
      tableName: 'reviews',
      timestamps: false
    });

    module.exports = Reviews;