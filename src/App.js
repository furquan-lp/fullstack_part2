import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [newName, setNewName] = useState('');

  const addName = (event) => {
    event.preventDefault();
    const submittedName = { name: newName };
    if (persons.findIndex(p => p.name === submittedName.name) === -1) {
      setPersons(persons.concat(submittedName))
      setNewName('');
    } else {
      alert(`${newName} already exists.`);
    }
  };

  const handleTextChange = (event) => {
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleTextChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  );
};

export default App;