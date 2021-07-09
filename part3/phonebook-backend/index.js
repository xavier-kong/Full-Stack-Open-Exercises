require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req'));

morgan.token('req', function(req) {
    return JSON.stringify(req.body)
});

app.get('/api/persons', (request, response) => {
  Person.find({}).then(notes => {
    response.json(notes)
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Person({
    name: body.name,
    number: body.number,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})


// app.get('/info', (request, response) => {
//   response.send(
//     `Phonebook has info for ${persons.length} people<br>${new Date()}`
//   )
// })

// app.get('/api/persons/:id', (request, response) => {
//   Person.findById(request.params.id).then(note => {
//     response.json(note)
//   })
// })

// app.delete('/api/persons/:id', (request, response) => {
//   const id = Number(request.params.id)
//   persons = persons.filter(note => note.id !== id)

//   response.status(204).end()
// })

// const generateId = () => {
//   const newId = Math.floor(Math.random() * 1000000);
//   return newId
// }

// app.post('/api/persons', (request, response) => {
//   const body = request.body
//   if (!body.name) {
//     return response.status(400).json({ 
//       error: 'name is missing' 
//     })
//   } else if (!body.number) {
//     return response.status(400).json({ 
//       error: 'number is missing' 
//     })
//   } else if (persons.find(person => person.name === body.name)) {
//     return response.status(400).json({ 
//       error: 'name must be unique' 
//     })
//   } else {
//     const person = {
//       id: generateId(),
//       name: body.name,
//       number: body.number,
//     }
//     persons = persons.concat(person)
  
//     response.json(person)
//   }
// })


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})