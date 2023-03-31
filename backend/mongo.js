const mongoose = require('mongoose')


// UNDERSTAND:  assuming this script is run with 'node mongo.js ...' then
// process.argv[0] = 'node', process.argv[1] = 'mongo.js', ...
if (process.argv.length < 3) {
    console.log('Give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const name = process.argv[3]

const number = process.argv[4]

console.log(name)
console.log(number)

// Set up and connect to the database
const url = `mongodb+srv://fullstack:${password}@cluster0.swo5f7l.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)


// Define what a phoneEntry looks like
const phoneEntrySchema = new mongoose.Schema({
    name: String,
    number: String,
})

// 
const PhoneEntry = mongoose.model('Entry', phoneEntrySchema)


// If only the password is provided, then display all entries
if (name === undefined && number === undefined) {
    console.log("Only password provided.")
    PhoneEntry.find({}).then(result => {
        result.forEach(phoneEntry => {
            console.log(phoneEntry)
        })
        mongoose.connection.close()
        exit(0)
    })
}


// If the password and a name or number is provided, save it to the database
else if (!password) {
    const phoneEntry = new PhoneEntry ({
        name: name,
        number: number,
    })

    console.log(phoneEntry)
    
    phoneEntry.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}






// // Fetch note
// Note.find({  }).then(result => {
//     result.forEach(note => {
//         console.log(note)
//     })
//     mongoose.connection.close()
// })
