const mongoose = require('mongoose');
const express = require('express');
const ApiRouter = require('./api/index')

const app = express()

const connectionString = 'mongodb://test:abc123@ds261817.mlab.com:61817/anagram'
mongoose.connect(connectionString, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected to database'))
  .catch(err => console.log(err))

app.use('/api', ApiRouter)
app.listen(3000, () => console.log('Server running on port 3000'))
