import React, { useState } from 'react'

const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const DisplayStats = ({ good, bad, neutral }) => (
  <>
  <p>good: {good}</p>
  <p>neutral: {neutral}</p>
  <p>bad: {bad}</p>
  </>
)

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