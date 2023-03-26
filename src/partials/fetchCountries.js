const URL = 'https://restcountries.com/v3.1/name/';
const PARAMETERS = `?fields=name,capital,population,flags,languages`;

export default function fetchCountries(countryName) {
  return fetch(`${URL}${countryName}${PARAMETERS}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    } else {
      return response.json();
    }
  });
}
