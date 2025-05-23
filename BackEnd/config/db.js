const { Sequelize } = require('sequelize');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

try {
    const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,  
        dialect: 'mysql',
      });

      
      console.log('Connected to the database!');  
      module.exports = sequelize;
      
} catch (error) {
    console.error('Unable to connect to the database:', error);
}




  
