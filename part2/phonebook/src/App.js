import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addNew = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
    }
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const Display = (props) => {
    console.log(props);
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
