const { request } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
// Include models
const Expense = require('../models/expense');

// get all expenses
router.get('/', function (req, res, next) {
    res.send('Got a get request for all expenses!')
})

// get an expense
router.get('/:expenseId', function (req, res, next) {
    const id = req.params.expenseId;
    Expense.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err});
        })
})
// create an expense
router.post('/add', function (req, res, next) {
    const expense = new Expense({
        _id: new mongoose.Types.ObjectId(),
        type: req.body.type,
        date: req.body.date,
        amount: req.body.amount,
        category: req.body.category,
        memo: req.body.memo
    });
    expense
        .save()
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err)
        })
    res.status(201).json({
        message: 'Handling POST request to /expense/add',
        createExpense: expense
    })
})
// edit an expense
router.patch('/edit/:expenseId', function (req, res, next) {
    res.send('Got a patch request for an expense!')
})
// delete an expense
router.delete('/delete/:expenseId', function (req, res, next) {
    res.send('Got a delete request for an expense!')
})

module.exports = router;