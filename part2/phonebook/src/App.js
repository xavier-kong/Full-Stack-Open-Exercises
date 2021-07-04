import React, { useState, useEffect } from 'react'
//import axios from 'axios'
import Filter from './components/Filter';
import Form from './components/Form';
import personService from './services/person'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
        })
  }, [])

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    //console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const checkDupe = (arr, test) => {
    let found = arr.find(element => element.name === test.name)
    return ((found) ? true : false )
  }

  const addNew = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    if (checkDupe(persons, personObject)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
        personService
          .create(personObject)
          .then(returnedNotes => {
            setPersons(persons.concat(returnedNotes))
            setNewName('')
            setNewNumber('')
          })
    }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input 
        value={newFilter}
        onChange={handleFilterChange}
        />
      </div>
      <h2>add a new</h2>
      <Form 
        addNew={addNew} 
        newName={newName} 
        handleNameChange={handleNameChange} newNumber={newNumber} 
        handleNumberChange={handleNumberChange}
        />
      <h2>Numbers</h2>
      <ul>
        <Filter 
          persons={persons} 
          newFilter={newFilter}
        />
      </ul>
    </div>
  )
}

export default App
