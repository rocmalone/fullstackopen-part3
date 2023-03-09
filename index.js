const express = require('express')
const app = express()

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

// Active express JSON parser
// JSON parser takes the JSON data of a request and transforms it into a JS obj
// and attaches it to the body property of the object (in this case, request.body)
app.use(express.json())


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






const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})