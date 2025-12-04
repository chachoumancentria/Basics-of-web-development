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
var cart_DOM;


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
function updateCartPreview() {
	var cart_items = getCartCookieData();

	var template = document.getElementById("cart-item-template");
	// delete all cart contents
	cart_DOM.innerHTML = "";

	if (cart_items.length == 0) {
		console.warn("WARNING: Empty cart, aborting DOM update.");

		cart_DOM.innerHTML = "Seems like your cart is empty...<a href=\"../task-j/index.html\">Check out our catalog</a>";
		return;
	}

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
				rental_frequency = "week" + (cart_item[2] > 1 ? "s" : "");
				break;

			case "pink":
				preview_image = "media/pink_blahaj.png";
				item_name = "Pink Blåhaj";
				item_price = 17;
				rental_frequency = "week" + (cart_item[2] > 1 ? "s" : "");
				break;

			case "rainbow":
				preview_image = "media/rainbow_blahaj.png";
				item_name = "Rainbow Blåhaj";
				item_price = 20;
				rental_frequency = "week" + (cart_item[2] > 1 ? "s" : "");
				break;

			case "army":
				preview_image = "media/blahaj_army.png";
				item_name = "Blåhaj Army";
				item_price = 55;
				rental_frequency = "week" + (cart_item[2] > 1 ? "s" : "");
				break;

			case "evil":
				preview_image = "media/evil_blahaj.png";
				item_name = "Evil Blåhaj";
				item_price = 16.66;
				rental_frequency = "week" + (cart_item[2] > 1 ? "s" : "");
				break;

			case "junior":
				preview_image = "media/blahajr.png";
				item_name = "BlåhaJr";
				item_price = 10;
				rental_frequency = "week" + (cart_item[2] > 1 ? "s" : "");
				break;
			default:
				preview_image = "media/image_missing.jpg";
				item_name = "Unknown";
				item_price = 0;
				rental_frequency = "";
				break;
		}

		item = template.content.cloneNode(true);

		item.querySelector(".cart-item").dataset.index = i;
		item.querySelector(".cart-item-image").src = preview_image;
		item.querySelector(".cart-item-title").textContent = item_name;
		item.querySelector(".cart-item-quantity").textContent = cart_item[1];
		item.querySelector(".cart-item-duration").textContent = cart_item[2] + " " + rental_frequency;
		item.querySelector(".cart-item-price-per-unit").textContent = item_price + "€";
		item.querySelector(".cart-item-price-total").textContent = cart_item[1] * cart_item[2] * item_price + "€";

		cart_DOM.appendChild(item);
	}
}
function addCartItem(cart_item) { // cart_item is an array [name, quantity, duration] of type [string, int, int]
	var cart = getCartCookieData();
	updateCartCookie(cart.concat([cart_item]));
	updateCartPreview();
}
function deleteCartItem(index) {
	var cart = getCartCookieData();
	cart.splice(index, 1);
	updateCartCookie(cart);
	updateCartPreview();
}
function deleteCart() {
	document.cookie = "cart=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
	updateCartPreview();
}

document.addEventListener("DOMContentLoaded", () => {
	navbar = document.getElementsByClassName("navbar")[0];
	back_to_top = document.getElementById("back-to-top");
	main_content = document.getElementsByClassName("main-content-wrapper")[0];
	cart_DOM = document.getElementById("cart");

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

	cart_DOM.addEventListener("click", event => {
		if (!event.target.matches("button")) return;
		console.log("Registered click !");

		const cart_item = event.target.closest(".cart-item");
		const item_index = parseInt(cart_item.dataset.index);
		var cart = getCartCookieData();

		if (event.target.classList.contains("cart-item-quantity-increase")) {
			cart[item_index][1]++;
		}
		if (event.target.classList.contains("cart-item-quantity-decrease")) {
			if (cart[item_index][1] > 1) {
				cart[item_index][1]--;
			}
			else {
				const popup_container = document.createElement("div");
				popup_container.className = "popup-container";

				popup_container.innerHTML = `<div class="popup-content">
												<h2>Remove item ?</h2>
												<p>You have set the quantity of the item to zero, do you wish to remove the item ?</p>
												<div class="popup-response-buttons">
													<button id="popup-remove-button">Remove</button>
													<button id="popup-keep-button">Keep</button>
												</div>
											</div>`;
				document.body.appendChild(popup_container);

				document.getElementById("popup-remove-button").addEventListener("click", () => {
					deleteCartItem(item_index);
					document.querySelector(".popup-container").remove();
				});

				document.getElementById("popup-keep-button").addEventListener("click", () => {
					document.querySelector(".popup-container").remove();
				});

			}
		}
		if (event.target.classList.contains("cart-item-duration-increase")) {
			cart[item_index][2]++;
		}
		if (event.target.classList.contains("cart-item-duration-decrease")) {
			if (cart[item_index][2] > 1) {
				cart[item_index][2]--;
			}
			else {
				const popup_container = document.createElement("div");
				popup_container.className = "popup-container";

				popup_container.innerHTML = `<div class="popup-content">
												<h2>Remove item ?</h2>
												<p>You have set the duration of the item to zero, do you wish to remove the item ?</p>
												<div class="popup-response-buttons">
													<button id="popup-remove-button">Remove</button>
													<button id="popup-keep-button">Keep</button>
												</div>
											</div>`;
				document.body.appendChild(popup_container);

				document.getElementById("popup-remove-button").addEventListener("click", () => {
					deleteCartItem(item_index);
					document.querySelector(".popup-container").remove();
				});

				document.getElementById("popup-keep-button").addEventListener("click", () => {
					document.querySelector(".popup-container").remove();
				});

			}
		}

		updateCartCookie(cart);
		updateCartPreview();
	});

	updateCartPreview();
});
