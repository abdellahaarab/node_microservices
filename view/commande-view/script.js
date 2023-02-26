



const productList = document.getElementById("Commandes-list");


// get list of products
function getCommandes() {
  fetch("http://localhost:9001/commande/all")
    .then(response => response.json())
    .then(commandes => {
      productList.innerHTML = "";
      commandes.forEach(commande => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${commande.email_utilisateur}</td> 
          <td>${commande.prix_total}</td>
          <td>${commande.created_at}</td>
          <td>
            <button class="btn btn-info edit-product" data-id="">Edit</button>
            <button class="btn btn-danger delete-product" id="delete-id" value="">Delete</button>
          </td>
        `;
        productList.appendChild(tr);
      });
    })
    .catch(error => console.error(error));
}
getCommandes();
