const BASE_URL = 'https://restcountries.com/v3.1/name/';

export default function fetchCountries(form) {
    const url = `${BASE_URL}${form}?fields=name,capital,population,flags,languages`;
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });
};
