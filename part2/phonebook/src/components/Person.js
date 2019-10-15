import React from 'react'

const Person = (props) => {
    
    //console.log(props) returns "{name: "Arto Hellas"}"
    return (
        <p>{props.name} : {props.number}</p>
    )
}

export default Person
