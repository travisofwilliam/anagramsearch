const express = require('express')
const Words = require('../../models/Word')
const { getLettersQuery } = require('../../words/words')
const SearchRouter = express.Router()

SearchRouter.get('/:tiles', (req, res) => {
  const { tiles: requestTiles } = req.params
  const tiles = requestTiles.toLowerCase()
  const query = getLettersQuery(tiles)

  Words.find(query)
    .then((words) => {
      res.send(words.map(w => w.word))
    })
    .catch(err => res.status(500).send(err))
})

module.exports = SearchRouter