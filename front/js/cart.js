// Récupération des produits de l'api

const page = document.location.href;
if (page.match("cart")) {
    fetch("http://localhost:3000/api/products")
      .then((response) => response.json())
      .then((objectProducts) => {
          console.log(objectProducts);
          cartDisplay(objectProducts);
      })
    }

// Conditions d’affichage des produits du panier

    function cartDisplay (index) {
        let cart = JSON.parse(localStorage.getItem("panierStocké"));
         if (cart && cart.length != 0) {
          for (let choice of cart) {
            console.log(choice);
            for (let g = 0, h = index.length; g < h; g++) {
              if (choice._id === index[g]._id) {
                choice.name = index[g].name;
                choice.price = index[g].price;
                choice.image = index[g].imageUrl;
                choice.description = index[g].description;
                choice.alt = index[g].altTxt;
              }
            }
          }
          display(cart);
        } else {
          document.querySelector("#totalQuantity").innerHTML = "0";
          document.querySelector("#totalPrice").innerHTML = "0";
          document.querySelector("h1").innerHTML =
            "Vous n'avez pas d'article dans votre panier";
        }
        changeQuantity();
        delet();
      }
    
    /* On récupère le panier converti si il y a un panier qui n'est pas vide +
    Correspondance clef/valeur de l'api et du panier avec l'id produit dans le localStorage
    Création et ajout de valeurs pour les valeurs dataset +
    On demande à "Display" de jouer avec les données panier, les données appelé ont un scope agrandi +
    Si il n'y à pas de panier on affiche un H1 informatif  */

// Fonction détermine les conditions d’affichage des produits du panier

function display(indexed) {
    let cartArea = document.querySelector("#cart__items");
    cartArea.innerHTML += indexed.map((choice) => 
          `<article class="cart__item" data-id="${choice._id}" data-couleur="${choice.color}" data-quantité="${choice.quantity}" data-prix="${choice.price}"> 
            <div class="cart__item__img">
              <img src="${choice.image}" alt="${choice.alt}">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__titlePrice">
                <h2>${choice.name}</h2>
                <span>couleur : ${choice.color}</span>
                <p data-prix="${choice.price}">${choice.price} €</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${choix.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem" data-id="${choice._id}" data-couleur="${choice.color}">Supprimer</p>
                </div>
              </div>
            </div>
          </article>`
            ).join(""); 
          totalProduct();
        }

    /* On déclare et on pointe la zone d'affichage +
    On créait les affichages des produits du panier via un map et introduction de dataset dans le code +
    On remplace les virgules de jonctions des objets du tableau par un vide
    On reste à l'écoute des modifications de quantité pour l'affichage et pour actualiser les données  */
    
// Fonction changeQuantité on modifie dynamiquement les quantités du panier

function changeQuantity() {
    const cart = document.querySelectorAll(".cart__item");
    cart.forEach((cart) => {0
      cart.addEventListener("change", (eq) => {
        let cart = JSON.parse(localStorage.getItem("stockCart"));
        for (item of cart)
          if (
            item._id === cart.dataset.id &&
            cart.dataset.color === item.color
          ) {
            item.quantity = eq.target.value;
            localStorage.stockCart = JSON.stringify(cart);
            cart.dataset.quantity = eq.target.value;
            totalProduct();
          }
      });
    });
  }


    /* On regarde ce que l'on a d'affiché dynamiquement grâce au dataset +
    On écoute ce qu'il se passe dans itemQuantity de l'article concerné +
    Vérification d'information de la valeur du clic et son positionnement dans les articles +
    Boucle pour modifier la quantité du produit du panier grâce à la nouvelle valeur +
    On met à jour le dataset quantité +
    On joue la fonction pour actualiser les données   */

// fonction "delet" on supprime un article du panier 

function delet() {
    const cartdelet = document.querySelectorAll(".cart__item .deleteItem");
    cartdelet.forEach((cartdelet) => {
      cartdelet.addEventListener("click", () => {
        let cart = JSON.parse(localStorage.getItem("stockCart"));
        for (let d = 0, c = cart.length; d < c; d++)
          if (
            cart[d]._id === cartdelet.dataset.id &&
            cart[d].color === cartdelet.dataset.color
          ) {
            const num = [d];
            let newCart = JSON.parse(localStorage.getItem("stockCart"));
            newCart .splice(num, 1);
            if (newCart  && newCart.length == 0) {
              document.querySelector("#totalQuantity").innerHTML = "0";
              document.querySelector("#totalPrice").innerHTML = "0";
              document.querySelector("h1").innerHTML =
                "Vous n'avez pas d'article dans votre panier";
            }
            localStorage.stockCart = JSON.stringify(newCart);
            totalProduct(); 
            return location.reload(); }
      });
    });
  }

    /* Déclaration de variables + Pour chaque élément cartdelete +
    On écoute s'il y a un clic dans l'article concerné + Appel de la ressource du « localStorage » +
    Déclaration de variable utile pour la suppression + Création d'un tableau miroir +
    Suppression d’un élément à l'indice num + Affichage informatif +
    S’il n'y a pas de panier on créait un H1 informatif et quantité appropriées +
    On renvoi le nouveau panier converti dans le « localStorage » et on joue la fonction +
    On recharge la page qui s'affiche sans le produit grâce au nouveau panier */

// fonction ajout nombre total produit et coût total

function totalProduct() {
    let totalItem = 0;
    let totalPrice = 0; 
    const cart = document.querySelectorAll(".cart__item");
    cart.forEach((cart) => {
      totalItem  += JSON.parse(cart.dataset.quantity);
      totalPrice += cart.dataset.quantity * cart.dataset.price;
    });
    document.getElementById("totalQuantity").textContent = totalItem;
    document.getElementById("totalPrice").textContent = totalPrice;
  }

     /* Déclaration variable en tant que nombre +
      On pointe l'élément +
      Pour chaque élément cart on  récupère les quantités des produits grâce au dataset +
     On créer un opérateur pour le total produit grâce au dataset +
     On pointe l'endroit d'affichage nombre d'article +
     On créer un opérateur pour le total produit grâce au dataset
     On pointe l'endroit d'affichage du prix total */



      
