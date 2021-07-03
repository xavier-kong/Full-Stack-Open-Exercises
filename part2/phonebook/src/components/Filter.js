import React from 'react';
import Display from '../components/Display';

const Filter = ({ persons, newFilter }) => {
  const checkIncl = (name, test) => {
    if (name.toLowerCase().includes(test.toLowerCase())) {
      return name
    }
  }
  return (
  persons
  .filter(obj => checkIncl(obj.name, newFilter))
  .map(person => <Display key={person.name} name={person.name} number={person.number} />)
  )
}

export default Filter;