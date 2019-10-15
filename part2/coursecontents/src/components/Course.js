import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
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
const Total = ({ parts }) => {


  return (
    <h3>Total # of exercises {parts.reduce((a, b) => a + (b['exercises'] || 0), 0)}</h3>
  )
}
const Part = ({ index, name, exercises }) => {
  return (
    <p>{name} {exercises}</p>
  )
}
const Course = ({ course }) => {
  console.log(course.name)
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )

}

export default Course;
