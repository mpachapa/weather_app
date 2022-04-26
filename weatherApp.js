//Object for all the weather functions
const weatherApp = {
    //openWeatherAPI Key
    APIkey: "0c14922c58d92686a9cb9945060e539f",
    //Grabs the zipcode from the HTML page
    searchZip: function () {
        console.log(document.querySelector("#search_bar").value)
        this.getCoordinates(document.querySelector("#search_bar").value)
        
    },
    //Calls the geoAPI to get the coordinates of the searched zip code
    getCoordinates: function (zip) {
        console.log(zip);
        fetch("https://api.openweathermap.org/geo/1.0/zip?zip=" + zip + ",US&appid=" + this.APIkey)
        .then(response => response.json())
        .then(coords => this.getWeather(coords))
    },
    //Calls the weatherAPI to get the weather of the coordinates provided by the last API call
    getWeather: function (coords) {
        fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + coords.lat + "&lon=" + coords.lon + "&units=imperial&appid=" + this.APIkey)
        .then(response => response.json())
        .then(data => this.displayWeather(data));
    },
    //To display the current weather on the HTML page
    displayWeather: function (data) {
        console.log(data);
        document.querySelector(".city").innerText = "Current Weather in " + data.name;
        document.querySelector(".currentTemp").innerText = Math.round(data.main.temp) + "°F";
        document.querySelector(".feels_like").innerText = "Feels Like " + Math.round(data.main.feels_like) + "°F";
        document.querySelector(".conditionIcons").src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
        document.querySelector(".conditions").innerText = data.weather[0].main;
        document.querySelector(".tempLow").innerText = "Low: " + Math.round(data.main.temp_min) + "°F";
        document.querySelector(".tempHigh").innerText = "High: " + Math.round(data.main.temp_max) + "°F";
        document.querySelector(".pressure").innerText = "Pressure: " + (data.main.pressure) + " Milibar"
        document.querySelector(".humidity").innerText = "Humidity: " + Math.round(data.main.humidity) + "%";
        document.querySelector(".windSpeed").innerText = Math.round(data.wind.speed) + " MPH Winds";
        document.querySelector(".visibility").innerText = "Visibility: " + (data.visibility)/1000 + " KM";
        let degree = (data.wind.deg)
        let cardinal = "";
        //Converting degree to cardinal direction
        if (degree >= 348.75 && degree <= 11.25){
            cardinal = "N";
        } else if (degree >= 11.25 && degree <= 33.75){
            cardinal = "NNE";
        } else if (degree >= 33.75 && degree <= 56.25){
            cardinal = "NE";
        } else if (degree >= 56.25 && degree <= 78.75){
            cardinal = "ENE";
        } else if (degree >= 78.75 && degree <= 101.25){
            cardinal = "E";
        } else if (degree >= 101.25 && degree <= 123.75){
            cardinal = "ESE";
        } else if (degree >= 123.75 && degree <= 146.25){
            cardinal = "SE";
        } else if (degree >= 146.25 && degree <= 168.75){
            cardinal = "SSE";
        } else if (degree >= 168.75 && degree <= 191.25){
            cardinal = "S";
        } else if (degree >= 191.25 && degree <= 213.75){
            cardinal = "SSW";
        } else if (degree >= 213.75 && degree <= 236.25){
            cardinal = "SW";
        } else if (degree >= 236.25 && degree <= 258.75){
            cardinal = "WSW";
        } else if (degree >= 258.75 && degree <= 281.25){
            cardinal = "W";
        } else if (degree >= 281.25 && degree <= 303.75){
            cardinal = "WNW";
        } else if (degree >= 303.75 && degree <= 326.25){
            cardinal = "NW";
        } else if (degree >= 236.25 && degree <= 348.75){
            cardinal = "NNW";
        } 
        document.querySelector(".windDirection").innerText = "Wind Direction: " + cardinal + " (" + degree +"\xB0)";
    }

}
//Display current day, date and time
const today = new Date();
const [day, month, date, year, hour, minute] = [today.getDay(), today.toLocaleString("default", {month: "long"}), today.getDate(), today.getFullYear(), today.getHours(), today.getMinutes()];
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
function formatTime () {
    if (minute < 10){
        mintute = `0${minute}`
    }else if (hour === 0) {
        return `12:${minute} AM`
    } else if (hour < 12) {
        return `${hour}:${minute} AM`
    } else if (hour > 12) {
        let hourpm = hour - 12;
        return `${hourpm}:${minute} PM`
    } else
        return `${hour}:${minute} PM`
}
document.querySelector(".currentDate").innerHTML = `${weekdays[day]}, ${month} ${date}, ${year} at ${formatTime()}`;


//Event Listeners to make function calls
document.querySelector("#button").addEventListener("click", function () {weatherApp.searchZip()});
document.querySelector("#search_bar").addEventListener("keyup", function (event) {if (event.key == "Enter") {weatherApp.searchZip();}})


console.log(weatherApp.getCoordinates(28209))