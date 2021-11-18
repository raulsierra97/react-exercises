import React, { useState } from 'react'



const Statistics = ({good,neutral,bad}) => {
  
  const makeAverage = () => {
    const res = (good*1+bad*-1)/total
    if (isNaN(res)) return 0
    else return res
  }
  const makePositives = () => {
    const res = (good/total)*100
    if (isNaN(res)) return 0
    else return (res + '%')
  }
  const total = good+neutral+bad
  if(total===0) {
  return(
    <>
      <h1>statistics</h1>
      <p>No feedback given</p> 
    </> 
  )
  }
  else{
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine name={'good'} val={good} />
          <StatisticLine  name={'neutral'} val={neutral} />
          <StatisticLine  name={'bad'} val={bad} />
          <StatisticLine name={'all'} val={total} />
          <StatisticLine name={'average'} val={makeAverage()} />
          <StatisticLine name={'positive'} val={makePositives()} />
        </tbody>
      </table>
    </>
  )
  }
}

const Button = ({fun,name}) => {
  return (
    <button onClick={fun}>{name}</button>
  )
}

const StatisticLine = ({name, val}) =>{
  return(
    <tr>
      <td>{name}</td>
      <td>{val}</td>
    </tr>
    
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleClickGood = () => {
    setGood(prevCounter => prevCounter + 1)
  }

  const handleClickNeutral = () => {
    setNeutral(prevCounter => prevCounter + 1)
  }

  const handleClickBad = () => {
    setBad(prevCounter => prevCounter + 1)
  }



  return (
    <div>
      <h1>give feedback</h1>
      <Button fun={handleClickGood} name={"good"} />
      <Button fun={handleClickNeutral} name={"neutral"} />
      <Button fun={handleClickBad} name={"bad"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App