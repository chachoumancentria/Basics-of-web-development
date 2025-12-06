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
var cart_DOM;

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
			case "haloween":
				preview_image = "media/halloween_blahaj.png";
				item_name = "Halloween Blåhaj";
				item_price = 27;
				rental_frequency = "week" + (cart_item[2] > 1 ? "s" : "");
				break;
			case "christmas":
				preview_image = "media/christmas_blahaj.png";
				item_name = "Christmas Blåhaj";
				item_price = 32;
				rental_frequency = "week" + (cart_item[2] > 1 ? "s" : "");
				break;
			case "valentine":
				preview_image = "media/valentine_blahaj.png";
				item_name = "Valentine Blåhaj";
				item_price = 7;
				rental_frequency = "day" + (cart_item[2] > 1 ? "s" : "");
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

document.addEventListener("DOMContentLoaded", () => {
	navbar = document.getElementsByClassName("navbar")[0];
	main_content = document.getElementsByClassName("main-content-wrapper")[0];
	cart_DOM = document.getElementById("cart");

	main_content.style.paddingTop = navbar.getBoundingClientRect().height + "px";


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
		if (event.target.classList.contains("cart-item-delete-button")) {
			cart.splice(item_index, 1);
		}

		updateCartCookie(cart);
		updateCartPreview();
	});

	updateCartPreview();





	const form = document.getElementById("client-details");

	// Personal information
	const timeStamp = document.getElementById("timeStamp");
	const nameInput = document.getElementById("fullName");
	const emailInput = document.getElementById("email");
	const phoneInput = document.getElementById("tel");
	const termsAccepted = document.getElementById("terms");
	const newsAccepted = document.getElementById("newsletter"); //

	// Delivery information
	const streetInput = document.getElementById("street-name");
	const cityInput = document.getElementById("city");
	const postalCodeInput = document.getElementById("postal-code");
	const countryInput = document.getElementById("country");

	// Special request
	const requestInput = document.getElementById("wishes");

	// Payment information
	const cardNameInput = document.getElementById("card-name");
	const cardNumberInput = document.getElementById("card-number");
	const expiryDateInput = document.getElementById("card-expiry");
	const cvcInput = document.getElementById("card-cvc");


	function initTimestamp() {
		const now = new Date();
		timeStamp.value = now.toISOString();
	}

	function checkNameInput() {
		const fullName = nameInput.value.trim();
		if (!fullName) {
			document.getElementById("nameError").innerHTML = "Please enter your name";
			console.warn("WARNING: No name was given");
			nameInput.focus();
			return false;
		}
		if (!fullName.includes(" ")) {
			document.getElementById("nameError").innerHTML = "Please enter your first name, and last name";
			console.warn("WARNING: Full name must contain two parts");
			nameInput.focus();
			return false;
		}
		if (fullName.split(" ")[0].length < 2) {
			document.getElementById("nameError").innerHTML = "Your first name should be more than 2 letters";
			console.warn("WARNING: First name should be more than 2 letters");
			nameInput.focus();
			return false;
		}
		if (fullName.split(" ")[fullName.split(" ").length - 1].length < 2) {
			document.getElementById("nameError").innerHTML = "Your last name should be more than 2 letters";
			console.warn("WARNING: Last name should be more than 2 letters");
			nameInput.focus();
			return false;
		}
		console.info("INFO: Full name was correctly given");
		document.getElementById("nameError").innerHTML = "";
		return true;
	}

	function checkEmailInput() {
		const email = emailInput.value.trim();
		if (!email) {
			document.getElementById("emailError").innerHTML = "Please enter your email";
			console.warn("WARNING: No email was given");
			emailInput.focus();
			return false;
		}
		const emailComponents = email.split("@");
		if (!email.includes("@") || !emailComponents[emailComponents.length - 1].includes(".")) {
			document.getElementById("emailError").innerHTML = "Please enter a valid email";
			console.warn("WARNING: Full name must contain two parts");
			emailInput.focus();
			return false;
		}
		console.info("INFO: Email was correctly given");
		document.getElementById("emailError").innerHTML = "";
		return true;
	}

	function checkPhoneInput() {
		const phone = phoneInput.value.trim();
		if (!phone) {
			document.getElementById("telError").innerHTML = "Please enter your phone number";
			console.warn("WARNING: No phone number was given");
			phoneInput.focus();
			return false;
		}
		if (phone.length < 8) {
			document.getElementById("telError").innerHTML = "The phone number is too short";
			console.warn("WARNING: Invalid phone number: too short");
			phoneInput.focus();
			return false;
		}
		if (phone.length > 16) {
			document.getElementById("telError").innerHTML = "The phone number is too long";
			console.warn("WARNING: Invalid phone number: too long");
			phoneInput.focus();
			return false;
		}
		if (phone.length == 16 && phone[0] != "+") {
			document.getElementById("telError").innerHTML = "The phone number is too long";
			console.warn("WARNING: Invalid phone number: too long");
			phoneInput.focus();
			return false;
		}
		console.info("INFO: Phone number was correctly given");
		document.getElementById("telError").innerHTML = "";
		return true;
	}

	function checkTermsInput() {
		if (!termsAccepted.checked) {
			document.getElementById("termsError").innerHTML = "Please accept the Terms of Service";
			console.warn("WARNING: Terms of Service must be accepted");
			return false;
		}
		document.getElementById("termsError").innerHTML = "";
		return true;
	}

	function checkStreetInput() { // add num check
		const street = streetInput.value.trim();
		if (!street) {
			document.getElementById("streetError").innerHTML = "Please enter a street address";
			console.warn("WARNING: No street address given");
			streetInput.focus();
			return false;
		}
		if (parseInt(street) == null) {
			document.getElementById("streetError").innerHTML = "Street address must contain a number";
			console.warn("WARNING: Street address must contain a number");
			streetInput.focus();
			return false;
		}
		if (street.length < 3) {
			document.getElementById("streetError").innerHTML = "Street address is too short";
			console.warn("WARNING: Street address too short");
			streetInput.focus();
			return false;
		}
		document.getElementById("streetError").innerHTML = "";
		return true;
	}

	function checkCityInput() {
		const city = cityInput.value.trim();
		if (!city) {
			document.getElementById("cityError").innerHTML = "Please enter a city";
			console.warn("WARNING: No city given");
			cityInput.focus();
			return false;
		}
		if (city.length < 2) {
			document.getElementById("cityError").innerHTML = "City name is too short";
			console.warn("WARNING: City name too short");
			cityInput.focus();
			return false;
		}
		document.getElementById("cityError").innerHTML = "";
		return true;
	}

	function checkPostalCodeInput() {
		const pc = postalCodeInput.value.trim();
		if (!pc) {
			document.getElementById("postalError").innerHTML = "Please enter a postal code";
			console.warn("WARNING: No postal code given");
			postalCodeInput.focus();
			return false;
		}
		if (pc.length < 3 || pc.length > 10) {
			document.getElementById("postalError").innerHTML = "Postal code length seems invalid";
			console.warn("WARNING: Postal code length invalid");
			postalCodeInput.focus();
			return false;
		}
		document.getElementById("postalError").innerHTML = "";
		return true;
	}

	function checkCountryInput() {
		const country = countryInput.value.trim();
		if (!country) {
			document.getElementById("countryError").innerHTML = "Please enter a country";
			console.warn("WARNING: No country given");
			countryInput.focus();
			return false;
		}
		document.getElementById("countryError").innerHTML = "";
		return true;
	}

	function checkRequestInput() {
		const req = requestInput.value.trim();
		if (!req) {
			document.getElementById("wishesError").innerHTML = "";
			return true;
		}
		if (req.length > 500) {
			document.getElementById("wishesError").innerHTML = "Request is too long (max 500 chars)";
			console.warn("WARNING: Special request too long");
			requestInput.focus();
			return false;
		}
		document.getElementById("wishesError").innerHTML = "";
		return true;
	}

	function checkCardNameInput() {
		const cardName = cardNameInput.value.trim();
		if (!cardName) {
			document.getElementById("cardNameError").innerHTML = "Please the card holder's name";
			console.warn("WARNING: No name was given");
			cardNameInput.focus();
			return false;
		}
		if (!cardName.includes(" ")) {
			document.getElementById("cardNameError").innerHTML = "Please enter first name, and last name";
			console.warn("WARNING: Card name must contain two parts");
			cardNameInput.focus();
			return false;
		}
		if (cardName.split(" ")[0].length < 2) {
			document.getElementById("cardNameError").innerHTML = "First name should be more than 2 letters";
			console.warn("WARNING: First name should be more than 2 letters");
			cardNameInput.focus();
			return false;
		}
		if (cardName.split(" ")[cardName.split(" ").length - 1].length < 2) {
			document.getElementById("cardNameError").innerHTML = "Last name should be more than 2 letters";
			console.warn("WARNING: Last name should be more than 2 letters");
			cardNameInput.focus();
			return false;
		}
		console.info("INFO: Full name was correctly given");
		document.getElementById("cardNameError").innerHTML = "";
		return true;
	}

	function checkCardNumberInput() {
		const num = cardNumberInput.value.trim();
		if (!num) {
			document.getElementById("cardNumberError").innerHTML = "Please enter the card number";
			console.warn("WARNING: No card number given");
			cardNumberInput.focus();
			return false;
		}
		if (num.length < 8 || num.length > 19) {
			document.getElementById("cardNumberError").innerHTML = "Invalid card number length";
			console.warn("WARNING: Card number with invalid length");
			cardNumberInput.focus();
			return false;
		}
		document.getElementById("cardNumberError").innerHTML = "";
		return true;
	}

	function checkExpiryDateInput() {
		const expiry = expiryDateInput.value.trim();
		if (!expiry) {
			document.getElementById("cardExpiryError").innerHTML = "Please enter an expiry date";
			console.warn("WARNING: No expiry date was given");
			expiryDateInput.focus();
			return false;
		}

		const parts = expiry.split("-").map(x => parseInt(x));
		const currentDate = new Date();
		const expiryDate = new Date(parts[0], parts[1]);

		if (expiryDate < currentDate) {
			document.getElementById("cardExpiryError").innerHTML = "Your card is expired";
			console.warn("WARNING: Card is expired");
			expiryDateInput.focus();
			return false;
		}

		document.getElementById("cardExpiryError").innerHTML = "";
		console.info("INFO: expiry date is valid");
		return true;
	}

	function checkCvcInput() {
		const cvc = cvcInput.value.trim();
		if (!cvc) {
			document.getElementById("cardCVCError").innerHTML = "Please enter CVC";
			console.warn("WARNING: No CVC given");
			cvcInput.focus();
			return false;
		}
		if (cvc.length < 3 || cvc.length > 4) {
			document.getElementById("cardCVCError").innerHTML = "CVC must be 3 or 4 digits";
			console.warn("WARNING: Invalid CVC");
			cvcInput.focus();
			return false;
		}
		document.getElementById("cardCVCError").innerHTML = "";
		return true;
	}

	function checkNewsletterInput() {
		// optional: no error, but log choice
		if (newsAccepted.checked) {
			console.info("INFO: User subscribed to newsletter");
		}
		return true;
	}

	nameInput.addEventListener("input", checkNameInput);
	emailInput.addEventListener("input", checkEmailInput);
	phoneInput.addEventListener("input", checkPhoneInput);
	termsAccepted.addEventListener("click", checkTermsInput);

	streetInput.addEventListener("input", checkStreetInput);
	cityInput.addEventListener("input", checkCityInput);
	postalCodeInput.addEventListener("input", checkPostalCodeInput);
	countryInput.addEventListener("input", checkCountryInput);

	requestInput.addEventListener("input", checkRequestInput);

	cardNameInput.addEventListener("input", checkCardNameInput);
	cardNumberInput.addEventListener("input", checkCardNumberInput);
	expiryDateInput.addEventListener("input", checkExpiryDateInput);
	cvcInput.addEventListener("input", checkCvcInput);

	newsAccepted.addEventListener("change", checkNewsletterInput);


	// remove unwanted characters from the tel input
	phoneInput.addEventListener("input", () => {
		const filteredPhoneNumber = phoneInput.value.replace(/[^+0-9]/g, "");
		phoneInput.value = filteredPhoneNumber;
	});

	// add for card number + expiry date




	form.addEventListener("submit", () => {
		const cartInput = document.getElementById("cart-input");

		var cookies = document.cookie.split("; ")

		for (let i = 0; i < cookies.length; i++) {
			if (cookies[i].startsWith("cart=")) {
				cartInput.value = cookies[i].split("=")[1];
				break;
			}
		}
	});
});