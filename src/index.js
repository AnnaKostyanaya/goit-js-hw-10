import './css/styles.css';
import fetchCountries from './js/fetchCountries';
import debounce from "lodash.debounce";
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('input#search-box'),
    countryList: document.querySelector('.country-list'), 
    countryInfo:document.querySelector('.country-info'), 
}

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(evt) { 
    const form = evt.target.value.trim();
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    if (form !== "") {
        fetchCountries(form).then(data => {
        if (data.length === 1) {
            if (refs.countryList !== '') {
                refs.countryList.innerHTML = '';
            }
            const markUpAddData = createCountryMarkUp(data[0].name.official, data[0].flags.svg, data[0].capital, data[0].population, Object.values(data[0].languages).join(", "));
            refs.countryInfo.innerHTML = markUpAddData;
        }
        if (data.length > 1 && data.length <= 10) {
            if (refs.countryInfo !== '') {
                refs.countryInfo.innerHTML = '';
            }
            for (const element of data) {
                const markUp = createMarkUp(element.name.official, element.flags.svg);
                refs.countryList.innerHTML += markUp;
            }
        }
        if (data.length > 10) {
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        }
    }).catch(error => { Notiflix.Notify.failure("Oops, there is no country with that name") });
    } 
}

function createMarkUp(official, flags) {
        return `
        <li class="countries"><img class="flags" src="${flags}" alt="${official}">${official}</li>
        `
}

function createCountryMarkUp(official, flags, capital, population, languages) {
    return `
        <p class="country"><img class="flags_big" src="${flags}" alt="${official}">${official}</p>
        <p class="capital">Capital: ${capital}</p>
        <p class = "population">Population: ${population}</p>
        <p class = "lang">Languages: ${languages} </p>
        `
}