// Panier

// Récupération des produits du LocalStorage

let productsInLocalStorage = JSON.parse(localStorage.getItem("cartItems"));

// Fonction qui permet d'afficher le ou les produit(s) du panier

async function displayCart() {

// Récupération de la section qui contient le ou les article(s)

const positionEmptyCart = document.getElementById("cart__items");

// Si le localstorage est vide

if (productsInLocalStorage === null || productsInLocalStorage == 0) {
    let emptyCartParagraph = document.createElement("p");
        emptyCartParagraph.textContent = "Votre panier est vide";
        positionEmptyCart.appendChild(emptyCartParagraph);

// Si le localstorage contient des produits

 } else {
     for (product in productsInLocalStorage) {
      const items = await getProductDetails(productsInLocalStorage[product].id);
        let productArticle = document.createElement("article");
          document.querySelector("#cart__items").appendChild(productArticle);
            productArticle.className = "cart__item";
            productArticle.setAttribute(
                "data-id",
                productsInLocalStorage[product].id
            );
            productArticle.setAttribute(
                "data-color",
                productsInLocalStorage[product].color
            );
        let productDivImg = document.createElement("div");
            productArticle.appendChild(productDivImg);
            productDivImg.className = "cart__item__img";
        let productImg = document.createElement("img");
            productImg.src = items.imageUrl;
            productImg.alt = items.altTxt;
            productDivImg.appendChild(productImg);
        let productItemContent = document.createElement("div");
            productItemContent.className = "cart__item__content";
            productArticle.appendChild(productItemContent);
        let productItemContentDescription = document.createElement("div");
            productItemContentDescription.className =
                "cart__item__content__description";
            productItemContent.appendChild(productItemContentDescription);
        let productTitle = document.createElement("h2");
            productTitle.textContent = items.name;
            productItemContentDescription.appendChild(productTitle);
        let productColor = document.createElement("p");
            productColor.textContent = productsInLocalStorage[product].color;
            productItemContentDescription.appendChild(productColor);
        let productPrice = document.createElement("p");
       const totalPriceItem =
                items.price * productsInLocalStorage[product].quantity;
            productPrice.textContent = totalPriceItem + " €";
            productItemContentDescription.appendChild(productPrice);
        let productItemContentSettings = document.createElement("div");
            productItemContentSettings.className = "cart__item__content__settings";
            productItemContent.appendChild(productItemContentSettings);
        let productItemContentSettingsQuantity = document.createElement("div");
            productItemContentSettingsQuantity.className =
                "cart__item__content__settings__quantity";
            productItemContentSettings.appendChild(
                productItemContentSettingsQuantity
            );
        let productQte = document.createElement("p");
            productItemContentSettingsQuantity.appendChild(productQte);
            productQte.textContent = "Qté : ";
        let productQuantity = document.createElement("input");
            productQuantity.className = "itemQuantity";
            productQuantity.setAttribute("type", "number");
            productQuantity.setAttribute("min", "1");
            productQuantity.setAttribute("max", "100");
            productQuantity.setAttribute("name", "itemQuantity");
            productQuantity.setAttribute(
                "value",
                productsInLocalStorage[product].quantity
            );
            productItemContentSettingsQuantity.appendChild(productQuantity);
        let productItemContentSettingsDelete = document.createElement("div");
            productItemContentSettingsDelete.className =
                "cart__item__content__settings__delete";
            productItemContentSettings.appendChild(productItemContentSettingsDelete);
        let productSupprimer = document.createElement("p");
            productSupprimer.className = "deleteItem";
            productSupprimer.textContent = "Supprimer";
            productItemContentSettingsDelete.appendChild(productSupprimer);
        }
        grandTotal();
        changeQuantity();
        deleteProduct();
    }
}
displayCart();

/* Insertion des éléments "article" + "div" (img, content, description, setting, quantity) + 
"img" + "h2" (titre) + color + price + addition prix + "p" + quantité + delet (supprimer)  */

// Fonction qui permet d'afficher le nombre total d'articles et prix total du panier

async function grandTotal() {

  let productsInLocalStorage = JSON.parse(localStorage.getItem("cartItems"));
  let totalQuantity = 0;
  let totalPrice = 0;
    for (product in productsInLocalStorage) {
      const article = await getProductDetails(productsInLocalStorage[product].id);
        totalQuantity += parseInt(productsInLocalStorage[product].quantity);
        totalPrice += parseInt(
            article.price * productsInLocalStorage[product].quantity
        );
    }
document.getElementById("totalQuantity").textContent = totalQuantity;
document.getElementById("totalPrice").textContent = totalPrice;
}

/* Récupération des produits du localStorage + variable "totalQuantity" (initialisé à 0) + variable "totalPrice" (initialisé à 0) +
 Boucle for pour parcourir les produits stockées dans localStorage + Appel fonction "getProductDetails" pour récupérer les infos de l'api (price) +
 Variable "totalQuantity" remplacée par quantité de tous les produits du localStorage + Variable "totalPrice" remplacée par le prix total des produits du localStorage +
 Récupération du total des quantités et le contenu textuel est changé par la valeur de la variable "totalQuantity"
 Récupération du total du prix et le contenu textuel est changé par la valeur de la variable "totalPrice"  */


// Fonction qui permet d'afficher le prix total de chaque produit par rapport à sa quantité

async function singleProductPrice(dataId, dataColor, productPrice) {
   let productsInLocalStorage = JSON.parse(localStorage.getItem("cartItems"));
   let price = 0;
  const article = await getProductDetails(dataId);
    for (product in productsInLocalStorage) {
        if (
            productsInLocalStorage[product].id == dataId &&
            productsInLocalStorage[product].color == dataColor
         ) {
            price += parseInt(
                article.price * productsInLocalStorage[product].quantity
            );
            productPrice.textContent = price + " €";
        }
    }
    grandTotal();
}

/* Récupération des produits du localStorage + variable price crée (initialisée à 0) + Appel de la fonction "getProductDetails" pour récupérer les infos de l'api (prix)
Boucle for pour parcourir tous les produits présent dans le localStorage + Si le panier (localStorage) contient déja un article (de même id et couleur) +
Variable "price" remplacée par un nouveau prix en fonction de sa quantité + Récupération prix et contenu textuel changé par la valeur de la variable price */


// Fonction qui gère la modification de la quantité

function changeQuantity() {
  const quantityInputs = document.querySelectorAll(".itemQuantity");
    quantityInputs.forEach(function (quantityInput) {
        quantityInput.addEventListener("change", function (event) {
            event.preventDefault();
        let inputValue = Number(event.target.value);
        let productPrice = event.target
                .closest("article")
                .querySelector(".cart__item__content__description p:nth-child(3)");
      const dataId = event.target.closest("article").dataset.id;
      const dataColor = event.target.closest("article").dataset.color;
        let cartItems = localStorage.getItem("cartItems");
        let items = JSON.parse(cartItems);
            items = items.map(function (item, index) {
                if (item.id === dataId && item.color === dataColor) {
                    item.quantity = inputValue;
                }
                return item;
            });

// Conditions permettant de vérifer la quantité renseignée

    if (!Number.isInteger(inputValue)) {
        alert(
        "Veuillez renseigner un nombre entier compris entre 1 et 100\r\n"
                );
        return;
         } else if (inputValue == 0) {
            alert("Veuillez renseigner une quantité\r\n");
        return;
         } else if (inputValue > 100) {
            alert("La quantité maximale autorisée est de 100\r\n");
        return;
         } else if (inputValue < 0) {
                alert("Veuillez ne pas saisir de valeur négative!\r\n");
        return;
         }
          let itemsStr = JSON.stringify(items);
            localStorage.setItem("cartItems", itemsStr);
            singleProductPrice(dataId, dataColor, productPrice);
        });
    });
}

// Fonction qui gère la suppression d'un produit

function deleteProduct() {
    const deleteButtons = document.querySelectorAll(".deleteItem");
    deleteButtons.forEach(function (deleteButton) {
        deleteButton.addEventListener("click", function (event) {
            event.preventDefault();
          let productsInLocalStorage = JSON.parse(
                localStorage.getItem("cartItems")
            );
        const deleteId = event.target.closest("article").dataset.id;
        const deleteColor = event.target.closest("article").dataset.color;
            productsInLocalStorage = productsInLocalStorage.filter(function (
                element
            ) {
        return !(element.id == deleteId && element.color == deleteColor);
            });
            deleteConfirm = window.confirm(
                "Etes vous sûr de vouloir supprimer cet article ?"
            );
        if (deleteConfirm == true) {
                localStorage.setItem(
                    "cartItems",
                    JSON.stringify(productsInLocalStorage)
                );
        alert("Article supprimé avec succès");
            deleteButton.closest("article").remove();
            }
            grandTotal();
        });
    });
}

// Récupération des produits de l'API

async function getProductDetails(productId) {
    try {
        const res = await fetch(
            "http://localhost:3000/api/products/" + productId
        );
        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            throw new Error("Erreur 404");
        }
    } catch (error) {
        console.log(error.message);
    }
}

// Forumulaire

function form() {

// Création des expressions régulières (regex letter = first name + name / regex letter number = city + adress / regex match email = email)

    let regexLetter = /^[a-zA-Z\-çñàéèêëïîôüù ]{2,}$/;
    let regexNumberLetter = /^[a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,60}$/i;
    let regexMatchEmail = /^[a-zA-Z0-9æœ.!#$%&'*+/=?^_`{|}~"(),:;<>@[\]-]+@([\w-]+\.)+[\w-]{2,4}$/i;

// Variables pour récupérer les id des champs de formulaire

    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const address = document.getElementById("address");
    const city = document.getElementById("city");
    const email = document.getElementById("email");

 // Écoute de la modification du prénom + Validation

    firstName.addEventListener("input", function (event) {
        event.preventDefault();
      if (regexLetter.test(firstName.value) == false || firstName.value == "") {
            document.getElementById("firstNameErrorMsg").textContent =
                "Prénom non valide";
        return false;
      } else {
            document.getElementById("firstNameErrorMsg").textContent = "";
        return true;
        }
    });

// Écoute de la modification du nom + Validation

    lastName.addEventListener("input", function (event) {
        event.preventDefault();
      if (regexLetter.test(lastName.value) == false || lastName.value == "") {
            document.getElementById("lastNameErrorMsg").textContent =
                "Nom non valide";
        return false;
      } else {
            document.getElementById("lastNameErrorMsg").textContent = "";
        return true;
        }
    });

// Écoute de la modification de l'adresse + Validation

    address.addEventListener("input", function (event) {
        event.preventDefault();
      if (regexNumberLetter.test(address.value) == false || address.value == "") {
            document.getElementById("addressErrorMsg").textContent =
                "Adresse non valide";
        return false;
      } else {
            document.getElementById("addressErrorMsg").textContent = "";
        return true;
        }
    });

// Écoute de la modification de la ville + Validation

    city.addEventListener("input", function (event) {
        event.preventDefault();
      if (regexNumberLetter.test(city.value) == false || city.value == "") {
            document.getElementById("cityErrorMsg").textContent = "Ville non valide";
        return false;
      } else {
            document.getElementById("cityErrorMsg").textContent = "";
        return true;
        }
    });

// Écoute de la modification de l'adresse mail + Validation

    email.addEventListener("input", function (event) {
        event.preventDefault();
      if (regexMatchEmail.test(email.value) == false || email.value == "") {
            document.getElementById("emailErrorMsg").textContent = "Email non valide";
        return false;
      } else {
            document.getElementById("emailErrorMsg").textContent = "";
        return true;
        }
    });
    let order = document.getElementById("order");

// Ecouter le bouton commander

    order.addEventListener("click", function (event) {
        event.preventDefault();

// Récupération des produits du LocalStorage

    let productsInLocalStorage = JSON.parse(localStorage.getItem("cartItems"));

// Création d'un tableau afin de récuperer les données de l'utilisateur attendu par l'API

    let contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
        };

// Dans le cas où l'envoi du formulaire de contact est vide

    if (
        firstName.value === "" ||
        lastName.value === "" ||
        address.value === "" ||
        city.value === "" ||
        email.value === ""
        ) {
        alert("Vous devez renseigner tous les champs pour passer la commande !");
        }

// Dans le cas où un des champs ne correspond pas aux condition exigés

    else if (
        regexLetter.test(firstName.value) == false ||
        regexLetter.test(lastName.value) == false ||
        regexNumberLetter.test(address.value) == false ||
        regexNumberLetter.test(city.value) == false ||
        regexMatchEmail.test(email.value) == false
        ) {
        alert("Merci de renseigner vos coordonnées en suivant les conditions !");
        }

// Si le localStorage est vide + quantité total des produits > 100

    else if (productsInLocalStorage === null || productsInLocalStorage == 0) {
        alert(
            "Vous devez ajouter au moins un produit au panier pour passer commande !"
            );
    }  else if (productsInLocalStorage > 100) {
        alert(
            "La quantité maximale autorisée est de 100\r\n"
            );
    } else {
        let products = [];
            productsInLocalStorage.forEach(function (order) {
                products.push(order.id);
            });
        let pageOrder = { contact, products };

// Construction d'un array depuis le local storage

// Appel à l'api order pour envoyer les tableaux

fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
        Accept: "application/json",
        "Content-type": "application/json",
    },
    body: JSON.stringify(pageOrder),
})
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        window.location.href = "./confirmation.html?orderId=" + data.orderId;
        localStorage.clear();
    })
    .catch(function (error) {
        return error.json();
    });
    console.log("une erreur est survenue");
}
});
}

form();