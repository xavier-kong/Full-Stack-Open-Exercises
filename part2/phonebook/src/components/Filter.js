import React from 'react';
import Display from '../components/Display';
//import person from '../services/person';
import personService from '../services/person'

const remove = (id, name, handleDelete) => {
  if (window.confirm(`Are you sure you want to delete ${name} ?`)) {
    personService
    .remove(id)
    .then(() => handleDelete())
  } else {
    window.alert(`${name} was not deleted!`)
  }
}

const Filter = ({ persons, newFilter, handleDelete }) => {
  const checkIncl = (name, test) => {
    if (name.toLowerCase().includes(test.toLowerCase())) {
      return name
    }
  }
  return (
  persons
  .filter(obj => checkIncl(obj.name, newFilter))
  .map(person => <Display key={person.name} name={person.name} number={person.number} remove={() => remove(person.id, person.name, handleDelete)}/>)
  )
}

export default Filter;