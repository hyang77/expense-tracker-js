const express = require('express')
const router = express.Router();

// view all expenses
router.get('/', function (req, res, next) {
    res.send('Got a get request for all expenses!')
})

// get an expense
router.get('/:expenseId', function (req, res, next) {
    res.send('Got a get request for an expense!')
})
// create an expense
router.post('/:expenseId', function (req, res, next) {
    res.send('Got a post request for an expense!')
})
// edit an expense
router.patch('/:expenseId', function (req, res, next) {
    res.send('Got a patch request for an expense!')
})
// delete an expense
router.delete('/:expenseId', function (req, res, next) {
    res.send('Got a delete request for an expense!')
})

module.exports = router;