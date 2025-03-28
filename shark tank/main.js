let mainSection = document.getElementById("data-list-wrapper");

// pitch
let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");

// Update pitch
let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");

//Update price
let updatePricePitchId = document.getElementById("update-price-pitch-id");
let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
let updatePricePitchPriceButton = document.getElementById("update-price-pitch");

//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterFood = document.getElementById("filter-Food");
let filterElectronics = document.getElementById("filter-Electronics");
let filterPersonalCare = document.getElementById("filter-Personal-Care");

//Search by title/founder

let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");

// Problem 1. List of pitches on page load [3}

let arr=[]

function fetchData() {
    fetch('http://localhost:3000/pitches')
        .then((res) => res.json())
        .then((data) => {
            console.log("Fetched data:", data);
            if (Array.isArray(data)) {
                arr = data;
                cardList(data);
            } else if (data.pitches && Array.isArray(data.pitches)) {
                arr = data.pitches;
                cardList(data.pitches);
            } else {
                console.error("Invalid data format", data);
            }
        })
        .catch((err) => console.log("Error fetching data:", err));
}
fetchData();

function cardList(data) {
    let dataList = data.map((el) => card(el));
    mainSection.innerHTML = dataList.join(" ");
}

function card(el) {
    return `
       <div>
       <a href="description.html?image=${encodeURIComponent(el.image)}&title=${encodeURIComponent(el.title)}&price=${encodeURIComponent(el.price)}&category=${encodeURIComponent(el.category)}&founder=${encodeURIComponent(el.founder)}&description=${encodeURIComponent(el.description)}" target="_blank">
            <h3 data-id=${el.id}> ID: ${el.id} </h3>
            <img src="${el.image}" height="200px" width="200px">
            <h2>Founder: ${el.founder}</h2>
            <p>Description: ${el.description}</p>
            <p>Title: ${el.title}</p>
            <p>Price: ${el.price}</p>
            <p>Category: ${el.category}</p>
            <a href="#" class="card-link" data-id=${el.id}> Update </a>
            <button class="card-button" data-id=${el.id}> Delete </button>
        </div>
    `
}

pitchCreateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let datalist = {
        title: pitchTitleInput.value,
        image: pitchImageInput.value,
        category: pitchCategoryInput.value,
        founder: pitchfounderInput.value,
        price: pitchPriceInput.value
    };

    fetch('http://localhost:3000/pitches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datalist)
    })
    .then((res) => res.json())
    .then((data) => {
        console.log("Post request success:", data);
        fetchData(); // Refresh data after adding
    })
    .catch((err) => console.log("Error posting data:", err));
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('card-button')) {
        deleteProduct(e.target.dataset.id);
    }
});

function deleteProduct(id) {
    fetch(`http://localhost:3000/pitches/${id}`, { method: 'DELETE' })
        .then((res) => res.json())
        .then(() => fetchData()) // Refresh after delete
        .catch((err) => console.log("Error deleting data:", err));
}


// /update code


document.addEventListener('click',(e)=>{
    if(e.target.classList.contains('card-link'))
    {
         updateData(e.target.dataset.id)
    }
  })
  
  function updateData(id)
  {
      fetch(`http://localhost:3000/pitches/${id}`)
      .then((res)=>res.json())
      .then((data)=>{
          console.log(data)
  
          updatePitchIdInput.value = data.id
          updatePitchTitleInput.value = data.title
          updatePitchImageInput.value = data.image
          updatePitchfounderInput.value = data.founder
          updatePitchCategoryInput.value = data.category
          updatePitchPriceInput.value = data.price
      })
      .catch((err)=>console.log(err))
  }

   
  updatePitchBtn.addEventListener('click',()=>{
        let updateObj={
            id :updatePitchIdInput.value,
            title : updatePitchTitleInput.value,
            image : updatePitchImageInput.value,
            category :updatePitchCategoryInput.value,
            founder :updatePitchfounderInput.value,
            price :updatePitchPriceInput.value
        }

        fetch(`http://localhost:3000/pitches/${updateObj.id}`,{
            method:'PUT',
            header : {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(updateObj)
        }).then((res)=>res.json())
        .then((data)=>console.log(data))
        .catch((err)=>console.log(err))
})

//update price
document.addEventListener('click',(e)=>{
    if(e.target.classList.contains('card-link'))
    {
         updateprice(e.target.dataset.id)
    }
  })
  
  function updateprice(id)
  {
      fetch(`http://localhost:3000/pitches/${id}`)
      .then((res)=>res.json())
      .then((data)=>{
          console.log(data)
          updatePricePitchId.value = data.id
          updatePricePitchPrice.value = data.price
      })
      .catch((err)=>console.log(err))
  }

  updatePricePitchPriceButton.addEventListener('click',()=>{
     
    let updateprice1 = {
        id :updatePricePitchId.value,
        price : updatePricePitchPrice.value,
    }
    fetch(`http://localhost:3000/pitches/${updateprice1.id}`,{
        method:'PATCH',
        headers : {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateprice1)
    }).then((res)=>res.json())
    .then((data)=>console.log(data))
    .catch((err)=>console.log(err))
})


//SORT AND FILTER

filterFood.addEventListener('click' ,()=>{
    let filterF = arr.filter((el)=>{
        return el.category == 'Food'
    })
   cardList(filterF)
   
})
filterElectronics.addEventListener('click' ,()=>{
    let filterE = arr.filter((el)=>{
        return el.category == 'Electronics'
    })
   cardList(filterE)
})
filterPersonalCare.addEventListener('click' ,()=>{
    let filterP = arr.filter((el)=>{
        return el.category == 'Personal Care'
    })
   cardList(filterP)
})

sortAtoZBtn.addEventListener('click',()=>{
    let lowtoHigh = arr.sort((a,b)=>{
        return a.price - b.price
    })
    cardList(lowtoHigh)
})

sortZtoABtn.addEventListener('click',()=>{
    let hightoLow = arr.sort((a,b)=>{
        return b.price - a.price
    })
    cardList(hightoLow)
})

























