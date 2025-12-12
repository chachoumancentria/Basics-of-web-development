/*
 * Authors: Nassim Boudekhani & Joseph Couprie
 * Date: 2025-11-14
 */

var navbar;

var back_to_top;

var hero_section;
var hero_sub_section;
document.addEventListener("DOMContentLoaded", () => {
	navbar = document.getElementsByClassName("navbar")[0];

	back_to_top = document.getElementById("back-to-top");

	main_content = document.getElementsByClassName("main-content-wrapper")[0];

	hero_sub_section = document.getElementById("hero-sub-section");

	main_content.style.paddingTop = navbar.getBoundingClientRect().height + "px";

	document.querySelectorAll(".card").forEach((card) => {
		card.addEventListener("click", (event) => {
			if (event.target.matches("button")) {
				const popup = document.createElement("div");
				popup.className = "popup-container";

				popup.innerHTML = `<div class="popup-content">
										<h2>Item added</h2>
										<p>The item has been added to your cart. You can access your cart by clicking on the button below, or by clicking the cart icon at the top of your screen.</p>
										<div class="popup-response-buttons">
											<button id="popup-see-cart-button">See cart</button>
											<button id="popup-keep-browsing-button">Continue browsing</button>
										</div>
									</div>`;

				document.querySelector("body").appendChild(popup);
				
				document.querySelector("#popup-see-cart-button").addEventListener("click", () => {
					document.location = "order.html";
				});

				document.querySelector("#popup-keep-browsing-button").addEventListener("click", () => {
					document.querySelector(".popup-container").remove();
				});

				return;
			}
			card.classList.toggle("flipped");
		});
	});

	function onScrollInput() {
		//console.log(window.scrollY);
		var divider = window.innerHeight > window.innerWidth ? 45 : 25;
		hero_sub_section.style.backgroundPosition = (window.scrollY + 490) / divider + "% 50%";

		if (window.scrollY < 150) {
			back_to_top.style.bottom = -100 + Math.round(window.scrollY) + "px";
		} else {
			back_to_top.style.bottom = "50px";
		}
	};
	document.addEventListener("scroll", onScrollInput);
	onScrollInput();
});
