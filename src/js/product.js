import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

//Read the “product” parameter from the URL
const productId = getParam("product");

//Create ProductData instance (the source of the products)
const dataSource = new ProductData("tents"); 

function addProductToCart(product) {
  // Get the existing cart from localStorage, or use an empty array
  let cart = getLocalStorage("so-cart") || [];
  // Add the new product
  cart.push(product);
  // Save it back to localStorage
  setLocalStorage("so-cart", cart);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
