import { useState, useEffect } from 'react';
import axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY;

const SearchField = ({ text, searchText, handleSearch }) =>
  <>{text}<input value={searchText} onChange={handleSearch} /></>;

const Country = ({ country, oWeather }) =>
  <><h2>{country.name.official}</h2>
    <p>capital {country.capital}</p>
    <p>area {country.area}</p>
    <b>languages</b>
    <ul>
      {Object.keys(country.languages)
        .map(language => <li key={language}>{country.languages[language]}</li>)}
    </ul>
    <img src={country.flags.png} alt={'Flag of ' + country.name.common} />
    {oWeather.length !== 0 ?
      <Weather capital={country.capital[0]} oWeather={oWeather} />
      : null}
  </>;

const Weather = ({ capital, oWeather }) =>
  <><h2>Weather in {capital}</h2>
    <p>temperature {oWeather.current.temp} Celsius</p>
    <WeatherIcon weather={oWeather.current.weather[0]} />
    <p>wind {oWeather.current.wind_speed} m/s</p>
  </>;


const WeatherIcon = ({ weather }) =>
  <><img src=
    {'http://openweathermap.org/img/wn/' + weather.icon + '@2x.png'}
    alt={'Weather icon for ' + weather.description} /></>;

const Countries = ({ countriesToShow, onShowButtonClick, showIndex, oWeather }) => {
  if (countriesToShow.length === 0) return null;
  const names = countriesToShow.map(country => country.name);
  const mapped = names.map((name, i) =>
    <p key={name.official}>
      {name.common}<button id={i} onClick={onShowButtonClick}>show</button>
    </p>);
  return (
    <>
      {mapped.length <= 10 ? mapped : <p>Too many matches</p>}
      {showIndex >= 0 ?
        <Country country={countriesToShow[showIndex]} oWeather={oWeather} />
        : null}
    </>);
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearch] = useState('');
  const [showCountry, setShowCountry] = useState(-1);
  const [latlng, setLatlng] = useState([0, 0]);
  const [oWeather, setOWeather] = useState([]);

  const restCountriesHook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data));
  };
  const oWeatherHook = () => {
    const getter = 'https://api.openweathermap.org/data/2.5/onecall?lat='
      + latlng[0] + '&lon=' + latlng[1] +
      '&exclude=minutely,hourly,daily&appid=' + api_key;
    if (!(latlng[0] === 0 && latlng[1] === 0)) {
      axios
        .get(getter)
        .then(response => setOWeather(response.data));
    }
  };
  useEffect(restCountriesHook, []);
  useEffect(oWeatherHook, latlng);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setShowCountry(-1);
  };
  const handleShowButton = (event) => {
    if (event.target.id >= 0) {
      const currentLatlng = countriesToShow[event.target.id].capitalInfo.latlng;
      if (currentLatlng[0] !== latlng[0] || currentLatlng[1] !== latlng[1])
        setLatlng(currentLatlng);
    }
    setShowCountry(showCountry !== event.target.id ? event.target.id : -1);
  };

  const countriesToShow = searchText === '' ? [] : countries.filter(country =>
    country.name.common.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <div>
      <h2>Countries</h2>
      <SearchField text='find countries' searchText={searchText} handleSearch={handleSearch} />
      <Countries countriesToShow={countriesToShow}
        onShowButtonClick={handleShowButton}
        showIndex={showCountry}
        oWeather={oWeather} />
    </div>
  );
};

export default App;