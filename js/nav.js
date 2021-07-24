// Changing color of Navbar on scroll
let nav = document.querySelector('.navbar');
let sechome = document.querySelector('#home');

let sectionOneOptions = {
	rootMargin: "-10%"
};
	
const sectionOneObserver = new IntersectionObserver(function (entries, sectionOneObserver) {
	// console.log(window.innerWidth);
	if( window.innerWidth>1000 ){
		entries.forEach(entry =>{
			if(!entry.isIntersecting){
				nav.style.background = "rgba(17, 24, 39, 1)";
			} else{
				nav.style.background = "transparent";
			}
		});
	}
}, sectionOneOptions);
					
sectionOneObserver.observe(sechome);
					
var lastScrollTop = 0;
let navheight = 4.6

window.addEventListener("scroll", function(){
	var st = window.pageYOffset || document.documentElement.scrollTop;
	if (st > lastScrollTop){
		nav.style.transform = `translateY(-${navheight}rem)`;
		nav.style.boxShadow = "unset";
		// console.log("scrollup");
	} else {
		nav.style.transform = `translateY(0)`;
		nav.style.boxShadow = "black 0px -10px 21px 10px";
		// console.log("scrolldown");
	}
	lastScrollTop = st <= 0 ? 0 : st;
}, false);

let toggleButton = document.querySelector('.toggle-button');
let navbarLinks = document.querySelectorAll('.navbar ul li')

toggleButton.addEventListener('click', ()=>{
	navbarLinks.forEach(navlink =>{
		navlink.classList.toggle('active');
	})
});