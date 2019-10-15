import React from 'react'

const Person = (props) => {
    
    return (
        <div>
          filter: <input value={props.show} onChange={props.handleShow}/>
      </div>
    )
}

export default Person
