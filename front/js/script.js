// Intégration des produits de l'API 

fetch("http://localhost:3000/api/products")
.then((response) => 
response.json()
.then((objectProducts) => { 
    console.table(objectProducts); 
    Kanaps(objectProducts);}))
    .catch((err) => {
      document.querySelector(".titles").innerHTML = "<h1>erreur 404</h1>";
      console.log("erreur 404, sur ressource api:" + err);
    });

/* Obtient la réponse en json + 
Nom des données json traités "objectProducts" + 
Informations récupérées sous forme de tableau +
Appel de la fonction d'affichage des produits +
Dans le cas d'une erreur remplace le contenu de titre par un h1 au contenu de erreur 404 et renvoit en console l'erreur.*/

  function Kanaps(index) { 
    let zoneArticle = document.querySelector("#items");
    for (let article of index) {
        zoneArticle.innerHTML += `<a href="./product.html?_id=${article._id}">
    <article>
      <img src="${article.imageUrl}" alt="${article.altTxt}">
      <h3 class="productName">${article.name}</h3>
      <p class="productDescription">${article.description}</p>
    </article>
  </a>`;
  }
}
    /* définir une zone d'article à partir de l'id de l'index html pour les articles + 
Prise en considération des valeurs pour chacun des articles + 
Modification de la zone d'article en prenant les informations contenus dans la partie html <article>
 en ajoutant un $ pour signifier le type d'élément à récupérer dans la fiche produit*/