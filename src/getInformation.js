import { setText, changeDayStyle } from "./dom-control";

async function getInfo(searchInput) {
    const spanError = document.querySelector('span');
    const searchTerm = searchInput.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (searchTerm !== '') {
       try {
          const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=c2ee4386538f4a81883124521232510&q=${searchTerm}&aqi=no`, { mode: 'cors' });
          if (!response.ok) {
             spanError.textContent = 'AN ERROR OCCURRED, PLEASE RELOAD THE PAGE';
          }
          const data = await response.json();
          console.log(data);
          let temperatureCelsius = data.current.temp_c;
          let temperatureFahrenheit = data.current.temp_f;
          let city = data.location.name;
          let country = data.location.country;
          const time = data.location.localtime.split(' ');
          console.log(city);
          console.log(country);
          let dayTime = time[1];
          console.log(dayTime);
          changeDayStyle(dayTime);
          setText(temperatureCelsius, temperatureFahrenheit, city, country);
       } catch (error) {
          spanError.textContent = 'AN ERROR OCCURRED, PLEASE RELOAD THE PAGE';
       }
    }
 }

 export {
    getInfo,
 }