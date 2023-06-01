// Selecting elements from the page
const prodName = document.getElementById('prod-name');
const prodColor = document.getElementById('prod-color');
const prodPrice = document.getElementById('prod-price');
const prodQuantity = document.getElementById('prod-quantity');
const addButton = document.getElementById('add-button');
const productForm = document.getElementById('product-form');
const tableBody = document.getElementById('table-body');

// Array to store products
let productArray = [];

// On page load, get all products from local storage and list them on the table
listProducts();

////////////////////////////////////////////////////////
// List stored products on the table
////////////////////////////////////////////////////////
function listProducts () {

  // Get keys of all products in local storage
  let keys = Object.keys(localStorage);

  // Store "product" objects in an array
  keys.forEach(key => {
    productArray.push( JSON.parse(localStorage.getItem(key)) );
  });

  tableBody.innerHTML = ''; // Reset contents of table body

  // If there are products in local storage, list them on the table
  if (productArray.length != 0) {
    productArray.forEach( product => {
      tableBody.innerHTML += `
      <td>${product.name}</td>
      <td>${product.color}</td>
      <td>${product.price}</td>
      <td>${product.quantity}</td>
      <td>
        <button class="edit-button" onclick="editProduct(${product.id});">Editar</button>
        <button class="delete-button" onclick="deleteProduct(${product.id});">Eliminar</button>
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

function addProduct (e) {
  // Prevent the button from resetting the page
  e.preventDefault();

  let productID = Date.now(); // Get an ID for the new product
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
