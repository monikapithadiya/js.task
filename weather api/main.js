fetch("http://localhost:3000/weather")
    .then(response => response.json()) 
    .then(data => {
        let weatherContainer = document.getElementById("weather-container");

        data.forEach(city => {
            weatherContainer.innerHTML += `
                <div>
                    <h3>${city.city}</h3>
                    <p>Temperature: ${city.temperature}°C</p>
                    <p> Humidity: ${city.humidity}%</p>
                    <p> Condition: ${city.condition}</p>
                </div>
                <hr>
            `;
        });
    })
    .catch(error => console.error("Error fetching weather data:", error));