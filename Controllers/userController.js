const fs = require('fs');

const User = require('../models/userModel');
const catchAsync = require('../utilities/catchAsync');


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
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This rout is not yet definded',
  });
};
const creatUser = (req, res) => {
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
  getAllUsers,
  getUser,
  creatUser,
  updateUser,
  deleteUser,
};
