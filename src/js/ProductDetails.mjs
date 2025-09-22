import { setLocalStorage, getLocalStorage, updateCartCount } from "./utils.mjs";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = null;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();

    const button = document.getElementById("addToCart");
    if (button) {
      button.addEventListener("click", () => this.addProductToCart());
    } else {
      console.warn("addToCart button not found!");
    }
  }

  addProductToCart = () => {
  if (!this.product || !this.product.Id) {
    console.warn("Tried to add undefined product to cart");
    return;
  }

  const cartItems = getLocalStorage("so-cart") || [];
  

  const productForCart = {
    Id: this.product.Id,
    Name: this.product.NameWithoutBrand,
    Brand: this.product.Brand.Name,
    Colors: this.product.Colors || [],
    FinalPrice: this.product.FinalPrice,
    Image: this.product.Images?.PrimaryMedium || "", 
  };

  cartItems.push(productForCart);
  setLocalStorage("so-cart", cartItems);

  updateCartCount();
};

  renderProductDetails() {
    if (!this.product || !this.product.Id) {
      console.warn("Product not found!");
      return;
    }

    document.querySelector("#productBrand").textContent = this.product.Brand.Name;
    document.querySelector("#productName").textContent = this.product.NameWithoutBrand;

    const productImage = document.querySelector("#productImage");
    productImage.src = this.product.Images.PrimaryLarge;
    productImage.alt = this.product.NameWithoutBrand;

    document.querySelector("#productPrice").textContent = `$${this.product.FinalPrice}`;
    document.querySelector("#productColor").textContent =
      this.product.Colors?.[0]?.ColorName || "N/A";
    document.querySelector("#productDesc").innerHTML =
      this.product.DescriptionHtmlSimple;

    document.querySelector("#addToCart").dataset.id = this.product.Id;
  }
}

document.addEventListener("DOMContentLoaded", updateCartCount);