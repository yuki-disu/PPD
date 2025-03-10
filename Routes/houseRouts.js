const express = require('express');
const houseController = require('../Controllers/houseController');
const authController = require('../Controllers/authController');
const Router = express.Router();

// Router.param('body', houseController.checkBody);

//aliasing using middleware

Router.route('/house-stats').get(houseController.getHouseStats); // Corrected method name

Router.route('/')
  .get(authController.protect,houseController.getAllTHouses) // Corrected method name
  .post(houseController.createHouse);

Router.route('/:id')
  .get(houseController.getHouse)
  .patch(houseController.updateHouse)
  .delete(houseController.deleteHouse);

module.exports = Router;
