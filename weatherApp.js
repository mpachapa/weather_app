//Object for all the weather functions
const weatherApp = {
    //openWeatherAPI Key
    APIkey: "0c14922c58d92686a9cb9945060e539f",
    //Grabs the zipcode from the HTML page
    searchZip: function () {
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
        document.querySelector(".humidity").innerText = Math.round(data.main.humidity) + "% Humidity";
        document.querySelector(".windSpeed").innerText = Math.round(data.wind.speed) + " MPH Winds";
    }

}

//Event Listeners to make function calls
document.querySelector("#search_bar").addEventListener("keyup", function (event) {if (event.key == "Enter") {weather.searchZip();}})


// console.log(weatherApp.getCoordinates(29412))