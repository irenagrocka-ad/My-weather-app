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
        "Amsterdam", "Athens", "Beijing", "Belgrade", "Berlin", "Bern", "Bratislava", "Brussels", "Bucharest", "Budapest", "Buenos Aires", "Cairo", "Copenhagen", "Delhi",
        "Dublin", "Helsinki", "Kiev", "Krakow", "Lisbon", "Ljubljana",
        "London", "Mexico City", "New York", "Oslo", "Ottawa", "Paris", "Prague", "Reykjavik", "Riga", "Rio de Janeiro", "Rome", "Sarajevo", "Shanghai",
        "Skopje", "Sofia", "Stockholm", "Sydney", "Tallinn", "Tokyo",
        , "Vienna", "Vilnius", "Washington", "Warsaw", "Wroclaw", "Zagreb"
    ];

    let cityName = capitalizeFirstLetter(city);
    if (validCities.includes(cityName)) {
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
    } else {
        console.error("Invalid city entered");

        let defaultImageSrc = "src/images/default-city.jpg";
        let cityImageElement = document.querySelector("#city-image");
        cityImageElement.setAttribute("src", `src/images/rainbow.jpg`);


    }

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
    let cardColor = getColor(response.data.condition.icon);

    let currentTemperature = document.querySelector("#current-temperature-value");
    let currentHumidity = document.querySelector("#current-humidity-value");
    let currentWind = document.querySelector("#current-wind-speed");
    let currentDescription = document.querySelector("#current-description");
    let currentIcon = document.querySelector("#current-weather-icon");
    let currentDateELement = document.querySelector("#current-date");
    let weatherAppElement = document.querySelector(".weather-app")

    currentDateELement.innerHTML = formatDate(currentDate);
    cityElement.innerHTML = response.data.city;
    currentTemperature.innerHTML = `${temperature}`;
    currentHumidity.innerHTML = `${humidity}%`;
    currentWind.innerHTML = `${wind}km/h`;
    currentDescription.innerHTML = `${description}`;
    currentIcon.setAttribute("src", icon);
    weatherAppElement.setAttribute("style", `background-color: ${cardColor};`)

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
function getColor(icon) {
    if (icon === "clear-sky-day") {
        return "#fff2cc";
    } if (icon === "few-clouds-day") {
        return "#87ceeb";
    }
    if (icon === "scattered-clouds-day") {
        return "#459EC3";
    }
    if (icon === "broken-clouds-day") {
        return "#75BDDB";
    }
    if (icon === "shower-rain-day") {
        return "#5DA8C6"
    }
    if (icon === "rain-day") {
        return "#3d85c6";
    }
    if (icon === "thunderstorm-day") {
        return "#244B78";
    }
    if (icon === "snow-day") {
        return "#ffffff";
    }
    if (icon === "mist-day") {
        return "#C4CBD4";
    }
    else {
        return "rgba(182, 160, 230, 0.7)";
    }
}
function displayForecast(response) {
    console.log(response.data);
    let forecastHtml = ""
    response.data.daily.forEach(function (day, index) {
        if (index < 6) {
            if (index > 0) {
                let cardColor = getColor(day.condition.icon);
                forecastHtml = forecastHtml + `
    <div class="weather-forecast-day" style="background-color: ${cardColor};">
        <div class="weather-forecast-date">${formatDay(day.time)}</div> 
                <div><img class="weather-forecast-icon" src="${day.condition.icon_url}" alt="${day.condition.description}"></div>
            <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature"> <strong>${Math.round(day.temperature.maximum)}°C/</strong></span>
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