# Weather Web App 🌦️

![App Screenshot](weather_web.png)
<!-- Please replace 'screenshot.png' with your actual screenshot file path -->

## 📖 Introduction

This is a clean and visually appealing real-time weather application. Users can quickly check the current weather conditions for any location globally by entering a **city name** or a **zip code**.

The project aims to provide an immersive user experience. The background image automatically changes based on real-time weather conditions (e.g., Clear, Cloudy, Rain, Snow), allowing users to feel the weather atmosphere instantly.

## ✨ Core Features

-   **Multi-Mode Search**: Supports queries by city name (e.g., "London") or 5-digit zip code.
-   **Dynamic Immersive Backgrounds**: Automatically updates full-screen background images according to API weather states (Clear, Clouds, Rain, Snow, Thunderstorm, etc.).
-   **Real-Time Data Display**:
    -   Current Temperature (°C)
    -   Weather Description (e.g., "Scattered clouds")
    -   Wind Speed (m/s)
    -   Humidity (%)
    -   Dynamic Weather Icons
-   **Local Time Display**: Accurately calculates and displays the local day, date, and time of the target city based on its timezone.
-   **Glassmorphism UI**: Uses modern Glassmorphism design effects to enhance visual quality.

## 🛠️ Tech Stack

This project is built entirely with native frontend technologies.

### HTML5
-   Semantic HTML structure.
-   Basic form controls and input validation.

### CSS3
-   **Flexbox Layout**: Used for vertical centering and flexible arrangement of internal elements.
-   **Visual Effects**:
    -   `backdrop-filter: blur()` to achieve the glassmorphism effect on the weather card.
    -   `text-shadow` and `box-shadow` to enhance text readability and card depth.
-   **Responsive Design Basics**: Uses fluid layout to adapt to different viewports.

### JavaScript (ES6+)
-   **Fetch API & Promises**: Explicitly utilizes **ES6 Promises** to handle asynchronous network requests and response chaining, ensuring a smooth data flow from the API to the UI.
-   **DOM Manipulation**: Efficiently queries and updates DOM elements for dynamic content rendering.
-   **Event Handling**: Listens for form submission events and prevents default refresh behavior to create a Single Page Application (SPA) feel.
-   **Date & Time Processing**: Utilizes the `Date` object and UTC timestamps combined with the API's timezone offset to accurately calculate and format the local time of the target city.

## 🚀 How to Run

1.  **Get an API Key**:
    -   Go to [OpenWeatherMap](https://home.openweathermap.org/users/sign_up) and sign up for a free account.
    -   Navigate to your API keys tab and generate a new key.
2.  **Configure the App**:
    -   Open `script.js` in your code editor.
    -   Locate the `appId` constant at the top of the file:
        ```javascript
        const appId = "YOUR_API_KEY_HERE";
        ```
    -   Replace the placeholder with your actual API key.
3.  **Run the Project**:
    -   Clone or download this repository to your local machine.
    -   Open the `index.html` file directly in your browser.
4.  **Enjoy**:
    -   Enter a city name (e.g., `Beijing`) or a zip code, and click the Search button.

## 🔌 API Reference

This project uses the [OpenWeatherMap API](https://openweathermap.org/api) to fetch real-time weather data.

## 📄 License

[MIT](https://mit-license.org/)