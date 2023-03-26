const URL = 'https://restcountries.com/v3.1/name/';

export default function fetchCountries(countryName) {
  return fetch(`${URL}${countryName}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    } else {
      return response.json();
    }
  });
}
