//function to show temperature
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
 
 //function to change day time according to hour
 function changeDayStyle(dayTime){
    const tempTitle = document.querySelector(".temp-title");
    const moonLayout = document.querySelector(".moon-layout");
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


 export {
    setText,
    changeDayStyle
 }