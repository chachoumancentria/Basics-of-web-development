function getCartCookieData() {
	var cookies = document.cookie.split("; ")
	var cart;

	for (let i = 0; i < cookies.length; i++) {
		if (cookies[i].startsWith("cart=")) {
			cart = cookies[i].split("=")[1].split(",");;
			break;
		}
	}

	if (cart == null) {
		console.warn("WARNING: No cart cookie found, creating one");
		// set default cart
		document.cookie = "cart=; expires Fri, 31 Dec 2025 23:59:59 GMT; path=/;";
		return getCartCookieData();
	}

	if (cart[0] == "") {
		console.info("INFO: cart is empty");
		return [];
	}

	for (let i = 0; i < cart.length; i++) {
		cart[i] = cart[i].split("-");

		cart[i][1] = parseInt(cart[i][1]);
		cart[i][2] = parseInt(cart[i][2]);
	}

	return cart;
}
function updateCartCookie(cart) {
	for (let i = 0; i < cart.length; i++) {
		cart[i] = cart[i].join("-");
	}
	const expiry_date = new Date();
	expiry_date.setMonth(expiry_date.getMonth() + 1)
	document.cookie = "cart=" + cart.join(",") + "; expires=" + expiry_date + ";path=/;";
}
function addCartItem(cart_item) { // cart_item is an array [name, quantity, duration] of type [string, int, int]
	var cart = getCartCookieData();
    updateCartCookie(cart.concat([cart_item]));
    document.location.reload();
}
function deleteCartItem(index) {
	var cart = getCartCookieData();
	cart.splice(index, 1);
	updateCartCookie(cart);
}
function deleteCart() {
	document.cookie = "cart=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
	updateCartPreview();
}

document.addEventListener("DOMContentLoaded", () => { 
    if (getCartCookieData().length == 0) {
        document.getElementById("cart-navigation-shortcut").style.display = "none";
    } else {
        document.getElementById("cart-navigation-shortcut").style.display = "block";
    }
});