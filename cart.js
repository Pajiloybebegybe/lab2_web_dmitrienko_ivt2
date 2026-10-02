// 🛒 Мои записи (localStorage)
var CART_KEY = 'turboCart';

function getCart() {
    try {
        var data = localStorage.getItem(CART_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) { return []; }
}

function saveCart(cart) {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {}
    updateCartBadge();
}

function addToCart(item) {
    var cart = getCart();
    var found = null;
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === item.id) { found = cart[i]; break; }
    }
    if (found) {
        found.qty = (found.qty || 1) + 1;
    } else {
        item.qty = 1;
        cart.push(item);
    }
    saveCart(cart);
}

function removeFromCart(id) {
    var cart = getCart().filter(function (i) { return i.id !== id; });
    saveCart(cart);
}

function clearCart() { saveCart([]); }

function cartTotal() {
    var cart = getCart();
    var sum = 0;
    for (var i = 0; i < cart.length; i++) {
        sum += cart[i].price * (cart[i].qty || 1);
    }
    return sum;
}

function cartCount() {
    var cart = getCart();
    var sum = 0;
    for (var i = 0; i < cart.length; i++) {
        sum += (cart[i].qty || 1);
    }
    return sum;
}

function updateCartBadge() {
    var count = cartCount();
    var badges = document.querySelectorAll('[data-cart-count]');
    for (var i = 0; i < badges.length; i++) {
        badges[i].textContent = count;
        badges[i].style.display = count > 0 ? 'inline-block' : 'none';
    }
}

function showToast(msg) {
    var toast = document.getElementById('cartToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'cartToast';
        toast.className = 'cart-toast';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () {
        toast.classList.remove('show');
    }, 2200);
}

document.addEventListener('DOMContentLoaded', updateCartBadge);