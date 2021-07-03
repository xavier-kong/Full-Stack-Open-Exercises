import React from 'react';

const Form = ({ addNew, newName, handleNameChange, newNumber, handleNumberChange }) => (
    <form onSubmit={addNew}> 
      <div>
        name: <input 
        value={newName}
        onChange={handleNameChange}
        />
      </div>
      <div>
        number: <input
        value={newNumber}
        onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )

export default Form;