import { getParam, loadHeaderFooter, updateCartCount } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// Load header and footer
loadHeaderFooter();

//Create ProductData instance (the source of the products)
const dataSource = new ProductData("tents"); 
//Read the “product” parameter from the URL
const productId = getParam("product");

//Create ProductDetails instance
const product = new ProductDetails(productId, dataSource);

//Initialize everything
product.init();
document.addEventListener("DOMContentLoaded", updateCartCount);