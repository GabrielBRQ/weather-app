import _ from 'lodash';
import searchIcon from './img/search.png'
import './style.css';

async function getInfo(searchInput){
   const searchTerm = searchInput.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
   if(searchTerm !== ''){
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=c2ee4386538f4a81883124521232510&q=${searchTerm}&aqi=no`, { mode: 'cors' })
      const data = await response.json();
      let temperatureCelsius = data.current.temp_c;
      let temperatureFahrenheit = data.current.temp_f;
      let city = data.location.name;
      let country = data.location.country;
      const time = data.location.localtime.split(' ');
      let dayTime = time[1]
      changeDayStyle(dayTime);
      setText(temperatureCelsius, temperatureFahrenheit, city, country);
   }
}

function setText(temperatureCelsius, temperatureFahrenheit, city, country){
   const celsiusTitle = document.querySelector(".celsius .title");
   const celsiusTemp = document.querySelector(".celsius .temp");
   const fahrenheitTitle = document.querySelector(".fahrenheit .title");
   const fahrenheitTemp = document.querySelector(".fahrenheit .temp");
   const tempTitle = document.querySelector("p");

   celsiusTitle.textContent = 'Celsius (°C)'
   celsiusTemp.textContent = temperatureCelsius;
   fahrenheitTitle.textContent = 'Fahrenheit (°C)';
   fahrenheitTemp.textContent = temperatureFahrenheit;
   tempTitle.textContent = `Temperature in ${city}, ${country}`;
}

function changeDayStyle(dayTime){
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
}

function buttonListener(){
   const button = document.querySelector("button");
   const searchInput = document.querySelector("input");

   button.addEventListener('click', getInfo(searchInput));
      searchInput.addEventListener('keyup', function(event) {
         if (event.key === 'Enter') {
            getInfo(searchInput);
         }
      }
   );
}

function addSearchImg(){
   const imgButton = document.querySelector("button img");
   imgButton.src = searchIcon;
}

addSearchImg();
buttonListener();