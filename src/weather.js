import _, { get } from 'lodash';
import './style.css';

const celsiusTitle = document.querySelector(".celsius .title");
const celsiusTemp = document.querySelector(".celsius .temp");
const fahrenheitTitle = document.querySelector(".fahrenheit .title");
const fahrenheitTemp = document.querySelector(".fahrenheit .temp");
const searchInput = document.querySelector('input');
const button = document.querySelector('button');
const tempTitle = document.querySelector("p");
let temperatureCelsius;
let temperatureFahrenheit;
let city;
let country;

async function getTemp(){
   const searchTerm = searchInput.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
   if(searchTerm !== ''){
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=c2ee4386538f4a81883124521232510&q=${searchTerm}&aqi=no`, { mode: 'cors' })
      const data = await response.json();
      temperatureCelsius = data.current.temp_c;
      temperatureFahrenheit = data.current.temp_f;
      city = data.location.name;
      country = data.location.country;
      setText();
   }
}

function setText(){
   celsiusTitle.textContent = 'Celsius (°C)'
   celsiusTemp.textContent = temperatureCelsius;
   fahrenheitTitle.textContent = 'Fahrenheit (°C)';
   fahrenheitTemp.textContent = temperatureFahrenheit;
   tempTitle.textContent = `Temperature in ${city}, ${country}`;
}

button.addEventListener('click', getTemp);
   searchInput.addEventListener('keyup', function(event) {
      if (event.key === 'Enter') {
         getTemp();
      }
   }
);
