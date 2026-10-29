# 🌦️ Weather App

A responsive Weather App built using **HTML, CSS, and JavaScript** that allows users to search for a city and view its current weather information using the Open-Meteo API.

The application retrieves a city's geographic coordinates using the Geocoding API and fetches weather information using the Open-Meteo Forecast API.

## ✨ Features

- **City Search:** Search for cities around the world.
- **Current Temperature:** View the current temperature in Celsius.
- **Weather Conditions:** Display conditions such as sunny, cloudy, rainy, and thunderstorms.
- **Humidity:** View the current relative humidity.
- **Wind Speed:** Check the current wind speed.
- **Feels-Like Temperature:** View the apparent temperature.
- **Dynamic Weather Icons:** Display icons based on weather conditions and daytime or nighttime.
- **Error Handling:** Show helpful messages when a city cannot be found or a request fails.
- **Responsive Design:** Works on desktop and mobile screens.
- **API Integration:** Fetch weather information dynamically from an external API.

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- Fetch API
- Async/Await
- JSON
- Open-Meteo Geocoding API
- Open-Meteo Forecast API

## 📂 Project Structure

```text
Weather-App/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## ⚙️ How It Works

1. The user enters a city name in the search box.
2. The Geocoding API retrieves matching location information, including latitude and longitude.
3. JavaScript sends the coordinates to the Open-Meteo Forecast API.
4. The API returns weather information in JSON format.
5. The application displays the temperature, weather condition, humidity, wind speed, and feels-like temperature.

## ▶️ How to Run

1. Clone or download this repository.
2. Open the project folder.
3. Open `index.html` in a web browser.
4. Enter a city name and click **Search**.
5. View the latest weather data returned by the API.

**Note:** An active internet connection is required to fetch weather data. No API key is required for this basic Open-Meteo integration.

## 🌐 Live Demo

[Click here to view the Weather App](https://sowmigasriv.github.io/Weather-Application/)

## 🎯 Project Objective

The objective of this project is to learn front-end web development, API integration, asynchronous JavaScript, JSON data handling, and dynamic DOM manipulation by building a practical weather application.

