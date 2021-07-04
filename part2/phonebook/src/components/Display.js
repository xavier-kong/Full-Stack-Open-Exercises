import React from 'react';

const Display = ({ name, number, remove }) => {
  return (
    <li>
      {name}
      &nbsp; 
      {number}
      &nbsp;
      <button onClick={remove}>Delete</button>  
    </li>
  )
}

export default Display;