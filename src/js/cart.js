import { getLocalStorage } from "./utils.mjs";

const cartItems = getLocalStorage("so-cart");

function renderCartContents() {
  
  const uniqueItems = consolidateItems(cartItems);
  const htmlItems = uniqueItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
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
        src='${newItem.Image}'
        alt='${newItem.Name}'
      />
   </a>
    <a href='#'>
      <h2 class='card__name'>${newItem.Name}</h2>
    </a>
    <p class='cart-card__color'>${newItem.Colors[0].ColorName}</p>
    <p class='cart-card__quantity'>Quantity: ${newItem.Quantity} </p>
    <p class='cart-card__price'>$${newItem.TotalPrice.toFixed(2)}</p>
  </li>`;

}

renderCartContents();
