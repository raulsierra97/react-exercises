import React, { useEffect, useState } from 'react'
import { deleteNumber } from './services/deleteNumber'
import { getAllNumbers } from './services/getAllNumbers'
import { saveNumber } from './services/saveNumber'

const Person = ({persona, handleDelete}) => <li>{persona.name} {persona.number} 
<button onClick={handleDelete(persona)}>delete</button></li>

const Persons = ({persons, newFilter, handleDelete}) => {
  return (
    <ul>
    {persons.map( (persona,index) => 
      (newFilter === "" || persona.name.toUpperCase().includes(newFilter.toUpperCase()) ? 
      <Person key={persona.id} persona={persona}
      handleDelete={handleDelete}/> : "")
      ) } 
    </ul>
  )
}

const Filter = ({newFilter, handleChangeFilter}) => 
<div> 
filter shown with: <input value={newFilter} onChange={handleChangeFilter}/>
</div>

const PersonForm = ({handleSubmit, newName, handleChangeName, newNumber, handleChangeNumber}) => (
  <form onSubmit={handleSubmit}>
  <div>
    name: <input value={newName} onChange={handleChangeName}/>
  </div>
  <div>
    number: <input value={newNumber} onChange={handleChangeNumber}/>
  </div>
  <div>
    <button type="submit">add</button>
  </div>
</form>
)

const Footer = ({newConfirm, color}) => {
  const footerStyle = {
    color: color,
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>{newConfirm}</em>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newConfirm, setConfirm] = useState("")
  const [color, setColor] = useState("")

  useEffect(() => {
    getAllNumbers()
      .then((data) => setPersons(data))

  }
  ) 
  const handleAdd = (persona) => {
    setColor("green")
    setConfirm("Added "+persona.name)
    setTimeout(() => { 
      setConfirm(null)
    }, 5000);
  }
  const handleDelete = (persona) => {
    return () => {
    try{
    deleteNumber(persona.id)
    
    }
    catch (e){
    setColor("red")
    setConfirm("Information of "+persona.name+" has already been removed from server")
    setTimeout(() => { 
      setConfirm(null)
    }, 5000);
    }
    }
  }


  function handleSubmit(event) {
      event.preventDefault()
      if (persons.find(person => person.number === newNumber) !== undefined) {
        window.alert(`${newNumber} is already added to phonebook`)
      }
      else {
        const id=Math.max(persons.map(person => person.id))
        const personaObj = {
          name: newName,
          number: newNumber,
          id: id+1
        }
        const listaPersonas = persons
        setPersons(listaPersonas.concat(personaObj))
        const repe= persons.find(person => person.name === newName)
        if (repe !== undefined) {
          /* window.alert(`${newName} is already added to phonebook`) */
          const result = window.confirm("Confirm replacement")
        if (result === true) 
          deleteNumber(repe.id)()
        }
        
        saveNumber(personaObj).then(data => handleAdd(data))
        setNewName("")
        setNewNumber("")
      }
    }

  const handleChangeName = (event) => 
    setNewName(event.target.value)

  const handleChangeNumber = (event) => 
  setNewNumber(event.target.value)

  const handleChangeFilter = (event) => 
  setNewFilter(event.target.value)
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Footer newConfirm={newConfirm} color={color}/>
      <Filter newFilter={newFilter}
      handleChangeFilter={handleChangeFilter}/>
      <h2>add a new</h2>
      <PersonForm handleChangeName={handleChangeName}
      handleChangeNumber={handleChangeNumber}
      handleSubmit = {handleSubmit}
      newName = {newName}
      newNumber = {newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons = {persons}
      newFilter={newFilter} handleDelete={handleDelete}
      />    
    </div>
    
  )
}

export default App
