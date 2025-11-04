// index.js
// Author: Nassim Boudekhani
// Date: 2025-10-30
// Handles adding new course rows with day marks (✅/❌)

document.addEventListener("DOMContentLoaded", () => {
	const form = document.getElementById("addRowForm");
	const table = document.getElementById("timetable").querySelector("tbody");

	const timeStamp = document.getElementById("timeStamp");
	const nameInput = document.getElementById("fullName");
	const emailInput = document.getElementById("email");
	const phoneInput = document.getElementById("tel");
	const dateInput = document.getElementById("date");

	form.addEventListener("submit", (event) => {
		event.preventDefault();

		// Automatic time stamp
		timeStamp.value = new Date();

		// Full name needs both first name AND last name
		const fullName = nameInput.value.trim();
		if (!fullName) {
			document.getElementById("nameError").innerHTML = "Please enter your name";
			console.error("ERROR: No name was given");
			return;
		}
		if (!fullName.includes(" ")) {
			document.getElementById("nameError").innerHTML = "Please enter your first name, and last name";
			console.error("ERROR: Full name must contain two parts");
			return;
		}
		console.info("INFO: Full name was correctly given");
		document.getElementById("nameError").innerHTML = "";

		// email must have "@" and "."
		const email = emailInput.value.trim();
		if (!email) {
			document.getElementById("emailError").innerHTML = "Please enter your email";
			console.error("ERROR: No email was given");
			return;
		}
		const emailComponents = email.split("@");
		// verify if the email follows the XXX@XXX.XX pattern
		if (!email.includes("@") || !emailComponents[emailComponents.length - 1].includes(".")) {
			document.getElementById("emailError").innerHTML = "Please enter a valid email";
			console.error("ERROR: Full name must contain two parts");
			return;
		}
		console.info("INFO: Email was correctly given");
		document.getElementById("emailError").innerHTML = "";

		// Phone number must be of length 8 < < 15
		const phone = phoneInput.value.trim();
		if (!phone) {
            document.getElementById("telError").innerHTML = "Please enter your phone number";
            console.error("ERROR: No email was given");
            return;
        }
        if (phone.length < 8) {
            document.getElementById("telError").innerHTML = "The phone number is too short";
            console.error("ERROR: Invalid phone number: too short");
            return;
        }
        if (phone.length > 16) {
            document.getElementById("telError").innerHTML = "The phone number is too long";
            console.error("ERROR: Invalid phone number: too long");
            return;
        }
        if (phone.length == 16 && phone[0] != "+") {
            document.getElementById("telError").innerHTML = "The phone number is too long";
            console.error("ERROR: Invalid phone number: too long");
            return;
        }
        console.info("INFO: Phone number was correctly given");
        document.getElementById("telError").innerHTML = "";

        // Date of birth must be between 1900 (125 years old) and 13 years ago (French regulation)
        const birth = dateInput.value;
        if (!birth) {
            document.getElementById("dateError").innerHTML = "Please enter a birth date";
            console.error("ERROR: No birth date was given");
            return;
        }
        const dateComponents = birth.split("-").map((x) => parseInt(x));
        if (dateComponents[0] < 1900) {
            document.getElementById("dateError").innerHTML = "Please enter a real birth date";
            console.error("ERROR: Birth date is not real");
            return;
        }
        if (dateComponents[0] > new Date().getFullYear() - 13) {
            document.getElementById("dateError").innerHTML = "You are too young to use the website";
            console.error("ERROR: User is too young");
            return;
        }
        console.info("INFO: Birth date was correctly given");
        document.getElementById("dateError").innerHTML = "";


		return;





		// Collect checked days into a Set

		// Create new table row
		const row = document.createElement("tr");

		// Course cell
		const nameCell = document.createElement("td");
		nameCell.textContent = courseName;
		row.appendChild(nameCell);

		// Day cells
		dayOrder.forEach((day) => {
			const cell = document.createElement("td");
			cell.textContent = checkedDays.has(day) ? CHECK : CROSS;
			cell.dataset.day = day;
			cell.className = "day-cell";
			row.appendChild(cell);
		});

		table.appendChild(row);

		// Reset form and focus
		form.reset();
		courseInput.focus();
	});
});
