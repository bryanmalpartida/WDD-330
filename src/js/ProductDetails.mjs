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
    if (this.product && this.product.Id) {
      productDetailsTemplate(this.product);
    } else {
      console.warn("Product not found!");
    }
  }
}

function productDetailsTemplate(product) {
  document.querySelector("h2").textContent = product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
  document.querySelector("#p-brand").textContent = product.Brand.Name;
  document.querySelector("#p-name").textContent = product.NameWithoutBrand;

  const productImage = document.querySelector("#p-image");
  productImage.src = product.Images.PrimaryExtraLarge;
  productImage.alt = product.NameWithoutBrand;
  const euroPrice = new Intl.NumberFormat('de-DE',
    {
      style: 'currency', currency: 'EUR',
    }).format(Number(product.FinalPrice) * 0.85);
  document.querySelector("#p-price").textContent = `${euroPrice}`;
  document.querySelector("#p-color").textContent = product.Colors[0].ColorName;
  document.querySelector("#p-description").innerHTML = product.DescriptionHtmlSimple;

  document.querySelector("#add-to-cart").dataset.id = product.Id;
}
