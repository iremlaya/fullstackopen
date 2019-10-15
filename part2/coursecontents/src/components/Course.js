import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((o, index) => (
        <Part key={index} name={o.name} exercises={o.exercises} />
      ))}
    </div>
  )
}
const Total = ({ props }) => {


  return (
    <p>Number of exercises {parts.reduce((a, b) => a + (b['exercises'] || 0), 0)}</p>
  )
}
const Part = ({ index, name, exercises }) => {
  return (
    <p>{name} {exercises}</p>
  )
}
const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )

}

export default Course;
