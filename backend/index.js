const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.static('build'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// CORS middleware to allow cross-origin resource sharing
app.use(cors())

// Active express JSON parser middleware
// JSON parser takes the JSON data of a request and transforms it into a JS obj
// and attaches it to the body property of the object (in this case, request.body)
app.use(express.json())

// Morgan logger middleware
// Create new morgan token :body
morgan.token('body', (request, response) => {
    return JSON.stringify(request.body)
})
// Activate morgan with custom format log
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


/// ROUTES

// GET all persons
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

// GET person by id
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

// DELETE person by id
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(note => note.id !== id)

    response.status(204).end()
})


// ADD person

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }
    if(!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }
    if(persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: getRandomInt(9999)
    }
    persons = persons.concat(person)

    response.json(person)

    // if(!body.content)
})

// GET phonebook info
app.get('/info',
(request, response) => {
    const phonebookEntries = persons.length
    const date = new Date()
    response.send(`
    <p>Phonebook has info for ${phonebookEntries} people</p>
    <p>${date}</p>
    `)

})


function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

// Our own middleware function, used to hijack the 404 response and provide our own error.
function unknownEndpoint (request, response) {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const PORT = process.env.port || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})