const express = require('express');
const authController = require('../Controllers/authController');
const userController = require('../Controllers/userController')

const Router = express.Router();

Router.post('/signup',authController.signup);
Router.post('/login',authController.login);

Router.post('/forgotPassword',authController.forgotPassword);
Router.patch('/resetPassword/:token',authController.resetPassword);
Router.patch('/updateMyPassword',authController.protect,authController.updatePassword);


Router.patch('/updateMe',authController.protect,authController.updateMe);
Router.delete('/deleteMe',authController.protect,authController.deleteMe);



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