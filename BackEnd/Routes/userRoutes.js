const express = require('express');
const authController = require('../Controllers/authController');
const userController = require('../Controllers/userController')
const cloudinary = require('../config/cloudinary');


const Router = express.Router();

Router.post('/signup',
    cloudinary.uploadUserImage,           // multer.single('image')
    cloudinary.resizeAndUploadUserImage,  // cloudinary upload middleware
    authController.signup
);

Router.post('/login',authController.login);

Router.post('/forgotPassword',authController.forgotPassword);
Router.patch('/resetPassword/:token',authController.resetPassword);
Router.patch('/updateMyPassword',authController.protect,authController.updatePassword);


Router.patch('/updateMe',authController.protect,authController.updateMe);
Router.delete('/deleteMe',authController.protect,authController.deleteMe);

Router.get("/relatedEstates",authController.protect,userController.getUserThings);


Router
 .route('/')
    .get(authController.protect,userController.getAllUsers)
    
Router
 .route('/:id')
    .get(authController.protect,userController.getUser)

//     Router
//  .route('/')
//     .get(authController.protect,authController.restrictTo('admin'),userController.getAllUsers)
    
// Router
//  .route('/:id')
//     .get(authController.protect,authController.restrictTo('admin'),userController.getUser)

    
    module.exports = Router;