const express = require('express');
const userController = require('../Controllers/userController');
const authController = require('../Controllers/authController');

const Router = express.Router();

Router.post('/signup', authController.signUp);
Router.post('/login', authController.login);


Router
 .route('/')
    .get(userController.getAllUsers)
    .post(userController.creatUser)
    
Router
 .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)
    
    module.exports = Router;