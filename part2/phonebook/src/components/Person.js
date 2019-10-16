import React from 'react'

const Person = (props) => {
   
    //console.log(props) returns "{name: "Arto Hellas"}"
    // why doesnt person prop go as object??
    const person = props.person
    return (
        <p>{props.person.name} : {props.person.number}
        <button onClick={() => props.deleteButton(person)}>delete</button>
        </p>
    )
}

export default Person
