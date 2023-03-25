const url = 'https://restcountries.com/v3.1/name/';

export default function fetchCountries(countryName) {
  return fetch(`${url}${countryName}`)
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log('Unvalid country');
      return error;
    });
}
