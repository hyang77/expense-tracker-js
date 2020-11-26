const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000
// include routes
const expenseRoutes = require('./routes/expense')

// expense routes
app.use('/expense', expenseRoutes)
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Got a get request!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})