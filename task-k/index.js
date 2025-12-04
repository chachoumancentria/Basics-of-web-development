/*
 * Authors: Nassim Boudekhani & Joseph Couprie
 * Date: 2025-11-14
 */


/*
---- Cookie format ----

	This is the format used in our cookies. All code must respect this format to prevent any misunderstanding.
	Modification of the format is NOT RECOMMENDED. If you must change format, please ask others first.

	The {value} notation represents a variable substitution.

	- Cart
		{item1}-{quantity1}-{duration1},{item2}-{quantity2}-{duration2}


*/


var navbar;
var back_to_top;


function getCartCookie() {
	var cookies = document.cookie.split("; ")
	var cart;

	for (let i = 0; i < cookies.length; i++) {
		if (cookies[i].startsWith("cart=")) {
			cart = cookies[i].split("=")[1].split(",");;
			break;
		}
	}

	if (cart == null) {
		console.warn("No cart cookie found, creating one");
		// set default cart
		document.cookie = "cart=; expires Fri, 31 Dec 2025 23:59:59 GMT; path=/";
		return;
	}

	for (let i = 0; i < cart.length; i++) {
		cart[i] = cart[i].split("-");

		cart[i][1] = parseInt(cart[i][1]);
		cart[i][2] = parseInt(cart[i][2]);
	}

	return cart;
}
function deleteCart() {
	document.cookie = "cart=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
}
function updateCartPreview(cart_items) {
	var template = document.getElementById("cart-item-template");
	var cart_DOM = document.getElementById("cart");
	// delete all cart contents
	cart_DOM.innerHTML = "";


	for (let i = 0; i < cart_items.length; i++) {
		var cart_item = cart_items[i];
		var preview_image;
		var item_name;
		var item_price;
		var rental_frequency;

		switch (cart_item[0]) {
			case "finnish":
				preview_image = "media/finnish_blahaj.jpeg";
				item_name = "Finnish Blåhaj";
				item_price = 23;
				rental_frequency = "week";
				break;

			case "pink":
				preview_image = "media/pink_blahaj.png";
				item_name = "Pink Blåhaj";
				item_price = 17;
				rental_frequency = "week";
				break;

			case "rainbow":
				preview_image = "media/rainbow_blahaj.png";
				item_name = "Rinbow Blåhaj";
				item_price = 20;
				rental_frequency = "week";
				break;

			case "army":
				preview_image = "media/blahaj_army.png";
				item_name = "Blåhaj Army";
				item_price = 55;
				rental_frequency = "week";
				break;

			case "evil":
				preview_image = "media/evil_blahaj.png";
				item_name = "Evil Blåhaj";
				item_price = 16.66;
				rental_frequency = "week";
				break;

			case "junior":
				preview_image = "media/blahajr.png";
				item_name = "BlåhaJr";
				item_price = 10;
				rental_frequency = "week";
				break;
			default:
				preview_image = "media/image_missing.jpg";
				item_name = "BlåhaJr";
				item_price = 10;
				rental_frequency = "week";
				break;
		}

		item = template.content.cloneNode(true);

		item.querySelector(".cart-item-image").src = preview_image;
		item.querySelector(".cart-item-title").textContent = item_name;
		item.querySelector(".cart-item-quantity").textContent = cart_item[1];
		item.querySelector(".cart-item-duration").textContent = cart_item[2] + " " + rental_frequency + (cart_item[2] > 1 ? "s" : "");
		item.querySelector(".cart-item-price-per-unit").textContent = item_price + "€";
		item.querySelector(".cart-item-price-total").textContent = cart_item[1] * cart_item[2] * item_price + "€";

		cart_DOM.appendChild(item);
	}
	cart_items.forEach(cart_item => {

	});
}


document.addEventListener("DOMContentLoaded", () => {
	navbar = document.getElementsByClassName("navbar")[0];
	back_to_top = document.getElementById("back-to-top");
	main_content = document.getElementsByClassName("main-content-wrapper")[0];

	main_content.style.paddingTop = navbar.getBoundingClientRect().height + "px";

	function onScrollInput() {
		//console.log(window.scrollY);

		if (window.scrollY < 150) {
			back_to_top.style.bottom = -100 + Math.round(window.scrollY) + "px";
		} else {
			back_to_top.style.bottom = "50px";
		}
	};
	document.addEventListener("scroll", onScrollInput);
	onScrollInput();

	updateCartPreview(getCartCookie());
});
