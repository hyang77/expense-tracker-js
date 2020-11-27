const { request } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
// Include models
const Expense = require('../models/expense');

// get all expenses
router.get('/', function (req, res, next) {
    Expense.find()
        .exec()
        .then(docs => {
            console.log(docs);
            // if (docs.length > 0) {
               res.status(200).json(docs); 
            // } else {
            //     res.status(404).json({ message: 'No Entries Found'});
            // }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
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
            res.status(500).json({ error: err });
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
            res.status(201).json({
                message: 'Handling POST request to /expense/add',
                createExpense: expense
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
})

// edit an expense
router.patch('/edit/:expenseId', function (req, res, next) {
    const id = req.params.expenseId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
        console.log(updateOps);
    };
    
    Expense.updateMany({_id: id}, {$set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
})

// delete an expense
router.delete('/delete/:expenseId', function (req, res, next) {
    const id = req.params.expenseId;
    Expense.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
})

module.exports = router;