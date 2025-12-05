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
					updateCartPreview();
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
				popup_contaisner.className = "popup-container";

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
					updateCartPreview();
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

	onScrollInput();
	updateCartPreview();
});
