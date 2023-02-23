const productList = document.getElementById("product-list");

fetch("http://localhost:9000/produits/all")
  .then(response => response.json())
  .then(products => {
    products.forEach(product => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${product._id}</td>
        <td>${product.nom}</td>
        <td>${product.prix}$</td>
        <td>${product.description}</td>
        <td>${product.created_at}</td>
      `;
      productList.appendChild(tr);
    });
  })
  .catch(error => console.error(error));
