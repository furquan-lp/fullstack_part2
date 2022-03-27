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

const Notification = ({ message }) => {
  const notificationStyle = {
    color: 'white',
    background: '#9fd3c7',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    borderColor: '#79c2d0',
    padding: 10,
    marginBottom: 10
  };

  if (message === null) {
    return null;
  }
  return (
    <div style={notificationStyle}>
      {message}
    </div>);
};

const App = () => {
  const [persons, setPersons] = useState([{ name: '', number: '' }]);
  const [newPerson, setNewPerson] = useState({ name: '', number: '' });
  const [searchText, setSearch] = useState('');
  const [notMsg, setNotMsg] = useState(null);

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
      setNotMsg(`Replaced ${newPerson.name}'s phone number`);
      setTimeout(() => setNotMsg(null), 2000);
    } else {
      phonebook
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response));
          setNewPerson({ name: '', number: '' });
        });
      setNotMsg(`Added ${newPerson.name}`);
      setTimeout(() => setNotMsg(null), 2000);
    }
  };

  const handleDelete = (event) => {
    if (window.confirm(`Are you sure you want to delete ${event.target.parentNode.firstChild.data}?`)) {
      phonebook.remove(event.target.id);
      setPersons(persons.filter(person => person.id !== event.target.id));
      setNotMsg(`Deleted ${event.target.parentNode.firstChild.data}`);
      setTimeout(() => setNotMsg(null), 2000);
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
      <Notification message={notMsg} />
      <SearchField searchText={searchText} handleSearch={handleSearch} />
      <h3>add a new</h3>
      <Form onSubmit={addName} newPerson={newPerson} handleName={handleNameChange} handleNum={handleNumChange} />
      <h2>Numbers</h2>
      <Filter persons={persons} searchText={searchText} setSearch={setSearch} delButton={handleDelete} />
    </div>
  );
};

export default App;