const beerCardTemplate = function (beer) {
  return `<div class="beer">
                <img class="img-beer" src="${beer.image_url}" alt="beer" />
                <h1>${beer.name}</h1>
                <p class="title">${beer.tagline}</p>
                <p><a href="./beer.html?beer=${beer.id}">Show more</a></p>
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
  .then(function (beers) {
    let beerContainer = document.getElementById("app-beers");
    beers.forEach((element) => {
      if (element.image_url === null)
        element.image_url =
          "../public/img/depositphotos_227725020-stock-illustration-no-image-available-icon-flat.jpg";
      beerContainer.innerHTML += beerCardTemplate(element);
    });
  });

let searchBar = document.getElementById("searchBar");
searchBar.addEventListener("keyup", fnSearch);

function fnSearch() {
  let searchBar = document.getElementById("searchBar");
  let beerApp = document.getElementById("app-beers");
  let beers = beerApp.querySelectorAll(".beer");
  let filter = searchBar.value.toUpperCase();

  beers.forEach((element) => {
    h1 = element.querySelector("h1");
    txtValue = h1.textContent || h1.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      element.style.display = "";
    } else {
      element.style.display = "none";
    }
  });

  // for (i = 0; i < beers.length; i++) {
  //   a = beers[i].getElementsByTagName("h1")[0];
  //   txtValue = a.textContent || a.innerText;
  //   if (txtValue.toUpperCase().indexOf(filter) > -1) {
  //     beers[i].style.display = "";
  //   } else {
  //     beers[i].style.display = "none";
  //   }
  // }
}
