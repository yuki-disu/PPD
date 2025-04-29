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
  if (!req.body.id) {
    req.body.id = crypto.randomUUID();
  }

  // Handle imageCover
  if (req.files && req.files.imageCover) {
    const resultCover = await cloudinary.uploader.upload(
      req.files.imageCover[0].path,
      {
        folder: 'estates',
      },
    );
    req.body.imageCover = resultCover.secure_url;
  }

  // Handle images array
  if (req.files && req.files.images) {
    req.body.images = [];
    for (const file of req.files.images) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'estates',
      });
      req.body.images.push(result.secure_url); // Push each uploaded URL
    }
  }

  const result = await Estates.create(req.body);

  if (!result || typeof result !== 'object') {
    return next(
      new appError(
        'Failed to save estate. Invalid response from database.',
        500,
      ),
    );
  }
  const { createdAt, visibleHouse, ...filteredResult } = result.dataValues;
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
