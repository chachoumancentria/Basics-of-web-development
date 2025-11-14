/*
 * Authors: Nassim Boudekhani & Joseph Couprie
 * Date: 2025-11-14
 */

var hero_section;
var hero_sub_section;
document.addEventListener("DOMContentLoaded", () => {
	hero_section = document.getElementById("hero-section");
	hero_sub_section = document.getElementById("hero-sub-section");
});
document.addEventListener("scroll", () => {
	//console.log(window.scrollY);
	hero_section.style.backgroundPosition = 100-window.scrollY/5 + "% 50%";
	hero_sub_section.style.backgroundPosition = 100-window.scrollY/12 + "% 50%";
});