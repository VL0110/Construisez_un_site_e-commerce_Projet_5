// Récupération de l'id du produit avec l'URL

let params = (new URL(document.location)).searchParams;
let id = params.get('_id'); 
console.log(id);

// Récupération produits de l'id 

fetch("http://localhost:3000/api/products")
.then((response) => 
response.json()
.then((objectProducts) => { 
    console.table(objectProducts); 
    theProducts(objectProducts);
  }))

  // Création d'objet customerItem (Article client pour modifications)

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
     for (let couleur of choice.colors) {
        colorOption.innerHTML += `<option value="${couleur}">${couleur}</option>`;
    } 
  }
  console.log("affichage effectué");
}
}
        /* Boucle for pour chercher un indice + 
Si id (définit par l'url) est identique à un _id d'un des produits du tableau, on récupère son indice  + 
Ajout des éléments de manière dynamique +
Boucle pour chercher les couleurs pour chaque produit en fonction de sa valeur + 
Ajout des balises d'option couleur  */ 

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
        /* Définition variables +
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

        /* Définition variables +
  On écoute ce qu'il se passe dans input[name="itemQuantity"] +
  Récupération de la valeur de la cible de l'évenement dans quantity +
  Ajout de la quantité à l'objet panier Client +
  Reset la couleur et le texte du bouton si il y a une action sur les inputs dans le cas d'une autre commande du même produit */
  
 // Conditions de validation du clic sur le bouton "ajouter au panier"
 
 let choiceProduct = document.querySelector("#addToCart");
choiceProduct.addEventListener("click", () => {
  if (
    customerItem.quantity < 1 ||
    customerItem.quantity > 100 ||
    customerItem.quantity === undefined ||
    customerItem.color === "" ||
    customerItem.color === undefined
  ) {
    alert("Pour valider le choix de l'article, veuillez renseigner une couleur, et/ou une quantité valide entre 1 et 100");
  } else {
    Cart ();
    console.log("clic effectué");
    document.querySelector("#addToCart").style.color = "rgb(0, 205, 0)";
    document.querySelector("#addToCart").textContent = "Produit ajouté !";
  }
});

        /* Déclaration variable +
  On écoute ce qu'il se passe sur le bouton #addToCart pour faire l'action +
  Conditions de validation du bouton ajouter au panier +
  Les valeurs sont créées au click, mais si il n'y a pas d'action sur la couleur et/ou la quantité, les valeurs sont "undefined" +
  Alerte informative pour les informations à renseigner + effet visuel d'ajout de produit +
  Si les données passent le contrôle le produit est ajouté  */ 

// Déclaration des tableaux utiles (mutation)

let customerProductChoice = [];
let registeredProducts = [];
let temporaryProducts = [];
let pushProducts = [];

        /* Déclaration du tableau qui sera le premier, destiné à initialiser le panier +
  Déclaration tableau récupèrer du local storage appelé "addToStock" et qu'on convertira en JSon (importance Panier()) +
  Déclaration tableau qui sera un choix article/couleur non effectué donc non présent dans le "addToStock" +
  Déclaration tableau qui sera la concaténation des "registeredProducts" et de "temporaryProducts"  */ 

// Fonction "addFirstProduct" qui ajoute l'article choisi dans le tableau vierge

function addFirstProduct() {
  console.log(registeredProducts);
  if (registeredProducts === null) {
    customerProductChoice.push(customerItem);
    console.log(customerItem);
    return (localStorage.stockCart = JSON.stringify(customerProductChoice));
  }
}

        /* Si le "registeredProducts" est null c'est qu'il n'a pas été créé +
  Pousse (push) le produit choisit dans "customerProductChoice" +
  Déclaration tableau qui sera un choix article/couleur non effectué donc non présent dans le "addToStock" +
  Dernière commande, envoit "customerProductChoice" dans le local storage sous le nom de "stockCart" de manière JSON stringifié"  */ 

// Fonction ajoutAutreProduit qui ajoute l'article dans le tableau non vierge et fait un tri

function addOtherProduct() {
  productsToPush = [];
  temporaryProducts.push(customerItem);
  productsToPush = [...registeredProducts, ...temporaryProducts];
  productsToPush.sort(function compare(a, b) {
    if (a._id < b._id) return -1;
    if (a._id > b._id) return 1;
    if (a._id = b._id){
      if (a.couleur < b.couleur) return -1;
      if (a.couleur > b.couleur) return 1;
    }
    return 0;
  });
  produitsTemporaires = [];
  return (localStorage.addToStock = JSON.stringify(productsToPush));
}
        /* Initialise "productsToPush" pour recevoir les nouvelles données +
  Pousse le produit choisit dans "temporaryProducts" +
  Combine "temporaryProducts" dans "registeredProducts" sous le nom "productsToPush" +
  Fonction pour trier et classer les id puis les couleurs +
  Initialise "temporaryProducts" maintenant qu'il a été utilisé +
  Dernière commande, envoit "productsToPush" dans le local storage sous le nom de "addToStock" de manière JSON stringifié" */ 



// fonction Panier qui ajuste la quantité si le produit est déja dans le tableau, sinon le rajoute 

function Cart() {
  registeredProducts = JSON.parse(localStorage.getItem("stockCart"));
  if (registeredProducts) {
    for (let choice of registeredProducts) {
      if (choice._id === id && choice.color === customerItem.color) {
        alert("RAPPEL: Vous aviez déja choisit cet article.");
        let quantityAdditional = parseInt(choice.quantity) + parseInt(quantityProduct);
        choice.quantity = JSON.stringify(quantityAdditional);
        return (localStorage.stockCart = JSON.stringify(registeredProducts));
      }
    }
    return "addOtherProduct"();
  }
  addFirstProduct ();
}

        /* Variable du local storage appelé "stockCart" et qu'on a convertit en JSon +
  Si "registeredProducts" existe (si des articles ont déja été choisis et enregistrés par le client) +
  Comparateur d'égalité des articles actuellement choisis et ceux déja choisis" +
  On modifie la quantité d'un produit existant dans le panier du localstorage +
  Définition de "quantityAdditional" qui est la valeur de l'addition de l'ancienne quantité parsée et de la nouvelle parsée pour le même produit +
  On convertit en JSON le résultat précédent dans la zone voulue +
  Dernière commande, on renvoit un nouveau "stockCart" dans le localStorage +
  Appel fonction "addOtherProduct" si la boucle au dessus ne retourne rien donc n'a pas d'égalité +
  Appel fonction "addFirstProduct" si registeredProducts n'existe pas  */ 
