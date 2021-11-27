import React, { useState } from 'react'


const Person = ({persona}) => <li>{persona.name} {persona.number}</li>

const Persons = ({persons, newFilter}) => {
  return (
    <ul>
    {persons.map( persona => 
      (newFilter === "" || persona.name.toUpperCase().includes(newFilter.toUpperCase()) ? 
      <Person key={persona.name} persona={persona}/> : "")
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

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleSubmit =(event) => {
    event.preventDefault()
    if (persons.find(person=>person.name===newName)!==undefined){
      window.alert(`${newName} is already added to phonebook`)
    }
    if (persons.find(person=>person.number===newNumber)!==undefined){
      window.alert(`${newNumber} is already added to phonebook`)
    }
    else{
    const personaObj= {
      name: newName,
      number: newNumber
    }
    const listaPersonas = persons
    setPersons(listaPersonas.concat(personaObj))
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
      newFilter={newFilter}
      />    
    </div>
    
  )
}

export default App
