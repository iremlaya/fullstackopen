import React, { useState } from 'react'
import Person from './components/Person'


const Persons = (props) => {
  const filteredPersons = props.filteredPersons();

  return <ul>
      {filteredPersons.map((p) =>
  <Person key={p.name} name={p.name} number={p.number}
  />)}
  </ul>
}

const Filter = (props) => {
    
  return (
      <div>
        filter: <input value={props.show} onChange={props.handleShow}/>
    </div>
  )
}

const PersonForm = (props) => {
    const {addName, newName, handleNameChange, newNumber, handleNumberChange} = {...props}
  return (
    <form onSubmit={addName}>
    <div>
      name: <input value={newName} onChange={handleNameChange}/>
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ show, setShow ] = useState('')


  const notesToShow = () =>  {
    const a = persons.filter(person => 
      Object.keys(person).some(name =>
        person[name].toLowerCase().includes(show.toLowerCase())
        )) 
     
      return a;
    }
 
  
  const checkIfNameExists = (name) => {
      const check = persons.some(el => el.name === name)
      return check
  }

  const checkForUpdate = (name,number) => {
    const check = persons.some(el => el.name === name & el.number === number)
    return check
  }
  const addName = (e) => {
    e.preventDefault()
    if(checkIfNameExists(newName)) {
      
      if(!checkForUpdate(newName,newNumber)){
        const confirm = window.confirm(`Replace ${newName}'s old number with a new one?`);
        if(confirm) {
            const arr = [...persons]
            arr.find(p => p.name === newName).number = newNumber
            setPersons(arr)
            setNewName('')
            setNewNumber('')
        }
      }
      else {
          window.alert(`${newName} is already added to phonebook with the same number`)
      }
    }else{
      const personObject = {
        name: newName,
        number: newNumber
      }
      
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
    
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
    //console.log(newName)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
    //console.log(newName)
  }
  const handleShow = (e) => {
      setShow(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter show={show} handleShow={handleShow}/>
      <h3>add a new</h3>
      <PersonForm 
      addName={addName} 
      newName={newName} 
      handleNameChange={handleNameChange} 
      newNumber={newNumber} 
      handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
        <Persons filteredPersons={notesToShow}/>
    </div>
  )
}

export default App