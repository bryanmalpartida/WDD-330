export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(template);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export async function loadHeaderFooter() {
    try {
        const headerResponse = await fetch('/includes/header.html');
        const footerResponse = await fetch('/includes/footer.html');
        
        const headerHTML = await headerResponse.text();
        const footerHTML = await footerResponse.text();
        
        document.querySelector('header').innerHTML = headerHTML;
        document.querySelector('footer').innerHTML = footerHTML;
    } catch (error) {
        console.error('Error loading header/footer:', error);
    }
}


export function updateCartCount() {
    const cart = getLocalStorage('so-cart') || [];
    const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    const cartIcon = document.querySelector('.cart-count');
    
    if (cartIcon) {
        cartIcon.textContent = cartCount;
        cartIcon.style.display = cartCount > 0 ? 'flex' : 'none';
    }
}