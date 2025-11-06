// index.js
// Author: Nassim Boudekhani
// Date: 2025-11-04

document.addEventListener("DOMContentLoaded", () => {
	const form = document.getElementById("addRowForm");
	const table = document.getElementById("timetable").querySelector("tbody");

	const timeStamp = document.getElementById("timeStamp");
	const nameInput = document.getElementById("fullName");
	const emailInput = document.getElementById("email");
	const phoneInput = document.getElementById("tel");
	const dateInput = document.getElementById("date");

	function checkNameInput() {
		const fullName = nameInput.value.trim();
		if (!fullName) {
			document.getElementById("nameError").innerHTML = "Please enter your name";
			console.warn("WARNING: No name was given");
			return;
		}
		if (!fullName.includes(" ")) {
			document.getElementById("nameError").innerHTML = "Please enter your first name, and last name";
			console.warn("WARNING: Full name must contain two parts");
			return;
		}
		if (fullName.split(" ")[0].length < 2) {
			document.getElementById("nameError").innerHTML = "Your first name should be more than 2 letters";
			console.warn("WARNING: First name should be more than 2 letters");
			return;
		}
		if (fullName.split(" ")[fullName.split(" ").length - 1].length < 2) {
			document.getElementById("nameError").innerHTML = "Your last name should be more than 2 letters";
			console.warn("WARNING: Last name should be more than 2 letters");
			return;
		}
		console.info("INFO: Full name was correctly given");
		document.getElementById("nameError").innerHTML = "";
	}

	function checkEmailInput() {
		const email = emailInput.value.trim();
		if (!email) {
			document.getElementById("emailError").innerHTML = "Please enter your email";
			console.warn("WARNING: No email was given");
			return;
		}
		const emailComponents = email.split("@");
		// verify if the email follows the XXX@XXX.XX pattern
		if (!email.includes("@") || !emailComponents[emailComponents.length - 1].includes(".")) {
			document.getElementById("emailError").innerHTML = "Please enter a valid email";
			console.warn("WARNING: Full name must contain two parts");
			return;
		}
		console.info("INFO: Email was correctly given");
		document.getElementById("emailError").innerHTML = "";
	}

	function checkPhoneInput() {
		const phone = phoneInput.value.trim();
		if (!phone) {
			document.getElementById("telError").innerHTML = "Please enter your phone number";
			console.warn("WARNING: No email was given");
			return;
		}
		if (phone.length < 8) {
			document.getElementById("telError").innerHTML = "The phone number is too short";
			console.warn("WARNING: Invalid phone number: too short");
			return;
		}
		if (phone.length > 16) {
			document.getElementById("telError").innerHTML = "The phone number is too long";
			console.warn("WARNING: Invalid phone number: too long");
			return;
		}
		if (phone.length == 16 && phone[0] != "+") {
			document.getElementById("telError").innerHTML = "The phone number is too long";
			console.warn("WARNING: Invalid phone number: too long");
			return;
		}
		console.info("INFO: Phone number was correctly given");
		document.getElementById("telError").innerHTML = "";
	}

	function checkDateInput() {
		const birth = dateInput.value;
		if (!birth) {
			document.getElementById("dateError").innerHTML = "Please enter a birth date";
			console.warn("WARNING: No birth date was given");
			return;
		}
		const dateComponents = birth.split("-").map((x) => parseInt(x));
		if (dateComponents[0] < 1900) {
			document.getElementById("dateError").innerHTML = "Please enter a real birth date";
			console.warn("WARNING: Birth date is not real");
			return;
		}
		if (dateComponents[0] > new Date().getFullYear() - 13) {
			document.getElementById("dateError").innerHTML = "You are too young to use the website";
			console.warn("WARNING: User is too young");
			return;
		}
		console.info("INFO: Birth date was correctly given");
		document.getElementById("dateError").innerHTML = "";
	}

	// Verify the input on each modification
	nameInput.addEventListener("input", checkNameInput);
	emailInput.addEventListener("input", checkEmailInput);
	phoneInput.addEventListener("input", checkPhoneInput);
	dateInput.addEventListener("input", checkDateInput);

	form.addEventListener("submit", (event) => {
		event.preventDefault();

		// Automatic time stamp
		const timeStamp = new Date();

		// Full name needs both first name AND last name
		checkNameInput();

		// email must have "@" and "."
		checkEmailInput();

		// Phone number must be of length 8 < < 15
		checkPhoneInput();

		// Date of birth must be between 1900 (125 years old) and 13 years ago (French regulation)
		checkDateInput();

		// Append the Data to new row
		const row = document.createElement("tr");

		const nameCell = document.createElement("td");
		nameCell.textContent = fullName;
		row.appendChild(nameCell);

		const emailCell = document.createElement("td");
		emailCell.textContent = email;
		row.appendChild(emailCell);

		const telCell = document.createElement("td");
		telCell.textContent = phone;
		row.appendChild(telCell);

		const birthdateCell = document.createElement("td");
		birthdateCell.textContent = birth;
		row.appendChild(birthdateCell);

		const timeStampCell = document.createElement("td");
		timeStampCell.textContent = timeStamp.toGMTString();
		row.appendChild(timeStampCell);

		table.appendChild(row);

		// Reset form and focus

		// form.reset();
		nameInput.focus();
	});
});
