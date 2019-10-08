import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Statistics = (props) => {
    return(
        <div>
        {props.all === 0 ? <p>No feedback given</p> : 
            <table>
            <tbody>
            <Statistic text="good" value ={props.good} />
            <Statistic text="neutral" value ={props.neutral} />
            <Statistic text="bad" value ={props.bad} />
            <Statistic text="all" value ={props.all} />
            <Statistic text="average" value ={props.average} />
            <Statistic text="positive" value ={props.positive} />
            </tbody>
          </table>
        }
        </div>
      )
}

const Statistic = (props) => {
    return (
    <tr> 
        <th> {props.text} </th>
        <th> {props.value} </th> 
    </tr>)
}
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
 

  var all = good + bad + neutral
  

  const clickGood = () => {setGood(good + 1)}
  const clickNeutral = () => {setNeutral(neutral + 1)}
  const clickBad = () => {setBad(bad + 1)}

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={()=> clickGood()}>good</button>
      <button onClick={clickNeutral}>neutral</button>
      <button onClick={clickBad}>bad</button>

      <h1>statistics</h1>
      <Statistics 
        good={good} 
        neutral={neutral}
        bad={bad}
        all={all}
        average={all === 0 ? 0 : (good - bad)/all }
        positive={all === 0 ? "0%": good*100/all+"%"}
      />
      
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)