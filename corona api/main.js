fetch("http://localhost:3000/covid")
    .then(response => response.json()) 
    .then(data => {
        let covidContainer = document.getElementById("covid-container");

        data.forEach(country => {
            covidContainer.innerHTML += `
                <h3>${country.country}</h3>
                <p> Cases: ${country.totalCases}</p>
                <p> Deaths: ${country.totalDeaths}</p>
                <p> Recovered: ${country.totalRecovered}</p>
                <p> Active: ${country.activeCases}</p>
                <hr>
            `;
        });
    })
    .catch(error => console.log("Error fetching COVID-19 data:", error));
