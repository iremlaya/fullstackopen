import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const names = () => persons.map((p) =>
      <Person key={p.name} name={p.name}/>
    )

  const checkIfExists = (name) => {
      const check = persons.some(el => el.name === name)
      console.log(check)
      return check
  }
  const addName = (e) => {
    e.preventDefault()
    if(checkIfExists(newName)) {
      window.alert(`${newName} is already added to phonebook`)
    }else{
      const nameObject = {
        name: newName
      }
      
      setPersons(persons.concat(nameObject))
      setNewName('')
    }
    
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
    //console.log(newName)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <ul>
          {names()}
        </ul>
    </div>
  )
}

export default App