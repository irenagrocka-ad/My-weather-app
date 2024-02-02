function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    let cityName = capitalizeFirstLetter(searchInputElement.value);
    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = cityName;
    searchCity(cityName);

}

function searchCity(city) {
    let cityName = capitalizeFirstLetter(city);
    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = cityName;
    let key = "3doat099fbcfb24e74ea400f10f43b8a"; // Replace with your actual API key
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}&units=metric`;
    let cityImageElement = document.querySelector("#city-image");
    cityImageElement.setAttribute("src", `src/images/${city}.jpg`);
    axios.get(apiUrl).then(displayCurrentWeather);
    axios.get(apiUrl)
        .then(displayCurrentWeather)
        .catch(error => console.error("Error fetching weather data:", error));
}

searchCity("Wroclaw");
function capitalizeFirstLetter(string) {
    return string.replace(/\b\w/g, (char) => char.toUpperCase());
}
function convertToLowerCase(inputString) {
    return inputString.toLowerCase();
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    if (hours < 10) {
        hours = `0${hours}`;
    }

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    let formattedDay = days[day];
    return `${formattedDay} ${hours}:${minutes}`;
}

function displayCurrentWeather(response) {
    let currentDate = new Date(response.data.time * 1000);
    let temperature = Math.round(response.data.temperature.current);
    let humidity = response.data.temperature.humidity;
    let wind = Math.round(response.data.wind.speed);
    let description = response.data.condition.description;
    let icon = response.data.condition.icon_url;
    let currentTemperature = document.querySelector("#current-temperature-value");
    let currentHumidity = document.querySelector("#current-humidity-value");
    let currentWind = document.querySelector("#current-wind-speed");
    let currentDescription = document.querySelector("#current-description");
    let currentIcon = document.querySelector("#current-weather-icon");
    let currentDateELement = document.querySelector("#current-date");
    currentDateELement.innerHTML = formatDate(currentDate);

    currentTemperature.innerHTML = `${temperature}`;
    currentHumidity.innerHTML = `${humidity}%`;
    currentWind.innerHTML = `${wind}km/h`;
    currentDescription.innerHTML = `${description}`;
    currentIcon.setAttribute("src", icon);
}
function displayForecast() {

    let forecastElement = document.querySelector("#forecast");
    let days = ["Sat", "Sun", "Mon", "Tue", "Wed"];
    let forecastHtml = ""
    days.forEach(function (day) {
        forecastHtml = forecastHtml + `
    <div class="weather-forecast-day">
        <div class="weather-forecast-date">${day}</div> 
        <br/>
                <div class="weather-forecast-icon">🌤️</div> 
                <br/>
            <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature"> <strong>6/</strong></span>
                <span class="weather-forecast-temperature low-temp">1°C</span>
            </div>
        </li>
    </div>
`;
    });
    forecastElement.innerHTML = forecastHtml;
}

displayForecast();
