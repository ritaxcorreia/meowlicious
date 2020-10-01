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


            // stops showing loading spinner
            spinner.classList.remove("show");
            cats.classList.add("show");
        });
}

document.querySelector('.add-cat').addEventListener("click", addCat);

const BREEDS_URL = "https://api.thecatapi.com/v1/breeds";

const breeds = document.querySelector('.cat-breeds');

function selectBreed() {
    fetch(BREEDS_URL, {
            headers: {
                'x-api-key': APIKEY
            }
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // console.log('data', data);

            // Create an <option> for every breed
            data.forEach(function(breed) {
                const option = document.createElement('option');
                option.value = breed.id; // better to use ID-like strings for values
                option.innerText = breed.name;
                breeds.appendChild(option);
            })
        })
}

selectBreed();