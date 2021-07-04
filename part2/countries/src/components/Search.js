import React from 'react';
import List from '../components/List'
import One from '../components/One'

const checkIncl = (country, string) => {
  if (country.toLowerCase().includes(string.toLowerCase())) {
    return country
  }
}

const Search = ({ data,test }) => {
  let result = data.filter(obj => checkIncl(obj.name, test))
  if (result.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (result.length <=10 && result.length > 1) {
    let ten = result.map(country => <List key={country.name} item={country.name} />)
    return (
      <ul>
        {ten}
      </ul>
    )
  } else if (result.length === 1) {
    let langList = result[0].languages.map(lang => <List key={lang.name} item={lang.name} />)
    return (
      <One 
        name={result[0].name}
        capital={result[0].capital}
        population={result[0].population}
        languages={langList}
        flag={result[0].flag}
        />
    )
  } else {
    return (
      <p>Please enter a valid search</p>
      )
  }

}

export default Search;