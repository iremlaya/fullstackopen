import React from 'react';
import ReactDOM from 'react-dom';


const Part = ({index, name, exercises}) => {
    return (
        <p>{name} {exercises}</p>
    )
}

export default Part