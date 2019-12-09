const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0-bnv5c.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)


if (process.argv.length < 4) {
  //display phonebook
  
  Person.find({}).then(result => {
    console.log("phonebook:\n")
    result.forEach(p => {
      let print = `${p.name} ${p.number}\n`
      console.log(print)
    })
    mongoose.connection.close()
  })
} else {
  //add to phonebook
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number
  })

  person.save().then(response => {
    let print = `added ${name} with number ${number} to phonebook`
    console.log(print)
    mongoose.connection.close()
  })
}


