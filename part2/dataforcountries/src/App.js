import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Country = ({ countries }) => {
  if (countries.length === 0) {
    return <p>Too many matches, specify another filter</p>
  }
  return <ul>
    {countries.map((c) =>
      <p> {c.name} </p>)}
  </ul>
}

function App() {
  const [countries, setCountries] = useState([])
  const [countryName, setCountryName] = useState('')
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        setCountries(res.data)
      })
  }, [])

  const handleInputChange = (e) => {
    setCountryName(e.target.value)
    console.log(countries)
  }

  const countriesToShow = () => {
    const a = countries.filter(c => c.name.toLowerCase().includes(countryName.toLowerCase()))
    
    if (a.length > 10) {
      return []
    } else {
      return a
    }

  }
  return (
    <div>
      <div>
        find countries <input value={countryName} onChange={handleInputChange} />
      </div>
      <Country countries={countriesToShow()} />
    </div>
  );
}

export default App;
