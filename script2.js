document.addEventListener("DOMContentLoaded", () => {
  const beerCardTemplate = function (beer) {
    return `<div class="beer">
                  <img class="img-beer" src="${beer.image_url}" alt="beer" />
                  <h1>${beer.name}</h1>
                  <p class="title">${beer.tagline}</p>
                  <p><a href="./beer.html?id=${beer.id}">Show more</a></p>
                </div>`;
  };
  function getData(e) {
    e.preventDefault();

    fetch("https://api.punkapi.com/v2/beers/random")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const name = data[0].name;
        const description = data[0].description;
        const image = data[0].image_url;
        const { volume } = data[0];
        const volumeValue = volume.value;
        const volumeUnit = volume.unit;
        randomBeer.innerHTML = name + " " + volumeValue + volumeUnit;
        descriptionDisplay.innerHTML = description;
        volumeDisplay.innerHTML = volumeValue + volumeUnit;
        imagenUrl.innerHTML = image;
      });
  }
  startBtn.addEventListener("click", getData);
});
