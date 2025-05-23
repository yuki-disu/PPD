const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const AppError = require('../utilities/appError');
const catchAsync = require('../utilities/catchAsync');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { userSchema } = require('../Validators/userValidator');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Please provide your name'
            }
        },
        unique: {
            msg: 'This UserName is already in use'
        }
    },
    image: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    firstname: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: 'User',
    },
    lastname: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: 'User',
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: {
            msg: 'This email is already in use'
        },
        validate: {
            isEmail: {
                msg: 'Please provide a valid email address'
            }
        }
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            len: {
                args: [8, 255],
                msg: 'Password must be at least 8 characters long'
            }
        }
    },
    passwordConfirm: {
        type: DataTypes.VIRTUAL,
        validate: {
            isMatch(value) {
                if (value !== this.password) {
                    throw new Error('Passwords do not match');
                }
            }
        }
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
        unique: {
            msg: 'This phone number is already in use'
        }
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        allowNull: false,
        defaultValue: 'user',
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    passwordResetToken: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    passwordResetExpires: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    passwordChangedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    tableName: 'users',
    timestamps: false,
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 12);
          user.passwordChangedAt = new Date();
          user.passwordConfirm = undefined;
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 12);
          user.passwordChangedAt = new Date();
          user.passwordConfirm = undefined;
        }
      },
      //make it exelude if active is false
      beforeFind: async (options) => {
        if (!options.where) {
          options.where = {};
        }
        options.where.active = true;
      }
    }
});

// Instance method to check password
User.prototype.correctPassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Instance method to check if password was changed after a timestamp
User.prototype.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

// Instance method to create a reset token
User.prototype.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex'); // Generate token
  
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex'); // Hash token
    this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // Expires in 10 minutes
  
    return resetToken;
};

// Static method to create user
User.createUser = async function(data) {
    // Validate input data
    
    const { error, value: userData } = userSchema.validate(data, { 
        abortEarly: false,
        stripUnknown: true 
    });
    
    
    if (error) {
        throw new AppError(error.details.map((err) => err.message).join(', '), 400);
    }

    try {
        const newUser = await User.create(userData);

        console.log(newUser);
        
        newUser.password = undefined;
        newUser.passwordChangedAt = undefined;

        return {
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
                image: newUser.image,
                
            },
        };
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            const duplicateField = err.errors[0].path;
            throw new AppError(`Duplicate field value: ${duplicateField}. Please use another value.`, 400);
        }
        throw err;
    }
};

// We don't define relationships here to avoid circular dependencies

module.exports = User;