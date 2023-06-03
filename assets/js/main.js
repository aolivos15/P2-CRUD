// Selecting elements from the page
const prodName = document.getElementById('prod-name');
const prodColor = document.getElementById('prod-color');
const prodPrice = document.getElementById('prod-price');
const prodQuantity = document.getElementById('prod-quantity');
const addButton = document.getElementById('add-button');
const updateButton = document.getElementById('update-button');
const productForm = document.getElementById('product-form');
const tableBody = document.getElementById('table-body');

// On page load, get all products from local storage and list them on the table
listProducts();

////////////////////////////////////////////////////////
// List stored products on the table
////////////////////////////////////////////////////////
function listProducts () {

  tableBody.innerHTML = ''; // Reset contents of table body

  // Get keys of all products in local storage
  let keys = Object.keys(localStorage);
  // Product IDs / keys are defined when each product is added to the local storage using "Date.now()",
  // so we sort keys in ascending order for the function to list products in the order they were added
  keys.sort(function(a, b){return a - b});

  // If there are products in the local storage, list them on the table
  if (keys.length != 0) {
    keys.forEach( key => {
      let product = JSON.parse(localStorage.getItem(key));

      tableBody.innerHTML += `
      <td>${product.name}</td>
      <td>${product.color}</td>
      <td>${product.price}</td>
      <td>${product.quantity}</td>
      <td>
        <button class="edit-button" onclick="editProduct(${key});">Editar</button>
        <button class="delete-button" onclick="deleteProduct(${key});">Eliminar</button>
      </td>
      `;
    });
  } else {
    // If local storage is empty, show a message on the table
    tableBody.innerHTML += `
    <td colspan="5">Aún no se han agregado productos al inventario</td>
    `;
  }

}

////////////////////////////////////////////////////////
// Add a new product to local storage
////////////////////////////////////////////////////////
addButton.addEventListener('click', addProduct);

function addProduct (event) {
  // Prevent the button from resetting the page
  event.preventDefault();

  // Generate an ID / key for the new product
  const productID = Date.now();

  // Create the new product with the data on the form
  const newProduct = {
    name: prodName.value,
    color: prodColor.value,
    price: prodPrice.value,
    quantity: prodQuantity.value
  };

  // Add new product to local storage
  localStorage.setItem(productID, JSON.stringify(newProduct));

  // Show updated product list on table and reset form
  listProducts();
  productForm.reset();
}

////////////////////////////////////////////////////////
// Delete a product from local storage
////////////////////////////////////////////////////////

function deleteProduct (key) {

  // Get product from local storage
  const product = JSON.parse(localStorage.getItem(key));
  // Create message to show on alert
  const message = `¿De verdad quiere eliminar el producto "${product.name} ${product.color}"?`;

  // Ask if user really wants to delete the product
  if (confirm(message)) {
    // Remove product from array and display updated list of products
    localStorage.removeItem(key);
    listProducts();
  }

}


////////////////////////////////////////////////////////
// Edit and update product in local storage
////////////////////////////////////////////////////////

// Fill the form with the data of the product the user wants to edit
function editProduct (key) {

  const product = JSON.parse(localStorage.getItem(key));
  prodName.value = product.name;
  prodColor.value = product.color;
  prodPrice.value = product.price;
  prodQuantity.value = product.quantity;

  // Hide add button and display update button
  addButton.classList.add('hide');
  updateButton.classList.remove('hide');

  // Add listener with update function and product key to the update button
  updateButton.addEventListener('click', updateProduct(key));

}

// When user clicks the update button, update the product in local storage
function updateProduct (key) {

  return function (event) {
    // Prevent the button from reloading the page
    event.preventDefault();

    const updatedProduct = {
      name: prodName.value,
      color: prodColor.value,
      price: prodPrice.value,
      quantity: prodQuantity.value
    };

    // Add new product to local storage
    localStorage.setItem(key, JSON.stringify(updatedProduct));

    // Show updated product list on table and reset form
    listProducts();
    productForm.reset();

    // Hide update button and display add button
    updateButton.classList.add('hide');
    addButton.classList.remove('hide');
  }

}