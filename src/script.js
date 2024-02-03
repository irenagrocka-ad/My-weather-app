function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    let cityName = capitalizeFirstLetter(searchInputElement.value);
    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = cityName;
    searchCity(cityName);
}
function searchCity(city) {
    let validCities = [
        "Amsterdam", "Athens", "Barcelona", "Beijing", "Belgrade", "Berlin", "Bern", "Birmingham", "Bratislava", "Brussels", "Bucharest", "Budapest",
        "Buenos Aires", "Cairo", "Chicago", "Copenhagen", "Delhi",
        "Dublin", "Edinburgh", "Gdansk", "Helsinki", "Jelenia Gora", "Kiev", "Krakow", "Leeds", "Lisbon", "Ljubljana",
        "London", "Manchester", "Mexico City", "New York", "Nottingham", "Oslo", "Ottawa", "Paris", "Poznan", "Prague", "Reykjavik", "Riga",
        "Rio de Janeiro", "Rome", "Sao Paulo", "Sarajevo", "Shanghai", "Sheffield",
        "Skopje", "Sofia", "Stockholm", "Sydney", "Tallinn", "Tokyo", "Toronto",
        , "Vienna", "Vilnius", "Washington", "Warsaw", "Wroclaw", "York", "Zagreb"
    ];

    let cityName = capitalizeFirstLetter(city);
    if (validCities.includes(cityName)) {
        let cityElement = document.querySelector("#current-city");
        let bodyElement = document.querySelector("body");
        cityElement.innerHTML = cityName;
        let key = "3doat099fbcfb24e74ea400f10f43b8a"; // Replace with your actual API key
        let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}&units=metric`;
        let cityImageElement = document.querySelector("#city-image");
        cityImageElement.setAttribute("src", `src/images/${city}.jpg`);
        cityImageElement.setAttribute("alt", `${city} image`);
        bodyElement.setAttribute("style", `background-image: url("src/images/${city}.jpg");`);

        axios.get(apiUrl)
            .then(displayCurrentWeather)
            .catch(error => console.error("Error fetching weather data:", error));
    } else {
        console.error("Invalid city entered");
        setDefaultImage();
    }
}
function setDefaultImage() {
    let defaultImageSrc = "src/images/rainbow.jpg";
    let defaultBackgroundImageSrc = "src/images/rainbow.jpg";
    let cityImageElement = document.querySelector("#city-image");
    let bodyElement = document.querySelector("body");
    bodyElement.setAttribute("style", `background-image: url("${defaultBackgroundImageSrc}");`);
    cityImageElement.setAttribute("src", defaultImageSrc);
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
function displayCurrentWeather(response) {
    console.log(response.data);
    let cityElement = document.querySelector("#current-city");
    let currentDate = new Date(response.data.time * 1000);
    let temperature = Math.round(response.data.temperature.current);
    let humidity = response.data.temperature.humidity;
    let wind = Math.round(response.data.wind.speed);
    let description = response.data.condition.description;
    let icon = response.data.condition.icon_url;
    let cardColor = getCardColor(response.data.condition.icon);
    let searchButtonColor = getForecastColor(response.data.condition.icon);
    let fontColor = getFontColor(response.data.condition.icon);

    let currentTemperature = document.querySelector("#current-temperature-value");
    let currentHumidity = document.querySelector("#current-humidity-value");
    let currentWind = document.querySelector("#current-wind-speed");
    let currentDescription = document.querySelector("#current-description");
    let currentIcon = document.querySelector("#current-weather-icon");
    let currentDateELement = document.querySelector("#current-date");
    let weatherAppElement = document.querySelector(".weather-app")
    let weatherAppDataElement = document.querySelector(".weather-app-data")
    let searchButtonElement = document.querySelector(".search-button");

    searchButtonElement.setAttribute("style", `background-color: ${searchButtonColor}; color: ${fontColor};`);
    currentDateELement.innerHTML = formatDate(currentDate);
    cityElement.innerHTML = response.data.city;
    currentTemperature.innerHTML = `${temperature}`;
    currentHumidity.innerHTML = `${humidity}%`;
    currentWind.innerHTML = `${wind}km/h`;
    currentDescription.innerHTML = `${description}`;
    currentIcon.setAttribute("src", icon);
    weatherAppElement.setAttribute("style", `background-color: ${cardColor};`);
    weatherAppDataElement.setAttribute("style", `color: ${fontColor};`);

    getForecast(response.data.city);
}
function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);

    let days = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
    ];
    return days[date.getDay()];

}
function getCardColor(icon) {
    if (icon === "clear-sky-day") {
        return "rgba(248, 237, 130, 0.7)";
    } if (icon === "few-clouds-day") {
        return "rgba(80, 227, 222, 0.7)";
    }
    if (icon === "scattered-clouds-day") {
        return "rgba(117, 229, 229, 0.7)";
    }
    if (icon === "broken-clouds-day") {
        return "rgba(80, 155, 227, 0.7)";
    }
    if (icon === "shower-rain-day") {
        return "rgba(80, 109, 227, 0.7)";
    }
    if (icon === "rain-day") {
        return "rgba(24, 58, 193, 0.7)";
    }
    if (icon === "thunderstorm-day") {
        return "rgba(10, 31, 115, 0.7)";
    }
    if (icon === "snow-day") {
        return "rgba(255 255, 255, 0.7)";
    }
    if (icon === "mist-day") {
        return "rgba(193, 194, 200, 0.7)";
    }
    else {
        return "rgba(182, 160, 230, 0.7)";
    }
}
function getForecastColor(icon) {
    if (icon === "clear-sky-day") {
        return "rgba(237, 202, 96)";
    } if (icon === "few-clouds-day") {
        return "rgba(80, 227, 222)";
    }
    if (icon === "scattered-clouds-day") {
        return "rgba(117, 229, 229)";
    }
    if (icon === "broken-clouds-day") {
        return "rgba(80, 155, 227)";
    }
    if (icon === "shower-rain-day") {
        return "rgba(80, 109, 227)";
    }
    if (icon === "rain-day") {
        return "rgba(24, 58, 193)";
    }
    if (icon === "thunderstorm-day") {
        return "rgba(10, 31, 115)";
    }
    if (icon === "snow-day") {
        return "rgba(255 255, 255)";
    }
    if (icon === "mist-day") {
        return "rgba(193, 194, 200)";
    }
    else {
        return "rgba(119, 20, 207)";
    }
}
function getFontColor(icon) {
    if (icon === "clear-sky-day" || icon === "few-clouds-day" || icon === "scattered-clouds-day" || icon === "broken-clouds-day" || icon === "snow-day") {
        return "rgba(0, 0, 0)";
    }
    else {
        return "rgba(255, 255, 255)";
    }
}
function displayForecast(response) {
    console.log(response.data);
    let forecastHtml = ""
    response.data.daily.forEach(function (day, index) {
        if (index < 6) {
            if (index > 0) {
                let cardColor = getForecastColor(day.condition.icon);
                let fontColor = getFontColor(day.condition.icon);
                forecastHtml = forecastHtml + `
    <div class="weather-forecast-day" style="background-color: ${cardColor};">
        <div class="weather-forecast-date" style="color: ${fontColor};">${formatDay(day.time)}</div> 
                <div><img class="weather-forecast-icon"  src="${day.condition.icon_url}" alt="${day.condition.description}"></div>
            <div class="weather-forecast-temperatures"  style="color: ${fontColor};">
                <span class="weather-forecast-temperature" > <strong>${Math.round(day.temperature.maximum)}°C/</strong></span>
                <span class="weather-forecast-temperature-low-temp">${Math.round(day.temperature.minimum)}°C</span>
            </div>
        </li >
    </div >
            `;
            }
        }
    });
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
}
function getForecast(city) {
    let key = "3doat099fbcfb24e74ea400f10f43b8a"; // Replace with your actual API key
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${key}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
searchCity("Wroclaw");