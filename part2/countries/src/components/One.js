import React from 'react';

const One = ({ name, capital, population, languages, flag }) => {
  let altText= `Flag of ${name}`
  return (
    <>
    <h1>{name}</h1>
    <p>Capital: {capital}</p>
    <p>Population: {population}</p>
    <h2>Languages</h2>
    <ul>{languages}</ul>
    <img src={flag} alt={altText} width="30%" height="30%"/>
    </>
  )
}

export default One;