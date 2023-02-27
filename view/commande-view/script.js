



const productList = document.getElementById("Commandes-list");


// get list of products
function getCommandes() {
  fetch("http://localhost:9001/commande/all")
    .then(response => response.json())
    .then(commandes => {
      productList.innerHTML = "";
      commandes.forEach(commande => {
        const tr = document.createElement("tr");
        let option = "";
        for(var i=0; i < commande.produits.length; i++) {
          option += '<option>'+ commande.produits[i]+'</option>';
        }
        tr.innerHTML = `
          <td>${commande.email_utilisateur}</td> 
          <td>${commande.prix_total}</td>
          <td>${commande.created_at}</td>
          <td>
              <select class="form-control" name="" id="">
                  ${option}
              </select>
          </td>
        `;
        productList.appendChild(tr);
      });
    })
    .catch(error => console.error(error));
}
getCommandes();
