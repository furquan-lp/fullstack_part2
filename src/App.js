import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';

const SearchField = ({ searchText, handleSearch }) =>
  <>filter shown with a<input value={searchText} onChange={handleSearch} /></>;

const Form = ({ onSubmit, newPerson, handleName, handleNum }) =>
  <form onSubmit={onSubmit}>
    <div>name: <input value={newPerson.name} onChange={handleName} /></div>
    <div>number: <input value={newPerson.number} onChange={handleNum} /></div>
    <div><button type="submit">add</button></div>
  </form>;

const App = () => {
  const [persons, setPersons] = useState([{ name: '', number: '' }]);
  const [newPerson, setNewPerson] = useState({ name: '', number: '' });
  const [searchText, setSearch] = useState('');

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data));
  };
  useEffect(hook, []);

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

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchField searchText={searchText} handleSearch={handleSearch} />
      <h3>add a new</h3>
      <Form onSubmit={addName} newPerson={newPerson} handleName={handleNameChange} handleNum={handleNumChange} />
      <h2>Numbers</h2>
      <Filter persons={persons} searchText={searchText} setSearch={setSearch} />
    </div>
  );
};

export default App;