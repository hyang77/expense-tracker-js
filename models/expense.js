const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const objectId = Schema.Types.ObjectId;

const expense = Schema({
    _id: objectId,
    type: String,
    date: Date,
    amount: Number,
    category: String,
    memo: String
});

module.exports = mongoose.model('Expense', expense);
