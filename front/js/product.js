// Récupération de l'id du produit avec l'URL

let params = (new URL(document.location)).searchParams;
let id = params.get('_id'); 
console.log(id);

// Récupération produits de l'id 

fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((objectProducts) => {
    // execution de la fontion lesProduits
    theProducts(objectProducts);
  })
.catch((err) => {
    document.querySelector(".item").innerHTML = "<h1>erreur 404</h1>";
    console.log("erreur 404, sur ressource api:" + err);
  });

  // Création d'objet articleClient (pour modifications)

  let articleClient = {};
  articleClient._id = id;

    // Affichage produit API

    function theProducts(product) {
    let colorOption = document.querySelector("#color");
    let name = document.querySelector("#title");
    let price = document.querySelector("#price");
    let imageUrl = document.querySelector("article div.item__img");
    let description = document.querySelector("#description");
  for (let choice of product) {
    if (id === choice._id) {
      imageUrl.innerHTML = `<img src="${choice.imageUrl}" alt="${choice.altTxt}">`;
      name.textContent = `${choice.name}`;
      price.textContent = `${choice.price}`;
      description.textContent = `${choice.description}`;
        /* Boucle for pour chercher un indice + 
Si id (définit par l'url) est identique à un _id d'un des produits du tableau, on récupère son indice  + 
Ajout des éléments de manière dynamique */ 
    }
  }
  console.log("affichage effectué");
}

    
