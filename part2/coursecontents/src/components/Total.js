import React from 'react';
import ReactDOM from 'react-dom';


const Total = ({parts}) => {
    return (
        <div>{parts.map( ex  => <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>)}
        
        </div>
        
        
    )
}

export default Total