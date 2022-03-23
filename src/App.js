import { useState, useEffect } from 'react';
import axios from 'axios';
import { CFilter } from './components/Filter';

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
  </>;

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearch] = useState('');

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data));
  };
  useEffect(hook, []);

  const handleSearch = (event) => setSearch(event.target.value);

  const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchText.toLowerCase()));
  const names = countriesToShow.map(country => country.name);

  return (
    <div>
      <h2>Countries</h2>
      <SearchField text='find countries' searchText={searchText} handleSearch={handleSearch} />
      {countriesToShow.length === 1 ?
        <Country country={countriesToShow[0]} /> :
        <CFilter namesToShow={names} searchText={searchText} />}
    </div>
  );
};

export default App;