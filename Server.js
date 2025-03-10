const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION , shuting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

mongoose.set('strictQuery', true);

// const DB = process.env.DATABASE.replace(
//     '<db_password>',
//     process.env.DATABASE_PASSWORD
// );

DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION , shuting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
