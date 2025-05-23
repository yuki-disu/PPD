const User = require('../models/userModel');
const userController = require('../Controllers/userController');
const appError = require('../utilities/appError');
const Estate = require('../models/estatesModel');
const catchAsync = require('../utilities/catchAsync');
const sendEmail = require('../utilities/email');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const { Op } = require('sequelize');
const AppError = require('../utilities/appError');

exports.signToken = (id) => {
  return jwt.sign(
    { id, iat: Math.floor(Date.now() / 1000) },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );
};

exports.createSendToken = (user, statusCode, res) => {
  // Generate token
  const token = this.signToken(user.id);

  // Set up cookie options
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRESIN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;
  user.passwordChangedAt = undefined;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  if(req.body.role === 'admin') {
    return next(new appError('You cannot create an admin account', 400));
  }
  
  // Check if the user already exists
  const newUser = await User.createUser(req.body);

  console.log(newUser);

  if (!newUser) {
    return next(new appError('User creation failed', 400));
  }

  // Make sure this.createSendToken is a function available within your controller or module
  this.createSendToken(newUser, 200, res); // Send the token response
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new appError('Please provide email and password', 400));
  }

  let user = await User.findOne({
    where: { email: email },
  });
  console.log(user);

  if (!user) {
    user = await User.findOne({
      where: { username: email },
    });
    if (!user) {
      return next(new appError('Incorrect email or password', 401));
    }
  }

  const isPasswordCorrect = await user.correctPassword(password);

  if (!isPasswordCorrect)
    return next(new AppError('Incorrect email or password', 401));

  this.createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1️ Get token
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }

  // 2️ Verify token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return next(new AppError('Invalid or expired token. Please log in again.', 401));
  }

  // 3️ Check if user still exists
  const currentUser = await User.findByPk(decoded.id);
  if (!currentUser) {
    return next(new AppError('The user belonging to this token no longer exists.', 401));
  }

  // 4️ Check if user changed password after token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('User recently changed password! Please log in again.', 401));
  }

  // Grant access to protected route
  req.user = currentUser;
  console.log("Authenticated user ID:", req.user.id); // Safe logging
  next();
});

// IS OWNER MIDDLEWARE
exports.isOwner = catchAsync(async (req, res, next) => {
  const estateId = req.params.id;
  const userId = req.user.id;
  const userRole = req.user.role;

  // Admins can bypass ownership check
  if (userRole === 'admin') {
    console.log("Admin access granted for user ID:", userId);
    return next();
  }

  // First, find the estate by its ID only
  const estate = await Estate.findByPk(estateId);

  if (!estate) {
    return next(new AppError('Estate not found.', 404));
  }

  // Then, check if the logged-in user is the owner
  if (estate.ownerId !== userId) {
    return next(new AppError('You do not have permission to perform this action', 403));
  }

  console.log(`User ID ${userId} is confirmed as owner of Estate ID ${estateId}`);
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin','company']
    if (!roles.includes(req.user.role)) {
      return next(
        new appError('You do not have permission to perform this action', 403),
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({
    where: {
      [Op.or]: [
        { email: req.body.email || null },
        { username: req.body.username || null }, // was wrong, you wrote `req.params.username`
      ],
    },
    attributes: {
      exclude: [
        'password',
        'passwordChangedAt',
        'passwordResetToken',
        'passwordResetExpires',
      ],
    },
  });

  if (!user) {
    return next(new AppError('There is no user with that email address or username.', 404));
  }

  // Generate reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validate: false }); // Save the reset token to the database!

  // Send token to user's email
  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
  const message = `Forgot your password? Submit a PATCH request with your new password to: ${resetURL}.\nIf you didn't request this, please ignore this email.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    // If email fails, remove reset token
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await user.save({ validate: false });

    return next(
      new AppError('There was an error sending the email: ' + err.message, 500),
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  const user = await User.findOne({
    where: {
      passwordResetToken: hashedToken,
      passwordResetExpires: { [Op.gt]: new Date() },
    },
  });

  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  if (!req.body.password || !req.body.passwordConfirm) {
    return next(new appError('Please provide a password and a password confirmation', 400));
  }
  if (req.body.password !== req.body.passwordConfirm) {
    return next(new appError('Passwords do not match', 400));
  }
  // Update password and reset token

  user.password = req.body.password;
  user.passwordResetToken = null;
  user.passwordResetExpires = null;
  user.passwordChangedAt = new Date();

  await user.save({ validate: false });

  this.createSendToken(user, 200, res); // Automatic login after password reset
});




exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1️ Validate input
  if (!req.body.passwordCurrent)
    return next(new appError('Please provide a your current password', 400));
  if (!req.body.password)
    return next(new appError('Please provide a password', 400));
  if (!req.body.passwordConfirm)
    return next(new appError('Please provide a password confirmation', 400));
  if (req.body.password !== req.body.passwordConfirm)
    return next(new appError('Passwords do not match', 400));

  // 2️ Get user from collection
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return next(
      new appError(
        'You are not logged in! Please log in to update your password.',
        401,
      ),
    );
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findByPk(decoded.id);

  if (!user) {
    return next(new appError('User not found', 404));
  }

  // 3️ Check if password is correct
  const isPasswordCorrect = await user.correctPassword(
    req.body.passwordCurrent,
    user.password,
  );
  if (!isPasswordCorrect) {
    return next(new appError('Incorrect password', 401));
  }

  //4 ️ Update password
  user.password = req.body.password;
  user.passwordConfirm = null; // Clear passwordConfirm field

  user.passwordChangedAt = new Date(Date.now() + 1000); // Set passwordChangedAt to now
  await user.save({ validate: false }); // Save the user without validation

  // 5️ Log user in & send JWT
  this.createSendToken(user, 200, res);
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1️ Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new appError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400,
      ),
    );
  }

  // 2️ Filter out unwanted fields names that are not allowed to be updated
  const allowedFields = [
    'username',
    'email',
    'role',
    'phone',
    'firstname',
    'lastname',
  ]; // Add other fields you want to allow
  const filteredBody = {};
  Object.keys(req.body).forEach((key) => {
    if (allowedFields.includes(key)) {
      filteredBody[key] = req.body[key];
    }
  });

  // 3️ Prevent role change to admin
  if (filteredBody.role === 'admin') {
    return next(new appError('You cannot change your role', 400));
  }

  // 4️ Update user document
  const updatedUser = await User.findByPk(req.user.id);
  if (!updatedUser) {
    return next(new appError('User not found', 404));
  }

  await updatedUser.update(filteredBody);

  // 5️ Send response
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {

  if (!req.body.password || !req.body.passwordConfirm) {
    return next(new appError('Please provide a password and a password confirmation', 400));
  }

  const isPasswordCorrect = await req.user.correctPassword(
    req.body.password,
    req.user.password,
  );
  if (!isPasswordCorrect) {
    return next(new appError('Incorrect password', 401));
  }
  

  if(req.body.password !== req.body.passwordConfirm) {
    return next(new appError('Passwords do not match', 400));
  }


  await User.update(
    { active: false },
    {
      where: {
        id: req.user.id,
      },
    },
  );

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
