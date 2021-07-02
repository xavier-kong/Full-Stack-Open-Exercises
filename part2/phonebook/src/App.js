import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const checkDupe = (arr, test) => {
    let found = arr.find(element => element.name === test.name)
    return ((found) ? true : false )
  }

  const addNew = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
    }
    if (checkDupe(persons, personObject)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const Display = (props) => {
    return (
      <li>{props.name}</li>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNew}> 
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <Display key={person.name} name={person.name} />
        )}
      </ul>
    </div>
  )
}

export default App
