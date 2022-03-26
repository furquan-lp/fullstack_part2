import { useState, useEffect } from 'react';
import { Filter } from './components/Filter';
import phonebook from './services/phoneNos';

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

  useEffect(() => phonebook.getAll()
    .then(response => setPersons(response)), [persons]);

  const addName = (event) => {
    event.preventDefault();
    const samePerson = persons.find(p => p.name === newPerson.name);
    if (samePerson !== undefined && window.confirm(
      `${newPerson.name} is already added to the phonebook, replace the old number?`
    )) {
      phonebook.update(samePerson.id, newPerson)
        .then(response => {
          setPersons(persons.concat(response));
          setNewPerson({ name: '', number: '' });
        });
    } else {
      phonebook
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response));
          setNewPerson({ name: '', number: '' });
        });
    }
  };

  const handleDelete = (event) => {
    if (window.confirm(`Are you sure you want to delete ${event.target.parentNode.firstChild.data}?`)) {
      phonebook.remove(event.target.id);
      setPersons(persons.filter(person => person.id !== event.target.id));
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
      <Filter persons={persons} searchText={searchText} setSearch={setSearch} delButton={handleDelete} />
    </div>
  );
};

export default App;