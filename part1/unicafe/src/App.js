import React, { useState } from 'react'

const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({ good, bad, neutral }) => {
  let total = good + neutral + bad
  let score = (good*1) + (bad*-1)
  let average = score / total
  let positive = (good / total)*100
  
  return (
    <>
    <p>all: {total}</p>
    <p>average: {average}</p>
    <p>positive: {positive}%</p>
    </>
  )
}

const DisplayStats = ({ good, bad, neutral }) => {
  let total = good + neutral + bad
  if (total === 0) {
    return (
      <p>No needback given</p>
    ) 
  } else {
    return (
      <>
  <p>good: {good}</p>
  <p>neutral: {neutral}</p>
  <p>bad: {bad}</p>
  <Statistics good={good} neutral={neutral} bad={bad}/>
  </>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => setGood(good+1)
  const addNeutral = () => setNeutral(neutral+1)
  const addBad = () => setBad(bad+1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => addGood()} text='good'/>
      <Button handleClick={() => addNeutral()} text='neutral'/>
      <Button handleClick={() => addBad()} text='bad'/>
      <h1>statistics</h1>
      <DisplayStats good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App