const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const AppError = require('./utilities/appError');
const houseRouter = require('./Routes/houseRouts');
const userRouter = require('./Routes/userRoutes');
const globaleErrorHandler = require('./Controllers/errorController');
const hpp = require('hpp');

const app = express();

//1)Global middlewares
// Security HTTP headers
app.use(helmet());
// develpment loggin
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//limit request from same api
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body parser, reading data form body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitazation against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

//prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'numOfRooms',
      'numOfBathroom',
      'numOfKitchen',
      'garageCpacity',
      'Area',
      'price',
      'closeToTransportation',
      'closeToBeach',
      'natureVeiw',
      'closeToTransportation',
    ],
  }),
);

//Serving static file
app.use(express.static(`${__dirname}/public`));

//Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);

  next();
});

//  routs
app.use('/api/v1/houses', houseRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //     status: 'fail',
  //     message: `Cant find ${req.originalUrl} on this server`
  // });
  next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
});

app.use(globaleErrorHandler);

module.exports = app;
