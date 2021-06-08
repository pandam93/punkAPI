const beerCardTemplate = function (beer) {
  return `<div class="beer">
                <img class="img-beer" src="${beer.image_url}" alt="beer" />
                <h1>${beer.name}</h1>
                <p class="title">${beer.tagline}</p>
                <p><a href="https://api.punkapi.com/v2/beers/${beer.id}">Show more</a></p>
              </div>`;
};

let beerContainer = document.getElementById("container-beers");

// ASYNC/AWAIT
const loadBeers = async () => {
  const beers = await fetch("https://api.punkapi.com/v2/beers");
  return beers.json();
};

/*
loadBeers().then((value) =>
  value.forEach((element) => {
    beerContainer.innerHTML += beerCardTemplate(element);
  })
);
*/

//Mejor solución, credit Elisa
const loadBeers = async () => {
  const beers = await fetch("https://api.punkapi.com/v2/beers");
  const data = await beers.json()
  data.forEach((element) => {
    beerContainer.innerHTML += beerCardTemplate(element);
  })
};
loadBeers()
