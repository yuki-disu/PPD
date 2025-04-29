const dotenv = require('dotenv');
const { Sequelize, DataTypes } = require('sequelize');
dotenv.config({ path: './config.env' });

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);

// Create a connection to MySQL without selecting a database
const rootSequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  logging: console.log
});

// Initialize database function
const initializeDatabase = async () => {
  try {
    // First, drop the database if it exists
    await rootSequelize.query(`DROP DATABASE IF EXISTS \`${process.env.DB_NAME}\`;`);
    console.log(`Database '${process.env.DB_NAME}' dropped if it existed.`);
    
    // Then create the database
    await rootSequelize.query(`CREATE DATABASE \`${process.env.DB_NAME}\`;`);
    console.log(`Database '${process.env.DB_NAME}' created.`);
    
    // Close the root connection
    await rootSequelize.close();
    
    // Import the database configuration
    const sequelize = require('./db');
    console.log('Connected to the database!');

    // Define models with consistent CHAR type for UUIDs
// User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  username: {  // Changed from 'name' to 'username'
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  firstname: {  // Added firstname field
    type: DataTypes.STRING(100),
    allowNull: false
  },
  lastname: {  // Added lastname field
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true,
    unique: true
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    allowNull: false,
    defaultValue: 'user'
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  passwordResetToken: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  passwordResetExpires: {
    type: DataTypes.DATE,
    allowNull: true
  },
  passwordChangedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'users',
  timestamps: false
});


    // Estates model
    const Estates = sequelize.define('estates', {
      id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      owner_id: {
        type: DataTypes.CHAR(36),
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM('studio', 'apartment', 'house'),
        allowNull: false,
      },
      numOfRooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      numOfBathroom: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      numOfKitchen: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      garageCapacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      area: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('available', 'sold', 'rented'),
        allowNull: true,
        defaultValue: 'available',
      },
      for_rent: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      imageCover: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      images: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      sold: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      rented: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      visibleHouse: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      centralHeating: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      alarmsAndSecurity: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      fireDetector: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      camera: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      parking: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      electricity: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      gaz: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      closeToTransportation: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      closeToBeach: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      natureView: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      elevator: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      cleaning: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      petsAllowed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      tv: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      dishwasher: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      washingMachine: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      wifi: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      water: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      microwave: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      fridge: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      closeToSchool: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      closeToSupermarket: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      garden: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      balcony: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    }, {
      tableName: 'estates',
      timestamps: false,
    });

    // Transactions model
    const Transactions = sequelize.define('Transaction', {
      id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      estate_id: {
        type: DataTypes.CHAR(36),
        allowNull: false,
      },
      buyer_id: {
        type: DataTypes.CHAR(36),
        allowNull: false,
      },
      seller_id: {
        type: DataTypes.CHAR(36),
        allowNull: false,
      },
      transaction_type: {
        type: DataTypes.ENUM('rent', 'buy'),
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      transaction_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    }, {
      tableName: 'transactions',
      timestamps: false,
    });

    // Reviews model
    const Reviews = sequelize.define('reviews', {
      id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      user_id: {
        type: DataTypes.CHAR(36),
        allowNull: false
      },
      estate_id: {
        type: DataTypes.CHAR(36),
        allowNull: false
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5
        }
      },
      review: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
      tableName: 'reviews',
      timestamps: false
    });
    
    // Define associations
    // User to Estates (one-to-many)
    User.hasMany(Estates, { foreignKey: 'owner_id' });
    Estates.belongsTo(User, { foreignKey: 'owner_id' });
    
    // User to Transactions (as buyer)
    User.hasMany(Transactions, { foreignKey: 'buyer_id', as: 'buyerTransactions' });
    Transactions.belongsTo(User, { foreignKey: 'buyer_id', as: 'buyer' });
    
    // User to Transactions (as seller)
    User.hasMany(Transactions, { foreignKey: 'seller_id', as: 'sellerTransactions' });
    Transactions.belongsTo(User, { foreignKey: 'seller_id', as: 'seller' });
    
    // Estate to Transactions
    Estates.hasMany(Transactions, { foreignKey: 'estate_id' });
    Transactions.belongsTo(Estates, { foreignKey: 'estate_id' });
    
    // User to Reviews
    User.hasMany(Reviews, { foreignKey: 'user_id' });
    Reviews.belongsTo(User, { foreignKey: 'user_id' });
    
    // Estate to Reviews
    Estates.hasMany(Reviews, { foreignKey: 'estate_id' });
    Reviews.belongsTo(Estates, { foreignKey: 'estate_id' });
    
    // Create all tables
    await sequelize.sync({ force: true });
    console.log('All tables successfully created from models');
    
    // Close the Sequelize connection
    await sequelize.close();
    console.log('Database connection closed');
    
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

// Run the initialization
initializeDatabase();