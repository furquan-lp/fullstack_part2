import { useState, useEffect } from 'react';
import axios from 'axios';

const SearchField = ({ text, searchText, handleSearch }) =>
  <>{text}<input value={searchText} onChange={handleSearch} /></>;

const Country = ({ country }) =>
  <><h2>{country.name.official}</h2>
    <p>capital {country.capital}</p>
    <p>area {country.area}</p>
    <b>languages</b>
    <ul>
      {Object.keys(country.languages)
        .map(language => <li key={language}>{country.languages[language]}</li>)}
    </ul>
    <img src={country.flags.png} />
  </>;

const Countries = ({ countriesToShow, onShowButtonClick, showIndex }) => {
  if (countriesToShow.length === 0) return null;
  const names = countriesToShow.map(country => country.name);
  const mapped = names.map((name, i) =>
    <p key={name.official}>
      {name.common}<button id={i} onClick={onShowButtonClick}>show</button>
    </p>);
  return (
    <>
      {mapped.length <= 10 ? mapped : <p>Too many matches</p>}
      {showIndex >= 0 ? <Country country={countriesToShow[showIndex]} /> : null}
    </>);
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearch] = useState('');
  const [showCountry, setShowCountry] = useState(-1);

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data));
  };
  useEffect(hook, []);

  const handleSearch = (event) => setSearch(event.target.value);
  const handleShowButton = (event) =>
    setShowCountry(showCountry != event.target.id ? event.target.id : -1);

  const countriesToShow = searchText === '' ? [] : countries.filter(country =>
    country.name.common.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <div>
      <h2>Countries</h2>
      <SearchField text='find countries' searchText={searchText} handleSearch={handleSearch} />
      <Countries countriesToShow={countriesToShow}
        onShowButtonClick={handleShowButton}
        showIndex={countriesToShow.length === 1 ? 0 : showCountry} />
    </div>
  );
};

export default App;