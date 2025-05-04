// modelAssociations.js
// This file sets up all relationships between models
// Import all models
const User = require('./userModel');
const Estates = require('./estatesModel');
const Transactions = require('./transactionModel');



// Set up User associations
User.hasMany(Estates, {
    foreignKey: 'owner_id',
    as: 'estates'
});
User.hasMany(Transactions, {
    foreignKey: 'buyer_id',
    as: 'purchases'
});
User.hasMany(Transactions, {
    foreignKey: 'seller_id',
    as: 'sales'
});


// Set up Estates associations
// Note: Estates.belongsTo(User) is already defined in estatesModel.js
Estates.hasMany(Transactions, {
    foreignKey: 'estate_id',
    as: 'transactions'
});


// Set up Transactions associations
Transactions.belongsTo(Estates, {
    foreignKey: 'estate_id',
    as: 'estate'
});

Transactions.belongsTo(User, {
    foreignKey: 'buyer_id',
    as: 'buyer'
});

Transactions.belongsTo(User, {
    foreignKey: 'seller_id',
    as: 'seller'
});

module.exports = {
    User,
    Estates,
    Transactions
};