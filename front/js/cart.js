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
        let cart = JSON.parse(localStorage.getItem("stockCart"));
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

// Fonction d'affichage d'un panier (tableau)

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
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${choice.quantity}">
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
    
// Fonction "changeQuantity" on modifie dynamiquement les quantités du panier

function changeQuantity() {
    const cart = document.querySelectorAll(".cart__items");
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
    const cartdelet = document.querySelectorAll(".cart__items .deleteItem");
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

    /* Déclaration de variables pour chaque élément cartdelete +
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
    const cart = document.querySelectorAll(".cart__items");
    cart.forEach((cart) => {
      totalItem  += JSON.parse(cart.dataset.quantity);
      totalPrice += cart.dataset.quantity * cart.dataset.price;
    });
    document.getElementById("totalQuantity").textContent = totalItem;
    document.getElementById("totalPrice").textContent = totalPrice;
  }

     /* Déclaration variable en tant que nombre +
    Pour chaque élément cart on  récupère les quantités des produits grâce au dataset +
     On créer un opérateur pour le total produit grâce au dataset +
     On pointe l'endroit d'affichage nombre d'article +
     On pointe l'endroit d'affichage du prix total */

      // Récupération des éléments du formulaire

 if (page.match("cart")) {
  var customerContact = {};
  localStorage.customerContact = JSON.stringify(customerContact);
  var firstName = document.querySelector("#firstName");
  firstName.classList.add("regex_text");
  var lastName = document.querySelector("#lastName");
  lastName.classList.add("regex_text");
  var city = document.querySelector("#city");
  city.classList.add("regex_text");
  var adress = document.querySelector("#address");
  adress.classList.add("regex_adress");
  var email = document.querySelector("#email");
  email.classList.add("regex_email");
  var regexText = document.querySelectorAll(".regex_text");
  document.querySelector("#email").setAttribute("type", "text");
}
    /* Les données seront stockées dans ce tableau pour la commande sur page panier +
    On pointe des éléments input, on attribue à certains la même classe, ils réagiront pareil aux différentes regex +
    On pointe les input nom, prénom, ville, adresse, email + On pointe les élément qui ont la classe .regex_text +
    */

 // Expréssions régulières Regex

    let regexLetter = /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/i;
    let regexNumberLetter = /^[a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,60}$/i;
    let regexValidEmail = /^[a-z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]{1,60}$/i;
    let regexMatchEmail = /^[a-zA-Z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]+@([\w-]+\.)+[\w-]{2,4}$/i;
    

  /* "/^" Indique le début regex qui valide les caratères « a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ » + espaces blancs + tiret \s- + valeur comprise entre 1 et 31 +
  On termine la regex $/i en indiquant que les éléments sélectionnés ne sont pas sensible à la case +
 "/^" début regex qui valide les caractères chiffre lettre et caractères spéciaux « a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ » + espaces blancs + tiret \s- + valeur comprise entre 1 et 60 caractères +
  On termine la regex $/i en indiquant que les éléments sélectionnés ne sont pas sensible à la case */

  // Attribution de point si les champs sont validés pour "text"

   if (page.match("cart")) {
    regexText.forEach((regexText) =>
      regexText.addEventListener("input", (e) => {
        value = e.target.value;
        let regexNormal = value.search(regexLetter);
        if (regexNormal === 0) {
          customerContact.firstName = firstName.value;
          customerContact.lastName = lastName.value;
          customerContact.city = city.value;
        }
        if (
          customerContact.city !== "" &&
          customerContact.lastName !== "" &&
          customerContact.firstName !== "" &&
          regexNormal === 0
        ) {
          customerContact.regexNormal = 3;
        } else {
          customerContact.regexNormal = 0;
        }
        localStorage.customerContact = JSON.stringify(customerContact);
        colorRegex(regexNormal, value, regexText);
        validClic();
      })
    );
  }

  /* « Value » sera la valeur de l'input en dynamique +
   « regexNormal » sera la valeur de la réponse regex, 0 ou -1 */

// Le champ écouté avec le regexLetter fera réagir la zone concernée grâce à "textInfo"

textInfo(regexLetter, "#firstNameErrorMsg", firstName);
textInfo(regexLetter, "#lastNameErrorMsg", lastName);
textInfo(regexLetter, "#cityErrorMsg", city);

  // Attribution de point si les champs sont validés pour "adress"

  if (page.match("cart")) {
    let regexAdress = document.querySelector(".regex_adress");
    regexAdress.addEventListener("input", (e) => {
      value = e.target.value;
      let regexAdress = value.search(regexNumberLetter);
      if (regexAdress == 0) {
        customerContact.address = adress.value;
      }
      if (customerContact.address !== "" && regexAdress === 0) {
        customerContact.regexAdress = 1;
      } else {
        customerContact.regexAdress = 0;
      }
      localStorage.customerContact = JSON.stringify(customerContact);
      colorRegex(regexAdress, value, regexAdress);
      validClic();
    });
  }

  /* « Value » sera la valeur de l'input en dynamique +
   « regexNormal » sera la valeur de la réponse regex, 0 ou -1 */

// Le champ écouté avec le regexLetter fera réagir la zone concernée grâce à "textInfo"

textInfo(regexNumberLetter, "#addressErrorMsg", adress);

  // Attribution de point si les champs sont validés pour "email"

  if (page.match("cart")) {
    let regexEmail = document.querySelector(".regex_email");
    regexEmail.addEventListener("input", (e) => {
      value = e.target.value;
      let regexMatch = value.match(regexMatchEmail);
      let regexValid = value.search(regexValidEmail);
      if (regexValid === 0 && regexMatch !== null) {
        customerContact.email = email.value;
        customerContact.regexEmail = 1;
      } else {
        customerContact.regexEmail = 0;
      }
      localStorage.customerContact = JSON.stringify(customerContact);
      colorRegex(regexValid, value, regexEmail);
      validClic();
    });
  }

      /* "value" sera la valeur de l'input +
      L'adresse doit avoir cette forme pour la valider +
      Quand le résultat sera correct, le console log affichera une autre réponse que null; "regexValid" sera la valeur de la réponse regex, 0 ou -1 */

   // Texte sous le champ email
   
   if (page.match("cart")) {
    email.addEventListener("input", (e) => {
      value = e.target.value;
      let regexMatch = value.match(regexMatchEmail);
      let regexValid = value.search(regexValidEmail);

      if (value === "" && regexMatch === null) {
        document.querySelector("#emailErrorMsg").textContent = "Veuillez renseigner votre email.";
        document.querySelector("#emailErrorMsg").style.color = "white";
      } else if ( regexValid !== 0) {
        document.querySelector("#emailErrorMsg").innerHTML = "Caractères non valide";
        document.querySelector("#emailErrorMsg").style.color = "white";
      } else if (value != "" && regexMatch == null) {
        document.querySelector("#emailErrorMsg").innerHTML = "Caractères acceptés pour ce champ. Email non conforme";
        document.querySelector("#emailErrorMsg").style.color = "white";
      } else {
        document.querySelector("#emailErrorMsg").innerHTML = "Email conforme.";
        document.querySelector("#emailErrorMsg").style.color = "white";
      }
    });
  }
    /* Le « value » sera la valeur de l'input +
    Si la valeur est toujours un string vide et la regex différente de 0 (regex à -1 et le champ est vide mais pas d'erreur) +
    Si la valeur n'est plus un string vide et le regex différent de 0 (regex à -1 et le champ n'est pas vide donc il y a une erreur) +
    Pour le reste des cas (quand le regex ne décèle aucune erreur et est à 0 peu importe le champ vu qu'il est validé par le regex) */

// Fonction « colorRegex » qui modifiera la couleur de l'input par remplissage tapé pour l’accessibilité

let listenValue = "";
function colorRegex(regexSearch, listenValue, inputAction) {
  if (listenValue === "" && regexSearch != 0) {
    inputAction.style.backgroundColor = "white";
    inputAction.style.color = "black";
  } else if (listenValue !== "" && regexSearch != 0) {
    inputAction.style.backgroundColor = "rgb(220, 50, 50)";
    inputAction.style.color = "white";
  } else {
    inputAction.style.backgroundColor = "rgb(0, 138, 0)";
    inputAction.style.color = "white";
  }
}
    /* On détermine une valeur de départ à « value » qui sera un string +
    Fonction à 3 arguments réutilisable, le regex, la valeur d'écoute, et la réponse à l'écoute +
    Si la valeur est toujours un string vide et le regex différent de 0 (regex à -1 et le champ est vide mais pas d'erreur) +
    Si la valeur n'est plus un string vide et le regex différent de 0 (regex à -1 et le champ n'est pas vide donc il y a une erreur) +
    Pour le reste des cas (quand le regex ne décèle aucune erreur et est à 0 peu importe le champ vu qu'il est validé par le regex) */


    // Fonction d’affichage individuel sous l’input (sauf pour l’email)

    function textInfo(regex, score, listenArea) {
      if (page.match("cart")) {
      listenArea.addEventListener("input", (e) => {
      value = e.target.value;
      index = value.search(regex);
      if (value === "" && index != 0) {
        document.querySelector(score).textContent = "Veuillez renseigner ce champ.";
        document.querySelector(score).style.color = "white";
      } else if (valeur !== "" && index != 0) {
        document.querySelector(score).innerHTML = "Reformulez cette donnée";
        document.querySelector(score).style.color = "white";
      } else {
      document.querySelector(score).innerHTML = "Caractères acceptés pour ce champ.";
      document.querySelector(score).style.color = "white";
      }
    });
  }
  }
      /* « value » sera la valeur de l'input +
     Si la valeur est toujours un string vide et le regex différent de 0 (regex à -1 et le champ est vide mais pas d'erreur) +
     Si la valeur n'est plus un string vide et le regex différent de 0 (regex à -1 et le champ n'est pas vide donc il y a une erreur) +
     Pour le reste des cas (quand le regex ne décèle aucune erreur et est à 0 peu importe le champ vu qu'il est validé par le regex) */
  
     // Fonction de validation d'accès au clic du bouton formulaire 

     let order = document.querySelector("#order");
function validClic() {
  let contactRef = JSON.parse(localStorage.getItem("customerContact"));
  let amount = contactRef.regexNormal + contactRef.regexAdress + contactRef.regexEmail;
  if (amount === 5) {
    order.removeAttribute("disabled", "disabled");
    document.querySelector("#order").setAttribute("value", "Commander !");
  } else {
    order.setAttribute("disabled", "disabled");
    document.querySelector("#order").setAttribute("value", "Remplir le formulaire");
  }
}

// Envoie de la commande

   if (page.match("cart")) {
     order.addEventListener("click", (e) => {
      e.preventDefault();
      validClic();
      sendPacket();
    });
  }

  // Empêche de recharger la page on prévient le "reload" du bouton

  // Fonction récupérations des id et insertion des données dans un tableau

  let cartId = [];
function tableId() {
let cart = JSON.parse(localStorage.getItem("stockCart"));
if (cart && cart.length > 0) {
  for (let index of cart) {
    cartId.push(index._id);
  }
} else {
  console.log("Le panier est vide");
  document.querySelector("#order").setAttribute("value", "Panier vide!");
}
}

   /* Définition du panier qui comportera les id des produits choisi du local storage +
   Appel des ressources + Récupération des id produits dans « cartId » */

 // Récupération données clients et panier avant transformation

 let contactRef;
let finalOrder;
function packet() {
  contactRef = JSON.parse(localStorage.getItem("customerContact"));
  finalOrder = {
    contact: {
      firstName: contactRef.firstName,
      lastName: contactRef.lastName,
      address: contactRef.address,
      city: contactRef.city,
      email: contactRef.email,
    },
    products: cartId,
  };
}

  // Fonction validation de l'envoi

  function sendPacket() {
    tableId();
    packet();
    console.log(finalOrder);
    let amount = contactRef.regexNormal + contactRef.regexAdress + contactRef.regexEmail;
    if (cartId.length != 0 && amount === 5) {
      fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalOrder),
      })
        .then((response) => response.json())
        .then((data) => {
          window.location.href = `/front/html/confirmation.html?commande=${data.orderId}`;
        })
        .catch(function (err) {
          console.log(err);
          alert("erreur");
        });
    }
  }

       /* Vision sur le paquet que l'on veut envoyer +
      Si le « cartId » contient des articles et que le clic est autorisé + Envoi à la ressource api + 
      Envoyé à la page confirmation, autre écriture de la valeur "./confirmation.html?commande=${data.orderId}" */

   // Fonction affichage invoqué du numéro de commande et vide du storage (sur page confirmation)

      (function Order() {
        if (page.match("confirmation")) {
          sessionStorage.clear();
          localStorage.clear();
          let orderNum = new URLSearchParams(document.location.search).get("order");
          document.querySelector("#orderId").innerHTML = `<br>${orderNum}<br>Merci pour votre achat`;
          console.log("valeur de l'orderId venant de l'url: " + orderNum);
          orderNum = undefined;
        } else {
          console.log("Page cart");
        }
      })();
    
   /* Valeur du numéro de commande + 
   Merci et mise en page + 
   Réinitialisation du numéro de commande */