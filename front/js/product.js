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

  let customerItem = {};
  customerItem._id = id;

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
      for (let color of choice.colors) {
        colorOption.innerHTML += `<option value="${color}">${color}</option>`;
        /* Boucle for pour chercher un indice + 
Si id (définit par l'url) est identique à un _id d'un des produits du tableau, on récupère son indice  + 
Ajout des éléments de manière dynamique +
Boucle pour chercher les couleurs pour chaque produit en fonction de sa valeur + 
Ajout des balises d'option couleur  */ 
    }
  }
  console.log("affichage effectué");
}
}
        // Choix couleur produit dynamique

        let choiceColor = document.querySelector("#colors");
choiceColor.addEventListener("input", (ec) => {
  let colorProduct;
  colorProduct = ec.target.value;
  customerItem.color = colorProduct ;
  document.querySelector("#addToCart").style.color = "white";
  document.querySelector("#addToCart").textContent = "Ajouter au panier";
  console.log(colorProduct);
});
        /* définition variables +
  On écoute ce qu'il se passe dans #colors +
  Récupération de la valeur de la cible de l'évenement dans color +
  Ajout de la couleur à l'objet panierClient +
  Reset la couleur et le texte du bouton si il y a une action sur les inputs dans le cas d'une autre commande du même produit */ 

        // Choix quantité dynamique

        let choiceQuantity = document.querySelector('input[id="quantity"]');
let quantityProduct;
choiceQuantity.addEventListener("input", (eq) => {
  quantityProduct = eq.target.value;
  customerItem.quantité = quantityProduct;
  document.querySelector("#addToCart").style.color = "white";
  document.querySelector("#addToCart").textContent = "Ajouter au panier";
  console.log(quantityProduct);
});

        /* définition variables +
  On écoute ce qu'il se passe dans input[name="itemQuantity"] +
  Récupération de la valeur de la cible de l'évenement dans quantity +
  Ajout de la quantité à l'objet panierClient +
  Reset la couleur et le texte du bouton si il y a une action sur les inputs dans le cas d'une autre commande du même produit */
  
  