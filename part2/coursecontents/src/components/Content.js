import React from 'react';
import ReactDOM from 'react-dom';

import Part from './Part'


const Content = ({parts}) => {
    return (
        <div>
            {parts.map((o, index) => (
                <Part key={index} name={o.name} exercises={o.exercises}/>
            ))}
        </div>
    )
}

export default Content