# Weather Web App 🌦️

![App Screenshot](images/weather_web.png)

## 📖 Introduction

This is a real-time weather application. Users can quickly check the current weather conditions for any location globally by entering a **city name** or a **zip code**.
Reference Tutorial: [Code A Weather App in Pure JavaScript](https://www.youtube.com/watch?v=ZPG2wGNj6J4)

## ✨ Core Features

- **Real-Time Data Display**: Show current weather information and weather forcast for the five following days.
- **Multi-Mode Search**: Supports queries by city name (e.g., "London") or 5-digit zip code.
- **Dynamic Backgrounds**: Automatically updates full-screen background images according to API weather states.
- **Local Time Display**: Accurately calculates and displays the local day, date, and time of the target city based on its timezone.

## 🛠️ Tech Stack

### HTML5 & CSS3

- Flexbox, Grid, Classmorphism

### JavaScript (ES6+)

- Fetch API, DOM Manipulation

### RESTful API

- [OpenWeatherMap API](https://openweathermap.org/api)

## 🚀 Setup

1.  **Get an API Key**:
    - Go to [OpenWeatherMap](https://home.openweathermap.org/users/sign_up) and sign up for a free account.
    - Generate a new key.
2.  **Configure the App**:
    - Locate the `appId` constant at the top of the `script.js`:
      ```javascript
      const appId = "YOUR_API_KEY_HERE";
      ```
    - Replace the placeholder with your actual API key.
3.  **Run the Project**:
    - Clone or download this repository to your local machine.
    - Open the `index.html` file directly in your browser.
4.  **Enjoy**:
    - Enter a city name (e.g., `Beijing`) or a zip code, and click the Search button.

## 📄 License

[MIT](https://mit-license.org/)
