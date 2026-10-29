
var cityInput = document.getElementById("city-input");
var searchBtn = document.getElementById("search-btn");
var message = document.getElementById("message");
var weatherCard = document.getElementById("weather-card");

// Search button
searchBtn.addEventListener("click", getWeather);

// Search using Enter key
cityInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});

// Find city and get weather
async function getWeather() {
    var city = cityInput.value.trim();

    if (city === "") {
        message.textContent = "Please enter a city name!";
        weatherCard.hidden = true;
        return;
    }

    searchBtn.disabled = true;
    message.textContent = "Getting weather information...";
    weatherCard.hidden = true;

    try {
        // Step 1: Search for the city
        var geoURL =
            "https://geocoding-api.open-meteo.com/v1/search?name=" +
            encodeURIComponent(city) +
            "&count=10&language=en&format=json";

        var geoResponse = await fetch(geoURL);

        if (!geoResponse.ok) {
            throw new Error("Unable to search for the city.");
        }

        var geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("City not found. Please check the spelling.");
        }

        var searchName = city.toLowerCase();

        // Step 2: Prefer the exact city in India
        var place = geoData.results.find(function(item) {
            return (
                item.country_code === "IN" &&
                item.name.toLowerCase() === searchName
            );
        });

        // Special handling for Bangalore / Bengaluru
        if (
            !place &&
            ["bangalore", "bengaluru"].includes(searchName)
        ) {
            place = geoData.results.find(function(item) {
                return (
                    item.country_code === "IN" &&
                    ["bangalore", "bengaluru"].includes(
                        item.name.toLowerCase()
                    )
                );
            });
        }

        // Prefer an exact name match in other countries if no Indian match
        if (!place) {
            place = geoData.results.find(function(item) {
                return item.name.toLowerCase() === searchName;
            });
        }

        // Otherwise use the first available result
        if (!place) {
            place = geoData.results[0];
        }

        // Step 3: Fetch current weather
        var weatherURL =
            "https://api.open-meteo.com/v1/forecast" +
            "?latitude=" + place.latitude +
            "&longitude=" + place.longitude +
            "&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m" +
            "&timezone=auto";

        var weatherResponse = await fetch(weatherURL);

        if (!weatherResponse.ok) {
            throw new Error("Unable to fetch weather data.");
        }

        var weatherData = await weatherResponse.json();
        var current = weatherData.current;
        cityInput.value = "";

        // Step 4: Display the city and weather
        var locationName = place.name;

        if (place.admin1) {
            locationName += ", " + place.admin1;
        }

        locationName += ", " + place.country;

        document.getElementById("city-name").textContent =
            locationName;

        document.getElementById("temperature").textContent =
            Math.round(current.temperature_2m) + "°C";

        document.getElementById("condition").textContent =
            getCondition(current.weather_code);

        document.getElementById("weather-icon").textContent =
            getWeatherIcon(current.weather_code, current.is_day);

        document.getElementById("humidity").textContent =
            current.relative_humidity_2m + "%";

        document.getElementById("wind").textContent =
            current.wind_speed_10m + " km/h";

        document.getElementById("feels-like").textContent =
            Math.round(current.apparent_temperature) + "°C";

        weatherCard.hidden = false;
        message.textContent = "Current weather information";

    } catch (error) {
        message.textContent =
            error.message || "Something went wrong. Please try again.";

        weatherCard.hidden = true;

    } finally {
        searchBtn.disabled = false;
    }
}

// Convert weather codes into descriptions
function getCondition(code) {
    if (code === 0) return "Clear Sky";
    if (code === 1) return "Mainly Clear";
    if (code === 2) return "Partly Cloudy";
    if (code === 3) return "Overcast";

    if ([45, 48].includes(code)) return "Fog";

    if ([51, 53, 55, 56, 57].includes(code)) {
        return "Drizzle";
    }

    if ([61, 63, 65, 66, 67].includes(code)) {
        return "Rain";
    }

    if ([71, 73, 75, 77, 85, 86].includes(code)) {
        return "Snow";
    }

    if ([80, 81, 82].includes(code)) {
        return "Rain Showers";
    }

    if ([95, 96, 99].includes(code)) {
        return "Thunderstorm";
    }

    return "Weather information unavailable";
}

// Select an icon for the weather
function getWeatherIcon(code, isDay) {
    if (code === 0) {
        return isDay ? "☀️" : "🌙";
    }

    if ([1, 2].includes(code)) {
        return isDay ? "🌤️" : "☁️";
    }

    if (code === 3) return "☁️";

    if ([45, 48].includes(code)) return "🌫️";

    if ([51, 53, 55, 56, 57, 61, 63, 65,
        66, 67, 80, 81, 82].includes(code)) {
        return "🌧️";
    }

    if ([71, 73, 75, 77, 85, 86].includes(code)) {
        return "❄️";
    }

    if ([95, 96, 99].includes(code)) {
        return "⛈️";
    }

    return "🌡️";
}

            