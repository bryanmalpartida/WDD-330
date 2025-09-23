import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

const cartItems = getLocalStorage("so-cart") || [];

function renderCartContents() {
  if (cartItems.length === 0) {
    document.querySelector(".product-cart").innerHTML = "<p>Your cart is empty.</p>";

    // Hides the footer if it exists
    const footer = document.querySelector(".cart-footer");
    if (footer) footer.classList.add("hide");

    // Resets completely if it exists
    const total = document.querySelector(".cart-total");
    if (total) total.textContent = "";

    return;
  }

  const uniqueItems = consolidateItems(cartItems);
  const htmlItems = uniqueItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-cart").innerHTML = htmlItems.join("");

  const total = uniqueItems.reduce((sum, item) => sum + item.TotalPrice, 0);
  document.querySelector(".cart-total").textContent = `Total: $${total.toFixed(2)}`;
  document.querySelector(".cart-footer").classList.remove("hide");
}

function consolidateItems(items) {
  const itemMap = new Map();

  items.forEach(item => {
    if (itemMap.has(item.Id)) {
      const existing = itemMap.get(item.Id);
      existing.Quantity += 1;
      existing.TotalPrice += item.FinalPrice;
    } else {
      itemMap.set(item.Id, {
        ...item,
        Quantity: 1,
        TotalPrice: item.FinalPrice
      });
    }
  });

  return Array.from(itemMap.values());
}

function cartItemTemplate(newItem) {
  return `<li class='cart-card divider'>
    <a href='#' class='cart-card__image'>
      <img
        src='${newItem.Image || "/images/placeholder.png"}'
        alt='${newItem.Name || "Unnamed product"}'
      />
    </a>
    <a href='#'>
      <h2 class='card__name'>${newItem.Name || "Unknown"}</h2>
    </a>
    <p class='cart-card__color'>${newItem.Colors?.[0]?.ColorName || "N/A"}</p>
    <p class='cart-card__quantity'>Quantity: ${newItem.Quantity || 1}</p>
    <p class='cart-card__price'>$${(newItem.TotalPrice || 0).toFixed(2)}</p>
  </li>`;
}

renderCartContents();
loadHeaderFooter();
