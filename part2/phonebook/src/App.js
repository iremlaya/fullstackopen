import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import personService from './services/persons'


const Persons = (props) => {

  const filteredPersons = props.filteredPersons();
  console.log(filteredPersons)
  return <ul>
      {filteredPersons.map((p) =>
    <Person key={p.id} person={p}  deleteButton={props.deleteButton}/>)}
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
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ show, setShow ] = useState('')

  useEffect(() => {
   personService
      .getAll()
      .then(res => {
        setPersons(res.data)
      })
  }, [])


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
            
            const personTemp = persons.find(p => p.name === newName)
            const changed = {...personTemp, number: newNumber}
            const id = personTemp.id
            personService
              .update(id, changed)
              .then(response => {
                setPersons(persons.map(p => p.id !== id ? p : response.data))
              })
            
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
      personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })

      
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
  const deleteButton = (props) => {
    
    const check = window.confirm(`Do you really want to delete ${props.name}?`);
    if (check) {
      personService.remove(props.id).then(() => {
        setPersons(persons.filter(p => p.id !== props.id))
      })
    } 
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
        <Persons deleteButton={deleteButton} filteredPersons={notesToShow}/>
    </div>
  )
}

export default App