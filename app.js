const express = require('express');
const morgan = require('morgan');

const AppError = require('./utilities/appError');
const houseRouter = require('./Routes/houseRouts');
const userRouter = require('./Routes/userRoutes');
const globaleErrorHandler = require("./Controllers/errorController");


const app = express();

//1) middlewares
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req,res,next) =>{
    req.requestTime = new Date().toISOString();
    console.log(req.headers);

    next();
});

//  routs
app.use('/api/v1/houses', houseRouter);
app.use('/api/v1/users', userRouter);
 
app.all('*', (req,res,next) =>{
    // res.status(404).json({
    //     status: 'fail',
    //     message: `Cant find ${req.originalUrl} on this server`
    // });
    next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
});

app.use(globaleErrorHandler);

module.exports = app;
 