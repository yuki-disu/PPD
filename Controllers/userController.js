const User = require('../models/userModel');
const AppError = require('../utilities/appError');
const catchAsync = require('../utilities/catchAsync');
const { Op } = require('sequelize');

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const { count, rows: users } = await User.findAndCountAll({
        attributes: { exclude: ['password', 'passwordChangedAt', 'passwordResetToken', 'passwordResetExpires'] },
        where: { active: true },
    });

    res.status(200).json({
        status: 'success',
        results: count,
        data: {
            users
        }
    });
});

exports.getUser = catchAsync(async (req, res, next) => {
    const user = await User.findOne({
        where: {
            [Op.or]: [
                { email: req.params.id },
                { username: req.params.id }
            ]
        },
        attributes: { exclude: ['password', 'passwordChangedAt', 'passwordResetToken', 'passwordResetExpires'] },
    });

    if (!user) {
        return next(new AppError('No user found with that email or name.', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            user,
        },
    });
});

