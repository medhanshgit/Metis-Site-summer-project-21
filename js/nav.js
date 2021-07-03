// Changing color of Navbar on scroll
let nav = document.querySelector('.navbar');
let sechome = document.querySelector('#home');

let sectionOneOptions = {
	rootMargin: "-10%"
};

const sectionOneObserver = new IntersectionObserver(function (entries, sectionOneObserver) {

	entries.forEach(entry =>{
		if(!entry.isIntersecting){
			nav.style.background = "#272727";
		} else{
			nav.style.background = "transparent";
		}
	});
}, sectionOneOptions);

sectionOneObserver.observe(sechome);