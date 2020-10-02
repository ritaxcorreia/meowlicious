const APIKEY = '5cd238bb-cded-4057-952e-b48433402ef5';

const RANDOMCAT_URL = "https://api.thecatapi.com/v1/images/search?limit=100&order=DESC";

const cats = document.querySelector('.cats');

const spinner = document.querySelector('.spinner');

function addCat() {
    //shows loading spinner
    spinner.classList.add("show");
    cats.classList.remove("show");

    //fetches cat images from CatAPI and randomises image that will be shown
    fetch(RANDOMCAT_URL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            const randomIndex = 0; // randomise between 0 and 99 (100 cats)
            const cat = data[0];
            console.log(cat.url);

            const img = document.createElement("img");
            img.src = cat.url;
            img.alt = "Cute kitten";
            cats.innerHTML = '';
            cats.appendChild(img);

            spinner.classList.remove("show");
            cats.classList.add("show");
        });
}

document.querySelector('.add-cat').addEventListener("click", addCat);

const BREEDS_URL = "https://api.thecatapi.com/v1/breeds";

let breedsData;

function populateBreedDropdown() {
    fetch(BREEDS_URL, {
            headers: {
                'x-api-key': APIKEY
            }
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log('data', data);
            // store breeds data for later use
            breedsData = data;

            // Create an <option> for every breed
            breedsData.forEach(function(breed) {
                const option = document.createElement('option');
                option.value = breed.id; // better to use ID-like strings for values
                option.innerText = breed.name;
                breeds.appendChild(option);
            })
        })
}

populateBreedDropdown();

// run code when user selects from DOM dropdown
const breeds = document.querySelector('.cat-breeds');

// find the breed data for the selected breed

let selectedBreed;

breeds.addEventListener("change", function(event) {
    // which breed ID has the user selected?
    const selectedBreedId = event.target.value;
    console.log(selectedBreedId);
    document.querySelector('.container').hidden = false;
    // look through the breeds array and
    // try to find the breed that matches 
    // the selected breed ID from the dropdown
    //
    // .find loops through the array until the condition is true
    // and returns that breed object
    selectedBreed = breedsData.find(function(breed) {
        return breed.id === selectedBreedId // does this breed match the same as the user selected?
    })

    console.log('selectedBreed', selectedBreed)

    // create card structure with selected breed data + append card to .cat-breeds

    const breedName = document.querySelector('.breed-name');
    const name = selectedBreed.name;
    breedName.innerText = name;

    const breedDesc = document.querySelector('.description');
    const description = selectedBreed.description;
    breedDesc.innerText = description;

    const breedOrigin = document.querySelector('.origin');
    const origin = selectedBreed.origin;
    breedOrigin.innerText = origin;

    const breedLifeSpan = document.querySelector('.life-span');
    const lifeSpan = selectedBreed.life_span;
    breedLifeSpan.innerText = lifeSpan;

    const breedWeight = document.querySelector('.weight');
    const weight = selectedBreed.weight.metric;
    breedWeight.innerText = weight;

    const breedTemp = document.querySelector('.temperament');
    const temperament = selectedBreed.temperament;
    breedTemp.innerText = temperament;

    const wikiLink = document.querySelector('.btn');
    const url = selectedBreed.wikipedia_url;
    wikiLink.href = url;


    // fetch and show the image selectedBreed.id

});