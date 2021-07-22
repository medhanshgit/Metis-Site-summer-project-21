let navli = document.querySelectorAll('.navbar > ul > li > a');
navli[4].setAttribute("id", "active-link");

gsap.registerPlugin(ScrollTrigger);
// let tl = gsap.timeline();

gsap.to("tbody tr",{
	scrollTrigger: {
		trigger: "tbody>tr",
		start: "top center",
		// end: "bottom center",
		toggleActions: "restart none none reverse",
		// markers: true
	},
	opacity: 1,
	x:0,
	duration: 1
})