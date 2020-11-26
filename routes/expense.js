const { request } = require('express');
const express = require('express')
const router = express.Router();

// get all expenses
router.get('/', function (req, res, next) {
    res.send('Got a get request for all expenses!')
})

// get an expense
router.get('/:expenseId', function (req, res, next) {
    res.send('Got a get request for an expense!')
})
// create an expense
router.post('/add', function (req, res, next) {
    const expense = {
        type: req.body.type,
        amount: req.body.amount
    }
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