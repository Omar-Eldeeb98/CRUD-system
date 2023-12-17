// ! ============================================ C R U D S  Operations ======================================================

// assign input tags in a variable
var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescriptionInput = document.getElementById(
  "productDescriptionInput"
);

// clear inputs function
function clearInputs() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescriptionInput.value = "";
}

// clear search input  function
function clearSearchInput() {
  searchInput.value = "";
  displayData();
}

// ? +++++++++++++++++++++++++++++++++++++++++ (C) => Create or Add ++++++++++++++++++++++++++++++++++++++++++++++++++++

// create array 'productList' to carry products list
var productList = [];

// display data from local storage to table
if (localStorage.getItem("products") != null) {
  productList = JSON.parse(localStorage.getItem("products"));
  displayData();
}

// function create 'add' new product
function addProduct() {
  if (
    productNameValidation() == true &&
    productPriceValidation() == true &&
    productCategoryValidation() == true &&
    productDescriptionValidation() == true
  ) {
    //carry the values of inputs and assign it to an object 'product'
    var product = {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      description: productDescriptionInput.value,
    };

    // put object 'product' to array 'productList'
    productList.push(product);

    // save to local storage
    localStorage.setItem("products", JSON.stringify(productList));

    // clear inputs after user click to add button
    clearInputs();

    // invoke the displayData() function to show data in table
    displayData();

    productNameInput.classList.remove("is-valid");
    productPriceInput.classList.remove("is-valid");
    productCategoryInput.classList.remove("is-valid");
    productDescriptionInput.classList.remove("is-valid");

    console.log(productList);
  } else {
    alert("Please My Dear , Enter a Valid Data 🤡❗");
  }
}

// ? +++++++++++++++++++++++++++++++++++++++++ (C) => Create or Add  ++++++++++++++++++++++++++++++++++++++++++++++++++++

// ? +++++++++++++++++++++++++++++++++++++++++ (R) => Read or Display  ++++++++++++++++++++++++++++++++++++++++++++++++++++

function displayData() {
  var tableRow = "";
  for (var i = 0; i < productList.length; i++) {
    tableRow += ` <tr>
        <td>${i + 1}</td>
        <td>${productList[i].name}</td>
        <td>${productList[i].price} $</td>
        <td>${productList[i].category}</td>
        <td>${productList[i].description}</td>
        <td> 
        <button onclick = "setData(${i})" type="button" class=" btn btn-outline-warning  mb-1"><i class="fa-solid fa-pen-to-square"></i></button>
        <button onclick = "deleteProduct(${i})" type="button" class="btn btn-outline-danger mb-1"><i class="fa-solid fa-trash-can"></i></button>
        </td>
      </tr>`;
  }

  document.getElementById("tableBody").innerHTML = tableRow;
}

// ? +++++++++++++++++++++++++++++++++++++++++ (R) => Read or Display  ++++++++++++++++++++++++++++++++++++++++++++++++++++

// ? +++++++++++++++++++++++++++++++++++++++++ (D) => Delete  ++++++++++++++++++++++++++++++++++++++++++++++++++++

// delete specific  product
function deleteProduct(productIndex) {
  productList.splice(productIndex, 1);
  localStorage.setItem("products", JSON.stringify(productList));
  displayData();
}

// delete all data from local storage & array 'productList'
function deleteAllProducts() {
  productList.splice(0, productList.length);
  localStorage.setItem("products", JSON.stringify(productList));
  displayData();
}

// ? +++++++++++++++++++++++++++++++++++++++++ (D) => Delete  ++++++++++++++++++++++++++++++++++++++++++++++++++++

// ? +++++++++++++++++++++++++++++++++++++++++ (S) => Search  ++++++++++++++++++++++++++++++++++++++++++++++++++++

var searchInput = document.getElementById("searchInput");

function searchProduct() {
  var term = searchInput.value;

  var tableRow = "";
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(term.toLowerCase()) || productList[i].category.toLowerCase().includes(term.toLowerCase()) ) {
      // !==================================================================
      // productList[i].newName = productList[i].name
      // .toLowerCase()
      // .replace(term, `<span class=' text-danger  bg-dark fw-bold  '>${term}</span>`);
      // <td>${productList[i].newName}</td>
      //productList[i].newName ? productList[i].newName : productList[i].name  //  in displayData()
      // !==================================================================

      tableRow += ` <tr>
        <td>${i + 1}</td>
        <td>${productList[i].name}</td>
        <td>${productList[i].price} $</td>
        <td>${productList[i].category}</td>
        <td>${productList[i].description}</td>
        <td> 
        <button onclick = "setData(${i})"  type="button" class="btn btn-outline-warning mb-1 "><i class="fa-solid fa-pen-to-square"></i></button>
        <button onclick = "deleteProduct(${i})" type="button" class="btn btn-outline-danger mb-1"><i class="fa-solid fa-trash-can"></i></button>
        </td>
      </tr>`;
    }
  }

  document.getElementById("tableBody").innerHTML = tableRow;
}

// ? +++++++++++++++++++++++++++++++++++++++++ (S) => Search  ++++++++++++++++++++++++++++++++++++++++++++++++++++

// ? +++++++++++++++++++++++++++++++++++++++++ (U) => Update  ++++++++++++++++++++++++++++++++++++++++++++++++++++

var addButton = document.getElementById("addButton");
var updateButton = document.getElementById("updateButton");

function setData(index) {
  indexUpdate = index;
  var currentProduct = productList[index];

  productNameInput.value = currentProduct.name;
  productPriceInput.value = currentProduct.price;
  productCategoryInput.value = currentProduct.category;
  productDescriptionInput.value = currentProduct.description;

  updateButton.classList.remove("d-none");
  addButton.classList.add("d-none");
}

var indexUpdate = 0;

function updateProduct() {
  if (
    productNameValidation() == true &&
    productPriceValidation() == true &&
    productCategoryValidation() == true &&
    productDescriptionValidation() == true
  ) {
    //carry the values of inputs and assign it to an object 'product'
    var product = {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      description: productDescriptionInput.value,
    };
    productList.splice(indexUpdate, 1, product);
    // save to local storage
    localStorage.setItem("products", JSON.stringify(productList));

    displayData();

    updateButton.classList.add("d-none");
    addButton.classList.remove("d-none");

    clearInputs();

    productNameInput.classList.remove("is-valid");
    productPriceInput.classList.remove("is-valid");
    productCategoryInput.classList.remove("is-valid");
    productDescriptionInput.classList.remove("is-valid");
  } else {
    alert("Please My Dear , Enter a Valid Data 🤡❗");
  }
}

// ? +++++++++++++++++++++++++++++++++++++++++ (U) => Update  ++++++++++++++++++++++++++++++++++++++++++++++++++++

// ? +++++++++++++++++++++++++++++++++++++++++ applay validation  ++++++++++++++++++++++++++++++++++++++++++++++++++++

// product name validation
function productNameValidation() {
  var text = productNameInput.value;
  var pNameAlert = document.getElementById("pNameAlert");
  var productNameRegex = /^[A-Z][a-z]{2,10}$/;
  if (productNameRegex.test(text) == true) {
    productNameInput.classList.add("is-valid");
    productNameInput.classList.remove("is-invalid");
    pNameAlert.classList.add("d-none");
    return true;
  } else {
    productNameInput.classList.add("is-invalid");
    productNameInput.classList.remove("is-valid");
    pNameAlert.classList.remove("d-none");
    return false;
  }
}

// product price validation
function productPriceValidation() {
  var text = productPriceInput.value;
  var pPriceAlert = document.getElementById("pPriceAlert");
  var productPriceRegex = /^[1-9][0-9]{2,6}$/;
  if (productPriceRegex.test(text) == true) {
    productPriceInput.classList.add("is-valid");
    productPriceInput.classList.remove("is-invalid");
    pPriceAlert.classList.add("d-none");
    return true;
  } else {
    productPriceInput.classList.add("is-invalid");
    productPriceInput.classList.remove("is-valid");
    pPriceAlert.classList.remove("d-none");
    return false;
  }
}

// product category validation
function productCategoryValidation() {
  var text = productCategoryInput.value;
  var pCategoryAlert = document.getElementById("pCategoryAlert");
  var productCategoryeRegex = /^[A-Z][a-z]{5,10}$/;
  if (productCategoryeRegex.test(text) == true) {
    productCategoryInput.classList.add("is-valid");
    productCategoryInput.classList.remove("is-invalid");
    pCategoryAlert.classList.add("d-none");
    return true;
  } else {
    productCategoryInput.classList.add("is-invalid");
    productCategoryInput.classList.remove("is-valid");
    pCategoryAlert.classList.remove("d-none");
    return false;
  }
}
// product description validation
function productDescriptionValidation() {
  var text = productDescriptionInput.value;
  var pDescriptionAlert = document.getElementById("pDescriptionAlert");
  var productDescriptioneRegex = /^[A-Za-z0-9\s.,!?'"()-]{10,500}$/;
  if (productDescriptioneRegex.test(text) == true) {
    productDescriptionInput.classList.add("is-valid");
    productDescriptionInput.classList.remove("is-invalid");
    pDescriptionAlert.classList.add("d-none");
    return true;
  } else {
    productDescriptionInput.classList.add("is-invalid");
    productDescriptionInput.classList.remove("is-valid");
    pDescriptionAlert.classList.remove("d-none");
    return false;
  }
}

// ? +++++++++++++++++++++++++++++++++++++++++ applay validation  ++++++++++++++++++++++++++++++++++++++++++++++++++++

// ! ======================================================= END =====================================================================
