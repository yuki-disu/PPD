const fs = require('fs');
const appError = require('../utilities/appError');
const User = require('../models/userModel');
const catchAsync = require('../utilities/catchAsync');

const filterObj = (obj,...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el =>{
    if(allowedFields.includes(el)) newObj[el] = obj[el];
  });
return newObj;
};

const getAllUsers =catchAsync( async (req, res,next) => {
  const users = await User.find();

  //send response
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });

});

const updateMe =catchAsync( async (req, res, next) => {
  // Create an error if user posts password data
  if(req.body.password || req.body.passwordConfirm ){
    next(new appError('This route is not for password updates, please use /updateMyPasswords',400 ))
  }
  // fillered out unwanted field that not allowed to be updated
  const filteredBody = filterObj(req.body, 'name','email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id,filteredBody,{new: true, runValidators : true});
   //update user document
  res.status(200).json({
  status: 'success',
  data: {
    user : updatedUser
  }
  });
});

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This rout is not yet definded',
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This rout is not yet definded',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This rout is not yet definded',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This rout is not yet definded',
  });
};
module.exports = {
  updateMe,
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
};
