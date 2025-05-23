// estateController.js
const { where } = require('sequelize');
const Estates = require('../models/estatesModel');
const Transaction = require('../models/transactionModel');
const transactionSchema = require('../validators/transactionValidator');
const APIFeatures = require('../utilities/apiFeatures');
const AppError = require('../utilities/appError');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const catchAsync = require('../utilities/catchAsync');
const { CLIENT_RENEG_LIMIT } = require('tls');
const cloudinary = require('../config/cloudinary');





exports.getAllEstates = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const estates = await features.execute(Estates);

  res.status(200).json({
    status: 'success',
    results: estates.length,
    data: {
      estates,
    },
  });
});

exports.getEstate = catchAsync(async (req, res, next) => {
  const estate = await Estates.findByPk(req.params.id);
  if (!estate) {
    return next(new AppError('No estate with this ID', 400));
  }

  res.status(200).json({
    status: 'success',
    data: estate,
  });
});

exports.createNewEstate = catchAsync(async (req, res, next) => {
  // Set owner_id if not provided (but usually you want to use req.user.id from auth)
  if (!req.body.owner_id && req.user) {
    req.body.owner_id = req.user.id;
  }

  // At this point, req.body.imageCover and req.body.images are already set by the middleware
  // No need to upload to Cloudinary here

  const result = await Estates.create(req.body);

  if (!result || typeof result !== 'object') {
    return next(
      new AppError(
        'Failed to save estate. Invalid response from database.',
        500,
      ),
    );
  }

  res.status(201).json({
    status: 'success',
    data: result,
  });
});


exports.deleteEstate = catchAsync(async (req, res, next) => {
  const estate = await Estates.destroy({
    where: { id: req.params.id },
  });

  if (estate) {
    next(new AppError('No estate with this id', 400));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.UpdateEstate = catchAsync(async (req, res, next) => {
  const { id, createdAt, ...updateData } = req.body;

  const affectedRows = await Estates.update(updateData, {
    where: { id: req.params.id },
    individualHooks: true,
  });

  if (affectedRows) next(new AppError('No estate with this ID', 400));

  res.status(200).json({
    status: 'success',
    data: affectedRows,
  });
});

exports.rentEstate = catchAsync(async (req, res, next) => {
  if (req.body.startDate && req.body.endDate) {
    if (new Date(req.body.startDate) >= new Date(req.body.endDate)) {
      return next(new AppError('Start date must be before end date', 400));
    }
  } else if (!req.body.startDate && !req.body.endDate) {
    return next(new AppError('Start date and end date are required', 400));
  }

  const { error } = transactionSchema.validate(req.body, { abortEarly: false });
  const estate = await Estates.findByPk(req.body.estate_id);
  if (!estate) {
    return next(new AppError('No estate with this ID', 400));
  }

  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!req.body.estate_id) {
    return next(new AppError('Estate ID is required', 400));
  }

  console.log(estate.owner_id);

  const transaction = await Transaction.createTransaction({
    id: crypto.randomUUID(),
    buyer_id: decoded.id,
    seller_id: estate.owner_id,
    estate_id: req.body.estate_id,
    transaction_type: 'rent',
    transaction_date: new Date(),
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    amount: req.body.amount,
  });

  console.log(transaction);

  // if (error) {
  //     return next(new AppError( 'Validation Error', error.details.map(err => err.message).join(', '),400));
  // }
  // if (!transaction) {
  //     return next(new AppError('Failed to create transaction',500));
  // }
  res.status(201).json({
    status: 'success',
    data: transaction,
  });
});

exports.rentDays = catchAsync(async (req, res, next) => {
  if(!req.params.id){
    return next(new AppError('House ID is required', 400));
  }

  const transactions = await Transaction.findAll({
    where: {
      estate_id: req.params.id,
      transaction_type: 'rent',
    },
    attributes: ['startDate', 'endDate'],
    raw: true,
  });


  // Format date as YYYY/MM/DD and remove time part
  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formattedTransactions = transactions.map(t => ({
    startDate: formatDate(t.startDate),
    endDate: formatDate(t.endDate),
  }));

  res.status(200).json({
    status: 'success',
    transaction: formattedTransactions,
  });
});
