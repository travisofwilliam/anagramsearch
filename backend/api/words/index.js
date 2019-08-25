const express = require('express')
const bodyParser = require('body-parser')
const Word = require('../../models/Word')

const { getLetters } = require('../../words/words')

const WordsRouter = express.Router()

WordsRouter.use(bodyParser.json())

WordsRouter.get('/', (req, res) => {
  Word.find()
    .then(words => res.send(words))
    .catch(err => res.status(500).send(err))
})

WordsRouter.post('/', async (req, res) => {
  const {
    word: requestWord,
    words: requestWords = []
  } = req.body

  if (requestWords.length > 0) {
    const words = requestWords.map(word => ({
      length: word.length,
      letters: getLetters(word),
      word: word.toLowerCase()
    }))

    try {
      const newWords = await Word.create(words)
      res.send(newWords)
      return
    } catch (err) {
      res.status(500).send(err)
      return
    }
  }

  const word = requestWord.toLowerCase()

  let newWord = new Word({
    length: word.length,
    letters: getLetters(word),
    word: word
  })

  try {
    newWord = await newWord.save(word)
    res.send(newWord)
  } catch (err) {
    res.status(500).send(err)
  }
})

WordsRouter.delete('/:word', (req, res) => {
  const word = req.params.word.toLowerCase()
  Word.deleteOne({ word })
    .then(w => {
      res.send(w)
    })
    .catch(err => res.status(500).send(err))
})

WordsRouter.get('/:word', (req, res) => {
  const word = req.params.word.toLowerCase()
  Words.findOne({ word })
    .then(w => res.send(w))
    .catch(err => res.status(500).send(err))
})

module.exports = WordsRouter