const beerCardTemplate = function (beer) {
  return `<div class="beer">
                  <img class="img-beer" src="${beer.image_url}" alt="beer" />
                  <h1>${beer.name}</h1>
                  <p class="title">${beer.tagline}</p>
                </div>

                <div class="beer-description">
                    <h3> Description: </h3>
                    <p> ${beer.description} </p>
                    <p> <strong>ABV:</strong> ${beer.abv}
                    <p> <strong>Attenuation Level:</strong> ${
                      beer.attenuation_level
                    }
                    <p> <strong>Ingredients:</strong> ${Object.keys(
                      beer.ingredients
                    )}
                    <p> <strong>Food pairing: </strong> ${beer.food_pairing.join(
                      "<br />"
                    )} </p>
                    <p> <strong>Brewers Tips:</strong> ${beer.brewers_tips} </p>
                    <h3> Contributed By: ${beer.contributed_by} </h3>
                    <br /> <br /> <br />  
                </div>`;
};

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const beerId = urlParams.get("id");

if (beerId) {
  fetch(`https://api.punkapi.com/v2/beers/${beerId}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (beer) {
      [cerveza] = beer;
      let beerContainer = document.getElementById("container-beers");
      if (cerveza.image_url === null)
        cerveza.image_url =
          "./img/depositphotos_227725020-stock-illustration-no-image-available-icon-flat.jpg";
      beerContainer.innerHTML += beerCardTemplate(cerveza);
    });
} else {
  fetch(`https://api.punkapi.com/v2/beers/random`)
    .then(function (response) {
      return response.json();
    })
    .then(function (beer) {
      [cerveza] = beer;
      let beerContainer = document.getElementById("container-beers");
      beerContainer.innerHTML += beerCardTemplate(cerveza);
    });
}
