// Page Accueil

// URL des API stocké dans une variable

const apiURL = "http://localhost:3000/api/products";

// Appel à l'API products

async function fetchData() {
    try {
        const res = await fetch(apiURL);
        if (res.ok) {
            const data = await res.json();
            return displayProducts(data);
        } else {
            throw new Error("Erreur de chargement");
        }
    } catch (error) {
        console.log(error.message);
    }
}

// Récupération des données et intégration dans le DOM

function displayProducts(items) {
    for (let item of items) {
     let productLink = document.createElement("a");
        productLink.setAttribute("href", `product.html?id=${item._id}`);
        document.querySelector("#items").appendChild(productLink);
     let productArticle = document.createElement("article");
        productLink.appendChild(productArticle);
     let productImg = document.createElement("img");
        productImg.setAttribute("src", item.imageUrl);
        productImg.setAttribute("alt", item.altTxt);
        productArticle.appendChild(productImg);
     let productTitle = document.createElement("h3");
        productTitle.classList.add("productName");
        productTitle.textContent = item.name;
        productArticle.appendChild(productTitle);
      let productDescription = document.createElement("p");
        productDescription.classList.add("productDescription");
        productDescription.textContent = item.description;
        productArticle.appendChild(productDescription);
    }
}

fetchData();

// console.log(item) + Insertion de l'élément "a" (item), "article", "img", "h3" (name), et "p"(alt text)