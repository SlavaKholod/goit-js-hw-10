import './css/styles.css';
import fetchCountries from './partials/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
var debounce = require('lodash.debounce');

const refs = {
  inputArea: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.inputArea.addEventListener(
  'input',
  debounce(onSearchCountries, DEBOUNCE_DELAY)
);

let countryName = '';

function onSearchCountries() {
  countryName = refs.inputArea.value.trim();

  if (countryName !== '') {
    fetchCountries(countryName)
      .then(countries => {
        checkCountriesQuantity(countries);
      })
      .catch(Error => {
        clearMarkup();
        Notify.failure('Oops, there is no country with that name');
        return Error;
      });
  } else {
    clearMarkup();
  }
}

function checkCountriesQuantity(countries) {
  if (countries.length > 10) {
    clearMarkup();
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (countries.length > 1 && countries.length < 10) {
    clearMarkup();
    makeSeveralCountriesMarkup(countries);
  } else {
    clearMarkup();
    makeOneCountryMarkup(countries);
  }
}

function makeSeveralCountriesMarkup(countries) {
  countries.map(country => {
    const markup = `<li class="country-list__item"><img src=${country.flags.svg} alt=${country.flags.alt} width=50px><p>${country.name.official}</p></li>`;
    refs.countryList.insertAdjacentHTML('beforeend', markup);
  });
}

function makeOneCountryMarkup(countries) {
  countries.map(country => {
    const languages = Object.values(country.languages).join(', ');
    const markup = `<div class="country-info__header">
      <img src=${country.flags.svg} alt=${country.flags.alt} width="100px">
      <h1>${country.name.official}</h1>
    </div>
    <ul class="country-info__list">
      <li class="country-info__item"><span>Capital:</span> ${country.capital}</li>
      <li class="country-info__item"><span>Population:</span> ${country.population}</li>
      <li class="country-info__item"><span>Languages:</span> ${languages}</li>
    </ul>`;
    refs.countryInfo.insertAdjacentHTML('afterbegin', markup);
  });
}

function clearMarkup() {
  if (
    refs.countryInfo.childNodes.length !== 0 ||
    refs.countryList.childNodes.length !== 0
  ) {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
  }
}
