import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Country = ({country}) => {
  const {name, capital, population, languages,flag} = {...country}
  const data = (
    <div>
      <h1>{name}</h1>
      <p>capital {capital}</p>
      <p>population {population}</p>

      <h2>languages</h2>
      <ul>
        {languages.map(l => <li key={l.name}>{l.name}</li>)}
      </ul>

      <img src={flag}/>
    </div>
    
  )
  return data
}



const Countries = ({ countries, inputValue }) => {
  console.log(inputValue)
  console.log("in countries")
  const [show, setShow] = useState(false)
  const [showCountry, setShowCountry] = useState('')
  const [initialInput, setInitialInput] = useState('')

  useEffect(
      ()=>{
        console.log("hey")
        if(inputValue != initialInput){
          setShow(false)
          setShowCountry('')
        }
      }
  , [countries])

  const showCountryFunc = (country) => {
    console.log( inputValue )
    console.log(  "is input value in show country func.")
    setInitialInput(inputValue)
    setShow(true)
    setShowCountry(country)
  }
  if(show) {
    return <Country country={showCountry}/>
  }
  if (countries === null) {
    return <p>No such country.</p>
  }
  
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }else if (countries.length === 1) {
    return <Country country={countries[0]} />
  }else if (countries.length === 0){
    
    return <p>Search for a country.</p>
  }
  return <ul>
    {countries.map((c) =>
      <div key={c.name}>
        <p > {c.name} </p>
        <button onClick={() => {showCountryFunc(c)}}>show</button>
      </div>
      )}
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
  }

  const countriesToShow = () => {
    if (countryName === '') {
      return []
    }
    const a = countries.filter(c => c.name.toLowerCase().includes(countryName.toLowerCase()))
    if(a.length === 0) { return null}
    return a
    

  }
  const inputForCountries = () => {
    
    return countryName
  }
  return (
    <div>
      
      <div>
        find countries <input value={countryName} onChange={handleInputChange} />
      </div>
       <Countries inputValue={inputForCountries()} countries={countriesToShow()} />
    </div>
  );
}

export default App;
