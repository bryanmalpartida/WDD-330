import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

//Read the “product” parameter from the URL
const productId = getParam("product");

//Create ProductData instance (the source of the products)
const dataSource = new ProductData("tents"); 

//Create ProductDetails instance
const product = new ProductDetails(productId, dataSource);

//Initialize everything
product.init();