const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.v5cfu.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', noteSchema)

if (process.argv.length == 3) {
  Person.find({}).then(result => {
    console.log("phonebook:")
    result.forEach(note => {
      console.log(note.name, note.number)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length == 5) {
    const person = new Person({
      name: process.argv[3],
      number: process.argv[4]
    })
      person.save().then(result => {
      console.log(`added ${process.argv[3]}'s number ${process.argv[4]} to phonebook` )
      mongoose.connection.close()
    })

}

