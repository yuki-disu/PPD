const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');
const houseSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      unique: true,
      trim: true,
      maxlength: [40, 'A location must have less or equal then 40 character'],
      minlength: [10, 'A location must have more or equal then 10 character'],
      required: [true, 'A house must have a location'],
      // validate: [validator.isAlpha, 'house must only contain characters']
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },

    slug: String,

    numOfRooms: {
      type: Number,
      required: [true, 'A house must have number of rooms'],
      min: [1, 'A house cant have less then 1 room'],
    },
    numOfBathroom: {
      type: Number,
      required: [true, 'A house must have number of bathrooms'],
      min: [1, 'A house cant have less then 1 bathroom'],
    },
    numOfKitchen: {
      type: Number,
      min: [1, 'A house cant have less the 1 kitchen'],
    },
    garageCpacity: {
      type: Number,
      required: [true, 'A house must have garage capacity'],
      min: [0, 'Garage cant hold less then 0 vehicle'],
    },
    Area: {
      type: Number,
      required: [true, 'A house must have an area '],
      min: [100, 'A house area cant be less then 100 meter squared'],
    },

    price: {
      type: Number,
      required: [true, 'A house must have a price '],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // only work when creating new doc
          return val < this.price;
        },
        message: 'Discount cant be greater then the price',
      },
    },
    imageCover: {
      type: String,
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    sold: Boolean,
    rented: Boolean,
    visibleHouse: {
      type: Boolean,
      default: true,
    },
    centralHeating: {
      type: Boolean,
      default: false,
    },
    alarmsAndSecurity: {
      type: Boolean,
      default: false,
    },
    fireDetector: {
      type: Boolean,
      default: false,
    },
    camera: {
      type: Boolean,
      default: false,
    },
    parking: {
      type: Boolean,
      default: false,
    },
    electricity: {
      type: Boolean,
      default: false,
    },
    gaz: {
      type: Boolean,
      default: false,
    },
    closeToTransportation: {
      type: Boolean,
      default: false,
    },
    closeToBeach: {
      type: Boolean,
      default: false,
    },
    natureVeiw: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

//Document middleware : runs before .save() and .creat()

// houseSchema.pre('save', function(next){
//     console.log('will save doculent...');
//     next()
// });

// houseSchema.post('save',function(doc, next) {
//     console.log(doc);
//     next();
// })

//QUERY MIDDLEWARE
// houseSchema.pre('find', function(next){

// AGGREGATION MIDDLEWARE

const house = mongoose.model('VillaDZ', houseSchema);

module.exports = house;
