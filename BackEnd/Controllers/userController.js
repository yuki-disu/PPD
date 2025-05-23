const User = require('../models/userModel');
const AppError = require('../utilities/appError');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');
const Transaction = require('../models/transactionModel');
const Estate = require('../models/estatesModel');
const catchAsync = require('../utilities/catchAsync');
const { Op } = require('sequelize');

const { User: UserWithAssociations, 
    Estates: EstatesWithAssociations, 
    Transactions: TransactionsWithAssociations } = require('../models/modelsAssociation');

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

exports.getUserThings = catchAsync(async (req, res, next) => {
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
    //all the transactions that the user is involved in


    const estatesTransacted = await TransactionsWithAssociations.findAll({
        where: {
            [Op.or]: [
                { buyer_id: user.id },
                { seller_id: user.id }
            ]
        },
        include: {
            model: EstatesWithAssociations,
            as: 'estate',
            attributes: ['id', 'location', 'price'],
        },
    });


    res.status(200).json({
        status: 'success',
        data: {
            estatesTransacted,
        },
    });
})

