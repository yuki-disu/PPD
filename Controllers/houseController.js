const { query } = require('express');
const House = require('../models/houseModel');
const APIFeatures = require('../utilities/apiFeatures');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/appError');

const getAllTHouses = catchAsync(async (req, res, next) => {
  console.log(req.query);

  //execute query
  const features = new APIFeatures(House.find(), req.query)
    .fillter()
    .sort()
    .limitFields()
    .paginate();

  const houses = await features.query;

  //send response
  res.status(200).json({
    status: 'success',
    results: houses.length,
    data: {
      houses,
    },
  });
});

const getHouse = catchAsync(async (req, res, next) => {
  const house = await House.findById(req.params.id);
  //House.findOne({_id : req.params.id})
  if (!house) {
    return next(new AppError('No house found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      house,
    },
  });
});

const createHouse = catchAsync(async (req, res, next) => {
  const newHouse = await House.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      house: newHouse,
    },
  });
});

const updateHouse = catchAsync(async (req, res, next) => {
  const house = await House.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!house) {
    return next(new AppError('No house found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      house,
    },
  });
});

const deleteHouse = catchAsync(async (req, res, next) => {
  const house = await House.findByIdAndDelete(req.params.id);

  if (!house) {
    return next(new AppError('No house found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

const getHouseStats = catchAsync(async (req, res, next) => {
  const stats = await House.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numHouses: { $sum: 1 },
        numOfRatings: { $sum: '$ratingsQuantity' },
        averageRating: { $avg: '$ratingsAverage' },
        averagePrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: {
        averagePrice: 1,
      },
    },
    //   {
    //       $match : { _id: { $ne:'EASY'} }
    // }
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});



module.exports = {
  getHouseStats,
  getAllTHouses,
  getHouse,
  createHouse,
  updateHouse,
  deleteHouse,
};
