const express = require('express');
const authController = require('../Controllers/authController');
const Router = express.Router();
const estateController = require('../Controllers/estateController');
const cloudinary = require('../config/cloudinary');

// //aliasing using middleware

// Router.route('/buyHouse/:id').patch();
Router.route('/rentHouse').patch(
  authController.protect,
  estateController.rentEstate,
); 


Router.route('/getDays/:id').get(estateController.rentDays); 


Router.route('/')
  .get(estateController.getAllEstates)
  .post(
    authController.protect,
    cloudinary.uploadProductImages,
    cloudinary.resizeAndUploadImages,
    estateController.createNewEstate,
  );
// .post(authController.protect,estateController.createNewEstate);

Router.route('/:id')
  .get(estateController.getEstate)
  .delete(
    authController.protect,
    authController.isOwner,
    estateController.deleteEstate,
  ) //add a middleware to check if the user is an admin or the owner of the estate
  .patch(
    /*authController.protect,authController.isOwner,*/ cloudinary.uploadProductImages,
    cloudinary.resizeAndUploadImages,
    estateController.UpdateEstate,
  ); //add a middleware to check if the user is an admin or the owner of the estate

module.exports = Router;
