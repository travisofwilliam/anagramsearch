const express = require('express')
const bodyParser = require('body-parser')
const Words = require('../../models/Word')

const { getLetters } = require('../../words/words')

const WordsRouter = express.Router()

WordsRouter.use(bodyParser.json())

WordsRouter.get('/', (req, res) => {
  Words.find()
    .then(words => res.send(words))
    .catch(err => res.status(500).send(err))
})

WordsRouter.post('/', async (req, res) => {
  const {
    word: requestWord,
    words: requestWords = []
  } = req.body

  if (requestWords.length) {
    const words = requestWords.map(word => ({
      length: word.length,
      letters: getLetters(word),
      word: word
    }))

    try {
      const newWords = await Words.create(words)
      res.send(newWords)
      return
    } catch (err) {
      res.status(500).send(err)
      return
    }
  }

  const word = requestWord.toLowerCase()

  const newWord = new Word({
    length: word.length,
    letters: getLetters(word),
    word: word
  })

  try {
    const newWord = await newWord.save(word)
    res.send(newWord)
  } catch (err) {
    res.status(500).send(err)
  }

  WordsRouter.delete('/:word', (req, res) => {
    const word = req.params.word.toLowerCase()
    Word.deleteOne({ word })
      .then(w => res.send(w))
      .catch(err => res.status(500).send(err))
  })

  WordsRouter.get('/:word', (req, res) => {
    const word = req.params.word.toLowerCase()
    Words.findOne({ word })
      .then(w => res.send(w))
      .catch(err => res.status(500).send(err))
  })

})

module.exports = WordsRouter