const mongoose = require('mongoose');
const express = require('express');
const path = require('path')
const ApiRouter = require('./api/index')

const app = express()

const connectionString = 'mongodb://test:abc123@ds261817.mlab.com:61817/anagram'
mongoose.connect(connectionString, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected to database'))
  .catch(err => console.log(err))

app.use('/api', ApiRouter)

var PORT = process.env.PORT || 3000

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
