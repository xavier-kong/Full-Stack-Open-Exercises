import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'

const App = () => {
  const [ data, setData ] = useState([])
  const [ search, setSearch ] = useState('')

  const handleSearchChange = (event) => {setSearch(event.target.value)}

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setData(response.data)
      })
  }, [])

  return (
    <>
      <div>
        find countries: <input
        value={search}
        onChange={handleSearchChange}  
        />
        <Search 
        data={data}
        test={search} 
        />
      </div>
    </>
  )
}


export default App;
