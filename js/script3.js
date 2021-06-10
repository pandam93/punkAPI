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
                    ).join(", ")}
                    <p> <strong>Food pairing: </strong> ${beer.food_pairing.join(
                      " / "
                    )} </p>
                    <p> <strong>Brewers Tips:</strong> ${beer.brewers_tips} </p>
                    <h3> Contributed By: ${beer.contributed_by} </h3>
                    <br />
                    <div id="mapid" style="height: 200px; max-height: 200px"></div>
                      
                </div>`;
};

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const beerId = urlParams.get("beer");

if (beerId) {
  fetch(`https://api.punkapi.com/v2/beers/${beerId}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (beer) {
      [cerveza] = beer;
      let beerContainer = document.getElementById("app-beers");
      if (cerveza.image_url === null)
        cerveza.image_url =
          "../public/img/depositphotos_227725020-stock-illustration-no-image-available-icon-flat.jpg";
      beerContainer.innerHTML = beerCardTemplate(cerveza);
    });
} else {
  fetch(`https://api.punkapi.com/v2/beers/random`)
    .then(function (response) {
      return response.json();
    })
    .then(function (beer) {
      [cerveza] = beer;
      let beerContainer = document.getElementById("app-beers");
      if (cerveza.image_url === null)
        cerveza.image_url =
          "../public/img/depositphotos_227725020-stock-illustration-no-image-available-icon-flat.jpg";
      beerContainer.innerHTML = beerCardTemplate(cerveza);
    });
}

function getRandomInRange(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
  // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

setTimeout(function () {
  const x = getRandomInRange(-180, 180, 3);
  const y = getRandomInRange(-180, 180, 3);
  var map = L.map("mapid").setView([x, y], 6);
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2ZtaWxsYW5tIiwiYSI6ImNrcHBxZDNxYzNiY3Eyd3JpaWxmdjlhbXUifQ.6i6Xjk628Wt1_4OqLdYLHw",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoiY2ZtaWxsYW5tIiwiYSI6ImNrcHBxZDNxYzNiY3Eyd3JpaWxmdjlhbXUifQ.6i6Xjk628Wt1_4OqLdYLHw",
    }
  ).addTo(map);

  L.marker([x, y])
    .addTo(map)
    .bindPopup("Puedes encontrar esta cerveza en este establecimiento.")
    .openPopup();
}, 1000);
