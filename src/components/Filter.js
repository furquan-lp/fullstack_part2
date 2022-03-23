const Person = ({ person }) => <p>{person.name} {person.number}</p>;

const Filter = ({ persons, searchText }) => {
  const personsToShow = searchText === '' ? persons
    : persons.filter(person => person.name.toLowerCase().includes(searchText.toLowerCase()));
  return (
    <>
      {personsToShow.map(person =>
        <Person key={person.name + person.number} person={person} />)}
    </>
  );
}

const CFilter = ({ namesToShow, searchText }) => {
  const mapped = searchText === '' ? [''] : namesToShow
    .map(name => <p key={name.official}>{name.common}</p>);
  return (
    <>{mapped.length <= 10 ? mapped : <p>Too many matches</p>}</>
  );
}

export { Filter, CFilter };