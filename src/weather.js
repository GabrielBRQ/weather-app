import _, { get } from 'lodash';
import searchIcon from './img/search.png'
import './style.css';

const celsiusTitle = document.querySelector(".celsius .title");
const celsiusTemp = document.querySelector(".celsius .temp");
const fahrenheitTitle = document.querySelector(".fahrenheit .title");
const fahrenheitTemp = document.querySelector(".fahrenheit .temp");
const searchInput = document.querySelector("input");
const button = document.querySelector("button");
const imgButton = document.querySelector("button img");
const tempTitle = document.querySelector("p");

let temperatureCelsius;
let temperatureFahrenheit;
let city;
let country;
let dayTime;

async function getInfo(){
   const searchTerm = searchInput.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
   if(searchTerm !== ''){
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=c2ee4386538f4a81883124521232510&q=${searchTerm}&aqi=no`, { mode: 'cors' })
      const data = await response.json();
      temperatureCelsius = data.current.temp_c;
      temperatureFahrenheit = data.current.temp_f;
      city = data.location.name;
      country = data.location.country;
      const time = data.location.localtime.split(' ');
      dayTime = time[1]
      changeDayStyle();
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

function changeDayStyle(){
   const moonLayout = document.querySelector(".moon-layout")
   const body = document.body;
   const moon = document.querySelector(".moon");
   const moonWidth = moon.offsetWidth;
   const stars = document.querySelector(".stars");
   const timePart = dayTime.split(':');
   const hour = parseInt(timePart[0]);
   moonLayout.style.opacity = '1';
   if(hour < 16 && hour > 5){
      moon.style.backgroundColor = "#f7f4e0"
      moon.style.right = '80vw';
      stars.style.opacity = '0';
      moon.style.opacity = "1";
      body.style.backgroundColor = '#7FC3FF';
   }else if(hour < 19 && hour > 5){
      moon.style.backgroundColor = "#f7f4e0"
      moon.style.right = `calc(50vw - ${moonWidth}px)`;
      moon.style.opacity = "0.5";
      stars.style.opacity = '0';
      body.style.backgroundColor = '#FDA92C';
   }else{
      moon.style.backgroundColor = "white"
      moon.style.right = '10vw';
      moon.style.opacity = "1";
      stars.style.opacity = '1';
   }
   console.log(hour);
}

button.addEventListener('click', getInfo);
   searchInput.addEventListener('keyup', function(event) {
      if (event.key === 'Enter') {
         getInfo();
      }
   }
);

imgButton.src = searchIcon