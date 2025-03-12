const express = require('express');
const houseController = require('../Controllers/houseController');
const authController = require('../Controllers/authController');
const Router = express.Router();

// Router.param('body', houseController.checkBody);

//aliasing using middleware

//Router.route('/house-stats').get(houseController.getHouseStats); // Corrected method name


Router.route('/buyHouse/:id').patch(authController.protect, houseController.buyHouse);

Router.route('/')
  .get(authController.protect, houseController.getAllTHouses) // Corrected method name
  .post(authController.protect,authController.restrictTo('admin','company'),houseController.createHouse);

Router.route('/:id')
  .get(authController.protect,houseController.getHouse)
  .patch(authController.protect,houseController.updateHouse)
  .delete(authController.protect, authController.restrictTo('admin', 'Company'), houseController.deleteHouse);

module.exports = Router;
