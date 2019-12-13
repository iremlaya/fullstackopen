require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const Person = require('./models/person')


const morgan = require('morgan')

app.use(express.static('build'))
app.use(bodyParser.json())

app.use(morgan('tiny'))

const cors = require('cors')
app.use(cors())

let persons = [
  {
    'name': 'Arto Hellas',
    'number': '123456',
    'id': 1
  },
  {
    'name': 'Ada Lovelace',
    'number': '39-44-5323523',
    'id': 2
  },
  {
    'name': 'Dan Abramov',
    'number': '12-43-234345',
    'id': 3
  },
  {
    'name': 'Mary Poppendieck',
    'number': '39-23-6423122',
    'id': 4
  }
]




app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
})

app.post('/api/persons', (req, res) => {
  const random = Math.floor(Math.random() * Math.floor(10000))
  const body = req.body
  if (body.name === undefined) {
    return res.status(400).json({
      error: 'name missing',
      bod: body
    })
  } else if (body.number === undefined) {
    return res.status(400).json({
      error: 'number missing'
    })
  } else if (persons.find(p => p.name === body.name)) {
    return res.status(400).json({
      error: 'person already exists'
    })
  }

  const person = new Person({
    id: random,
    name: body.name,
    number: body.number
  })
  person.save().then(n => {
    let print = `added ${body.name} with number ${body.number} to phonebook`
    console.log(print)
    res.json(n.toJSON())
  }).catch(e => {
    console.log('im error: ')
    console.log(e)
    return res.status(404).send(e)
  })
})


app.get('/api/persons', (req, res) => {
  Person.find({}).then(p => {
    res.json(p)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(p => {
    if (p) {
      res.json(p.toJSON())
    } else {
      res.status(404).end()
    }
  }).catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  Person.findByIdAndDelete(req.params.id).then(p => {
    res.json(p.toJSON())
    persons = persons.filter(p => p.id !== id)
  })
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})