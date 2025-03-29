document.addEventListener("DOMContentLoaded", () => {
    fetchDogs();
});

async function fetchDogs() {
    try {
        
        const response = await fetch("http://localhost:3000/dogs");
        const dogs = await response.json();

        console.log("Fetched Dogs:", dogs); 

        
        const dogContainer = document.getElementById("dog-container");
        dogContainer.innerHTML = ""; 

       
        dogs.forEach(dog => {
            const dogCard = document.createElement("div");
            dogCard.classList.add("dog-card");

            dogCard.innerHTML = `
                <img src="${dog.image}" alt="${dog.breed}">
                <h3>${dog.breed}</h3>
                <p>${dog.description}</p>
            `;

            dogContainer.appendChild(dogCard);
        });

    } catch (error) {
        console.error("Error fetching dog data:", error);
    }
}