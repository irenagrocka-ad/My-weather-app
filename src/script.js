function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    let cityName = capitalizeFirstLetter(searchInputElement.value);
    let cityElement = document.querySelector("#current-city");

    cityElement.innerHTML = cityName;
    let key = "3doat099fbcfb24e74ea400f10f43b8a"; // Replace with your actual API key
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${key}&units=metric`;

    axios.get(apiUrl).then(displayWeather);
    axios.get(apiUrl)
        .then(displayWeather)
        .catch(error => console.error("Error fetching weather data:", error));
    let currentDateELement = document.querySelector("#current-date");
    let currentDate = new Date();
    currentDateELement.innerHTML = formatDate(currentDate);

}
function capitalizeFirstLetter(string) {
    return string.replace(/\b\w/g, (char) => char.toUpperCase());
}
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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);


function displayWeather(response) {
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

    currentTemperature.innerHTML = `${temperature}`;
    currentHumidity.innerHTML = `${humidity}%`;
    currentWind.innerHTML = `${wind}km/h`;
    currentDescription.innerHTML = `${description}`;
    currentIcon.setAttribute("src", icon);
}