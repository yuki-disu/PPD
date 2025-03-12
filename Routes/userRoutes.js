const express = require('express');
const userController = require('../Controllers/userController');
const authController = require('../Controllers/authController');

const Router = express.Router();

Router.post('/signup', authController.signUp);
Router.post('/login', authController.login);

Router.post('/forgotPassword', authController.forgotPassword);
Router.patch('/resetPassword/:token', authController.resetPassword);

Router.patch('/updateMyPassword',authController.protect,authController.updatePassword);

Router.patch('/updateMe',authController.protect,userController.updateMe);
Router.delete('/deleteMe',authController.protect,userController.DeleteMe);


Router
 .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)
    
Router
 .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)
    
    module.exports = Router;