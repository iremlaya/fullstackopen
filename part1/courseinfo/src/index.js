import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Content = (props) => {
    return (
        <div>
            {props.parts.map((o, index) => (
                <Part key={index} name={o.name} exercises={o.exercises}/>
            ))}
        </div>
    )
}

const Part = (props) => {
    const {index, name, exercises} = props;
    return (
        <p>{name} {exercises}</p>
    )
}
const Total = (props) => {
    const [part1, part2, part3] = props.parts;
    return (
        <p>Number of exercises {part1.exercises + part2.exercises + part3.exercises}</p>
    )
}


const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10
          },
          {
            name: 'Using props to pass data',
            exercises: 7
          },
          {
            name: 'State of a component',
            exercises: 14
          }
        ]
      }
  
    return (
      <div>
        <Header course={course.name}/>
        <Content parts={course.parts} />
        <Total parts={course.parts}/>
      </div>
    )
  }
  
ReactDOM.render(<App />, document.getElementById('root'))

