const beerCardTemplate = function (beer) {
    return `<div class="beer">
                <img class="img-beer" src="${beer.image_url}" alt="beer" />
                <h1>${beer.name}</h1>
                <p class="title">${beer.tagline}</p>
                <p><a href="https://api.punkapi.com/v2/beers/${beer.id}">Show more</a></p>
              </div>`;
  };

fetch("https://api.punkapi.com/v2/beers")
.then(function (response) {
  // fetch() returns a promise containing the response (a Response object).
  // This is just an HTTP response, not the actual JSON. 
  // To extract the JSON body content from the response, 
  // we use the json() method and pass it into the next .then()

  return response.json();
})
.then(function (beers){
    let beerContainer = document.getElementById('container-beers');
    beers.forEach(element => {
        beerContainer.innerHTML += beerCardTemplate(element);
    });
})