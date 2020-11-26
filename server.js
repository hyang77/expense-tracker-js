const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000
// include routes
const expenseRoutes = require('./routes/expense')
// Parse url-encoded and json bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// expense routes
app.use('/expense', expenseRoutes)
app.use(morgan('dev'));

// Error handling
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status(404);
  next(error);
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      messge: error.message
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})