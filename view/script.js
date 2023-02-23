



const productList = document.getElementById("product-list");
const productForm = document.getElementById("product-form");
const editProductForm = document.getElementById("edit-product-form");
const cancelEditButton = document.getElementById("cancel-edit");
const id = document.getElementById("edit-id").value;

// get list of products
function getProducts() {
  fetch("http://localhost:9000/produits/all")
    .then(response => response.json())
    .then(products => {
      productList.innerHTML = "";
      products.forEach(product => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${product._id}</td> 
          <td>${product.nom}</td> 
          <td>${product.prix}$</td>
          <td>${product.description}</td>
          <td>${product.created_at}</td>
          <td>
            <button class="btn btn-info edit-product" data-id="${product._id}">Edit</button>
            <button class="btn btn-danger delete-product" id="delete-id" value="${product._id}">Delete</button>
          </td>
        `;
        productList.appendChild(tr);
      });
    })
    .catch(error => console.error(error));
}
getProducts();

// add Trt
productForm.addEventListener("submit", event => {
  event.preventDefault();
    const nom = document.getElementById("nom").value;
    const prix = document.getElementById("prix").value;
    const description = document.getElementById("description").value;
    const product = {
              nom: nom,
              description:description,
              prix: prix
          };
    fetch("http://localhost:9000/produits/ajouter", {
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify(product)
          })
          .then(response => {
                if (response.ok) {
                  alert("Product added successfully");
                  productForm.reset();
                  getProducts();
                } else {
                  throw new Error("Error adding product");
                }
          })
          .catch(error => {
              console.error(error);
              alert("Error adding product");
      });
});

// edit Trt
editProductForm.addEventListener("submit", event => {
    // event.preventDefault();
    const id = document.getElementById("edit-id").value;
    const nom = document.getElementById("edit-nom").value;
    const description = document.getElementById("edit-description").value;
    const prix = document.getElementById("edit-prix").value;
    const product = {
        ids: id,
        nom: nom,
        description: description,
        prix: prix
    };
    fetch(`http://localhost:9000/produits/update`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(product)
    })
      .then(response => {
        if (response.ok) {
          alert(`Product ${id} updated successfully`);
          editProductForm.reset();
          getProducts();
        } else {
          throw new Error(`Error updating product ${id}`);
        }
      })
      .catch(error => {
        // console.error(error);
        // alert(`Error updating product ${id}`);
      });
});

// delete Trt
const deleteBtn = document.getElementById("delete");

deleteBtn.addEventListener('click', event =>{
  const productId = document.getElementById("delete-id").value;
  // event.preventDefault();
  fetch(
    'http://localhost:9000/produits/delete',{
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "ids":productId 
      })
  }
  ).then(response => {
    if (response.ok) {
      alert(`Product ${productId} deleted successfully`);
      getProducts();
    } else {
      throw new Error(`Error deleting product ${productId}`);
    }
  })
  .catch(error => {
    console.error(error);
    alert(`Error deleting product ${productId}`);
  });
})




// -------------------------------------------------------------------------------- //
  // delete Trt
  const addProductAF = document.getElementById("add-product-AF");
  const editProductAF = document.getElementById("edit-product-AF");
  const deleteProductAF = document.getElementById("delete-product-AF");

  const AddProduct = document.getElementById("Add-Product");
  const EditProduct = document.getElementById("Edit-Product");
  const DeleteProduct = document.getElementById("Delete-Product");

  addProductAF.addEventListener('click', event =>{
    event.preventDefault();
    AddProduct.style.display == "block"? AddProduct.style.display = "none": AddProduct.style.display = "block";
  })
  editProductAF.addEventListener('click', event =>{
    event.preventDefault();
    EditProduct.style.display == "block"?EditProduct.style.display = "none":EditProduct.style.display = "block";
  })
  deleteProductAF.addEventListener('click', event =>{
    event.preventDefault();
    DeleteProduct.style.display == "block" ? DeleteProduct.style.display = "none":DeleteProduct.style.display = "block";
  })

