import './App.css';
import { useEffect, useState } from 'react';
import { getAllCountries } from './services/getAllCountries';
import { getWeather } from './services/getWeather';

const Weather = ({capital}) => {
  const [newWeather, setWeather] = useState([])
  console.log(newWeather)
  useEffect(()=> {
    getWeather(capital).then((data) => {
      setWeather([data])
      })
    .catch(error => console.log(error))
  }, [capital])
 
  if (newWeather.length>0) {
  console.log(newWeather[0])
  const data=newWeather[0]
  
  
  return (
    <div>
    <h2>Weather in {capital} </h2>
    <div>temperature: {data.main.temp}</div>
    <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt={data.weather.main} />
    <div>wind: {data.wind.speed} mph direction {data.wind.deg}</div>
    </div>
    )
  }
  else{
    return <div></div>
  }
}

const Countries = ({countries, handleClick}) => {
  const countries2=countries
  if(countries2.length > 10){
    return <>Too many matches, specify another filter</>
  }
  if (countries2.length === 1){
    
    return (
    <div>
      <h1>{countries2[0].name.common}</h1>
      <div>capital {countries2[0].capital}</div>
      <div>population {countries2[0].population}</div>
      <h2>{"spoken languages"}</h2>
      <ul>{Object.values(countries2[0].languages).map(lan => <li key={lan}>{lan}</li>)}</ul>
      <img src={countries2[0].flags.png} alt="Bandera" />
      <Weather capital={countries2[0].capital} />
    </div>
    )
  }
  else{
    return countries2.map(country => (
    <div key={country.name.common}>
    <div>{country.name.common}</div>
    <button onClick={handleClick(country.name.common)}>show</button>
    </div>
    
    ))
  }
}

function App() {
  const [countries, setCountries] = useState([])
  const [newCountry,setCountry]= useState("")

  useEffect(() => {
    getAllCountries().then(data => {setCountries(data)})
    }
  , [])

  const handleChange = (event) => {
    setCountry(event.target.value)
  }
  const handleClick = (name)=> (() => setCountry(name))



  const countriesToShow = countries.filter(country => 
    country.name.common.toLowerCase().includes(newCountry.toLowerCase()))

  return (
    <div>
    <div>
    find countries: <input value={newCountry} onChange={handleChange} />
    </div>
    <div>
    {newCountry ?
    <Countries countries={countriesToShow} handleClick={handleClick} /> : <></>  }
    </div>  
    </div>
  );
}

export default App;
