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


// GET all persons
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

// GET person by id
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
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






app.use(express.json())

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})