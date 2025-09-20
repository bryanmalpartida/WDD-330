import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;

    this.addProductToCart = this.addProductToCart.bind(this);
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();

    const button = document.getElementById("addToCart");
    if (button) {
      button.addEventListener("click", this.addProductToCart);

    } else {
      console.warn("addToCart button not found!");
    }
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);

    //alert the user
     alert(`${this.product.NameWithoutBrand} added to cart!`);
  }

  renderProductDetails() {
    document.getElementById("productBrand").textContent =
      this.product.Brand.Name;
    document.getElementById("productName").textContent =
      this.product.NameWithoutBrand;
    document.getElementById("productImage").src = this.product.Image;
    document.getElementById("productImage").alt = this.product.NameWithoutBrand;
    document.getElementById("productPrice").textContent =
      `$${this.product.FinalPrice}`;
    document.getElementById("productColor").textContent =
      this.product.Colors[0].ColorName;
    document.getElementById("productDesc").innerHTML =
      this.product.DescriptionHtmlSimple;
    document.getElementById("addToCart").dataset.id = this.product.Id;
  }
}
