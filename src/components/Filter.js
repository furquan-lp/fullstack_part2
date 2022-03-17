const Person = ({ person }) => <p>{person.name} {person.number}</p>;

const Filter = ({ persons, searchText, setSearch }) => {
  const personsToShow = searchText === '' ? persons
    : persons.filter(person => person.name.toLowerCase().includes(searchText.toLowerCase()));
  return (
    <>
      {personsToShow.map(person =>
        <Person key={person.name + person.number} person={person} />)}
    </>
  );
}

export default Filter;