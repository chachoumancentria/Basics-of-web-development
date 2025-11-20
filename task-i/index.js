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

	hero_section = document.getElementById("hero-section");
	hero_sub_section = document.getElementById("hero-sub-section");


	main_content.style.paddingTop = navbar.getBoundingClientRect().height +"px";



	document.querySelectorAll(".card").forEach((card) => {
		card.addEventListener("click", () => {
			card.classList.toggle("flipped");
		});
	});
	document.addEventListener("scroll", () => {
		//console.log(window.scrollY);
		hero_section.style.backgroundPosition = 100-window.scrollY/5 + "% 50%";
		var divider = (window.innerHeight > window.innerWidth)? 45 : 25;
		hero_sub_section.style.backgroundPosition = 100-(window.scrollY+475)/divider + "% 50%";

		if (window.scrollY < 150) {
			back_to_top.style.bottom = -100+Math.round(window.scrollY) + "px";
		} else {
			back_to_top.style.bottom = "50px";
		}
	});
});

