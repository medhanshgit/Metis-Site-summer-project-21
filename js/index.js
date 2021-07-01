function parallaxy(element, distance, speed) {
	let item = document.querySelector(element);

	if (distance < 500){
		item.style.transform = `translateY(${distance * speed}px)`
	}
}
function parallaxx(element, distance, speed) {
	let item = document.querySelector(element);

	item.style.transform = `translateX(${distance * speed}px)`
}

window.addEventListener("scroll", function () {
	// parallaxy('#home', window.scrollY, 1);
	parallaxy('#home-img', window.scrollY, 0.6);
	parallaxy('.title', window.scrollY, 0.4);
	parallaxy('.sub-title', window.scrollY, 0.5);
});


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
			// nav.classList.add("nav-scrolled")
		} else{
			nav.style.background = "transparent";
			// nav.classList.remove("nav-scrolled")
		}
	});
}, sectionOneOptions);

sectionOneObserver.observe(sechome);