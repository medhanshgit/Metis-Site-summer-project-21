let navli = document.querySelectorAll('.navbar > ul > li > a');
navli[0].setAttribute("id", "active-link");

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

let body = document.querySelector("body");
let home = document.querySelector("#home");
let whatsec = document.querySelector("#what");
let cursor = document.querySelector(".cursor");
cursor.style.transform = "scale(0)";

whatsec.addEventListener("mouseenter",(e)=>{
	// console.log("mouseenter");
	whatsec.addEventListener("mousemove",(e)=>{
		body.style.cursor = "none";
		let x = e.pageX;
		let y = e.pageY-home.offsetHeight;
		// cursor.classList.add(".cursor-active")
		cursor.style.transform = "scale(1.3) translate(-50%,-50%)";
		cursor.style.top = y + 'px';
		cursor.style.left = x + 'px';
		// console.log(x,y);
		
		
	});
});

whatsec.addEventListener("mouseleave",(e)=>{
	cursor.style.transform = "scale(0)";
	// console.log("mouse left");
	body.style.cursor = "auto";

});