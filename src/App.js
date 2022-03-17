import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: 'Unknown' }
  ]);
  const [newPerson, setNewPerson] = useState({ name: '', number: '' });
  const [searchText, setSearch] = useState('');

  const addName = (event) => {
    event.preventDefault();
    if (persons.findIndex(p =>
      p.name === newPerson.name && p.number === newPerson.number) === -1) {
      setPersons(persons.concat(newPerson))
      setNewPerson({ name: '', number: '' });
    } else {
      alert(`${newPerson.name} already exists.`);
    }
  };

  const handleNameChange = (event) =>
    setNewPerson({ name: event.target.value, number: newPerson.number });
  const handleNumChange = (event) =>
    setNewPerson({ name: newPerson.name, number: event.target.value });
  const handleSearch = (event) => setSearch(event.target.value);

  const personsToShow = searchText === '' ? persons
    : persons.filter(person => person.name.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with a<input value={searchText} onChange={handleSearch} />
      <h3>add a new</h3>
      <form onSubmit={addName}>
        <div>name: <input value={newPerson.name} onChange={handleNameChange} /></div>
        <div>number: <input value={newPerson.number} onChange={handleNumChange} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person =>
        <p key={person.name + person.number}>{person.name} {person.number}</p>)}
    </div>
  );
};

export default App;