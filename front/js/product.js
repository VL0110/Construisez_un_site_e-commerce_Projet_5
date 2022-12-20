// Page produit

// Récupération url + paramètre

let params = new URL(document.location).searchParams;

// Récupération de l'id

let productId = params.get("id");

// Fonction de récupération des données de l'API avec l'id du Produit 

async function getProduct() {
    try {
        const res = await fetch(
            "http://localhost:3000/api/products/" + productId
        );
        if (res.ok) {
            const data = await res.json();
            return displaySelectedProduct(data);
        } else {
            throw new Error("Erreur de 404");
        }
    } catch (error) {
        console.log(error.message);
    }
}

// Fonction d'insertion des données de l'API dans le DOM

function displaySelectedProduct(item) {
    let productImg = document.createElement("img");
    productImg.setAttribute("src", item.imageUrl);
    productImg.setAttribute("alt", item.altTxt);
    document.querySelector(".item__img").appendChild(productImg);
    let productTitle = document.getElementById("title");
    productTitle.textContent = item.name;
    let productPrice = document.getElementById("price");
    productPrice.textContent = item.price;
    let productDescription = document.getElementById("description");
    productDescription.textContent = item.description;
    for (let color of item.colors) {
        let productColors = document.createElement("option");
        productColors.setAttribute("value", color);
        productColors.textContent = color;
        document.querySelector("#colors").appendChild(productColors);
    }
    const addButton = document.getElementById("addToCart");
    addButton.addEventListener("click", checkCart);
}
// Insertion de l'image + "h1" (titre) + prix + description + options couleurs + bouton "ajouter au panier" ("checkCart")

// Fonction checkCart (conditions avant d'ajout du produit au panier)

function checkCart() {
    let productColor = document.querySelector("#colors").value;
    let productQuantity = Number(document.querySelector("#quantity").value);
    let productDetails = {
        id: productId,
        color: productColor,
        quantity: productQuantity,
    };
    let error = false;
    let msgError = "";
    if (productColor == "") {
        msgError += "Veuillez sélectionner une couleur\r\n";
        error = true;
    } else if (!Number.isInteger(productQuantity)) {
        msgError +=
            "Veuillez renseigner un nombre entier compris entre 1 et 100\r\n";
        error = true;
    } else if (productQuantity == 0) {
        msgError += "Veuillez renseigner une quantité\r\n";
        error = true;
    } else if (productQuantity > 100) {
        msgError += "La quantité maximale autorisée est de 100\r\n";
        error = true;
    } else if (productQuantity < 0) {
        msgError += "Veuillez ne pas saisir de valeur négative!\r\n";
        error = true;
    }
    if (error) {
        alert(msgError);
        return;
    }
    addToCart(productDetails);
}

// Création d'un objet (id, couleur et quantité) + erreurs conditions + limite de quantité + message d'erreur + fonction addToCart 
  

// Fonction qui permet d'ajouter un ou plusieurs produit au panier

function addToCart(productDetails) {
    let productsInLocalStorage = JSON.parse(localStorage.getItem("cartItems"));
    const popupConfirmation = function () {
        if (
            confirm(
                "Produit ajouté au panier !\nPour consulter votre panier, Cliquez sur OK !"
            )
        ) {
            window.location.href = "cart.html";
        }
    };
    if (productsInLocalStorage) {
        const resultFind = productsInLocalStorage.find(function (product) {
            return (
                product.id === productDetails.id &&
                product.color === productDetails.color
            );
        });
        if (resultFind) {
            let updateQuantity = productDetails.quantity + resultFind.quantity;
            resultFind.quantity = updateQuantity;
        } else {
            productsInLocalStorage.push(productDetails);
        }
    } else {
        productsInLocalStorage = [];
        productsInLocalStorage.push(productDetails);
    }
    localStorage.setItem("cartItems", JSON.stringify(productsInLocalStorage));
    popupConfirmation();
}
getProduct();

    /* Récupération des produits du LocalStorage + 
       JSON String transformé en Objet Javascript +
       Fenêtre pop-up de confirmation d'ajout du produit au panier et de redirection +
       Importation dans le local storage : 
       Si le panier contient déjà au moins 1 article de même id et même couleur
       Si c'est le cas, incrémenter la quantité du produit en question
       Si le panier contient des produits différents +
       Si le panier est vide +
       Objet Javascprit transformé en JSON StringObjet Javascprit transformé en JSON String  */