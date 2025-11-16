/*
 * Authors: Nassim Boudekhani & Joseph Couprie
 * Date: 2025-11-14
 */

var hero_section;
var hero_sub_section;
document.addEventListener("DOMContentLoaded", () => {
	hero_section = document.getElementById("hero-section");
	hero_sub_section = document.getElementById("hero-sub-section");

	document.querySelectorAll(".card").forEach((card) => {
		card.addEventListener("click", () => {
			card.classList.toggle("flipped");
		});
	});
	document.addEventListener("scroll", () => {
		//console.log(window.scrollY);
		hero_section.style.backgroundPosition = 100 - window.scrollY / 5 + "% 50%";
		var divider = window.innerHeight > window.innerWidth ? 45 : 25;
		hero_sub_section.style.backgroundPosition = 100 - (window.scrollY + 385) / divider + "% 50%";
	});
});
