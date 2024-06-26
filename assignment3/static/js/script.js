const container = document.querySelector(".container");
const searchedItem = document.getElementById("search");

document.addEventListener("DOMContentLoaded", () => {
  // Function to update the cart list and total amount

  // Function to add product to the cart
  async function addToCart(event) {
    const productId = event.target.dataset.productId;

    try {
      const response = await fetch("/add_to_cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: "user1",
          product_id: parseInt(productId),
          quantity: 1,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add the product to the cart.");
      }

      const cartData = await response.json();
      updateCart(cartData);
    } catch (error) {
      console.error(error.message);
    }
  }

  // Function to delete product from the cart
  async function deleteFromCart(event) {
    const productId = event.target.dataset.productId;

    try {
      const response = await fetch("/delete_from_cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: "user1",
          product_id: parseInt(productId),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete the product from the cart.");
      }

      const cartData = await response.json();
      updateCart(cartData);
    } catch (error) {
      console.error(error.message);
    }
  }

  // Add event listeners to the "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", addToCart);
  });

  // Add event listeners to the "Delete from Cart" buttons
  const deleteFromCartButtons = document.querySelectorAll(
    ".delete-from-cart-btn"
  );
  deleteFromCartButtons.forEach((button) => {
    button.addEventListener("click", deleteFromCart);
  });

  // Initially update the cart display
  async function getCart() {
    try {
      const response = await fetch("/cart?user_id=user1");
      if (!response.ok) {
        throw new Error("Failed to fetch the cart data.");
      }

      const cartData = await response.json();
      updateCart(cartData);
    } catch (error) {
      console.error(error.message);
    }
  }

  getCart();
});

document.addEventListener("DOMContentLoaded", () => {
  // Function to create the "Delete from Cart" button
  function createDeleteFromCartButton(productId) {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete from Cart";
    deleteButton.classList.add("delete-from-cart-btn");
    deleteButton.setAttribute("data-product-id", productId);
    deleteButton.addEventListener("click", deleteFromCart);
    return deleteButton;
  }

  async function getProducts() {
    try {
      const response = await fetch("/");
      if (!response.ok) {
        throw new Error("Failed to fetch products.");
      }

      const data = await response.json();
      updateProductsList(data.products);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function searchProduct(e) {
    e.preventDefault();
    try {
      const response = await fetch("/search_product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ search: searchedItem.value }),
      });

      if (!response.ok) {
        throw new Error("Failed to add the product.");
      }

      const data = await response.json();
      console.log(data);
      container.innerHTML = "";
      data.searched.forEach((product) => {
        container.innerHTML += `<div>${product.name} - Price:- ${product.price} - Description:- ${product.description} </div>`;
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  async function addProduct(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const price = parseFloat(document.getElementById("price").value);
    const description = document.getElementById("description").value;

    try {
      const response = await fetch("/add_product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, price, description }),
      });

      if (!response.ok) {
        throw new Error("Failed to add the product.");
      }

      // Fetch the updated product list after adding a new product
      await getProducts();

      // Clear the form after successful product addition
      document.getElementById("product-form").reset();
    } catch (error) {
      console.error(error.message);
    }
  }

  getProducts();
  // Function to update the products list
  function updateProductsList(products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach((product) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${product.name} - Price: $${product.price} - ${product.description}`;
      listItem.appendChild(createAddToCartButton(product.id));
      productList.appendChild(listItem);
    });
  }
  // Function to view the cart
  async function viewCart(event) {
    try {
      const response = await fetch("/cart?user_id=user1");
      if (!response.ok) {
        throw new Error("Failed to fetch the cart data.");
      }

      const cartData = await response.json();

      const cartList = document.getElementById("cart-list");
      const totalAmountElement = document.getElementById("total-amount");

      cartList.innerHTML = "";
      cartData.cart_items.forEach((cartItem) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${cartItem.name} - Price: $${cartItem.price} - Quantity: ${cartItem.quantity} - Subtotal: $${cartItem.item_total}`;
        cartList.appendChild(listItem);
      });

      totalAmountElement.textContent = `Total: $${cartData.total_amount.toFixed(
        2
      )}`;

      // Show the cart list and total amount
      cartList.style.display = "block";
      totalAmountElement.style.display = "block";
    } catch (error) {
      console.error(error.message);
    }
  }

  async function deleteFromCart(event) {
    const productId = event.target.dataset.productId;

    try {
      const response = await fetch("/delete_from_cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: "user1",
          product_id: parseInt(productId),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete the product from the cart.");
      }

      const cartData = await response.json();
      updateCart(cartData);
    } catch (error) {
      console.error(error.message);
    }
  }
  function updateCart(data) {
    const cartList = document.getElementById("cart-list");
    const totalAmountElement = document.getElementById("total-amount");
    let totalAmount = 0;

    cartList.innerHTML = "";
    data.cart_items.forEach((cartItem) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${cartItem.name} - Price: $${cartItem.price} - Quantity: ${cartItem.quantity} - Subtotal: $${cartItem.item_total}`;
      listItem.appendChild(createDeleteFromCartButton(cartItem.product_id));
      cartList.appendChild(listItem);
      totalAmount += cartItem.item_total;
    });

    totalAmountElement.textContent = `Total: $${totalAmount.toFixed(2)}`;

    // Show the cart list and total amount
    cartList.style.display = "block";
    totalAmountElement.style.display = "block";
  }

  // Function to create a "Delete from Cart" button
  function createDeleteButton(productId) {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete from Cart";
    deleteButton.classList.add("delete-from-cart-btn");
    deleteButton.setAttribute("data-product-id", productId);
    deleteButton.addEventListener("click", deleteFromCart);
    return deleteButton;
  }

  // Function to update the cart list and total amount

  const productForm = document.getElementById("product-form");
  productForm.addEventListener("submit", addProduct);

  const viewCartButton = document.getElementById("view-cart-btn");
  viewCartButton.addEventListener("click", viewCart);

  const productSearchForm = document.getElementById("product-search");
  productSearchForm.addEventListener("submit", searchProduct);
});
