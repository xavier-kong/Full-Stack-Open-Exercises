import React from 'react';
import Display from '../components/Display';
//import person from '../services/person';
import personService from '../services/person'

const remove = (id, name, handleDelete, handleDeleteError ) => {
  if (window.confirm(`Are you sure you want to delete ${name} ?`)) {
    personService
    .remove(id)
    .then(() => handleDelete())
    .catch(() => handleDeleteError(name))
  } else {
    window.alert(`${name} was not deleted!`)
  }
}

const Filter = ({ persons, newFilter, handleDelete, handleDeleteError }) => {
  const checkIncl = (name, test) => {
    if (name.toLowerCase().includes(test.toLowerCase())) {
      return name
    }
  }

  return (
  persons
    .filter(obj => checkIncl(obj.name, newFilter))
    .map(person => <Display key={person.name} name={person.name} number={person.number} remove={() => remove(person.id, person.name, handleDelete, handleDeleteError)}/>)
  )
}

export default Filter;