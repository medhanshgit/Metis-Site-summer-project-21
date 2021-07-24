let navli = document.querySelectorAll('.navbar > ul > li > a');
navli[1].setAttribute("id", "active-link");

const containers = document.querySelectorAll("#projects > ul > li");
const cards = document.querySelectorAll("#projects > ul > li > .card");

const title = document.querySelectorAll("#projects > ul > li > .card > .card-head");
const content = document.querySelectorAll("#projects > ul > li > .card > .card-content");
const contact = document.querySelectorAll("#projects > ul > li > .card > .contact");

for (let i = 0; i < containers.length; i++) {
	containers[i].addEventListener('mousemove',(e)=>{
		let intensityX = 15;
		let intensityY = 8;
		let xAxis = (containers[i].offsetLeft + cards[i].offsetWidth/2  - e.pageX)/intensityX;
		let yAxis = (containers[i].offsetTop + cards[i].offsetHeight/2 - e.pageY)/intensityY;
		cards[i].style.transform = `rotateY(${-xAxis}deg) rotateX(${yAxis}deg)`
	});	
}

//Animate In
for (let i = 0; i < containers.length; i++) {
	containers[i].addEventListener('mouseenter',()=>{
		cards[i].style.transition = 'none';

		//Popout
		title[i].style.transform = "scale(1.3)";
		content[i].style.transform = "scale(1.15)";
		contact[i].style.transform = "scale(1.07)";
	});
}

//Animate Out
for (let i = 0; i < containers.length; i++) {
	containers[i].addEventListener('mouseleave',()=>{
		cards[i].style.transform = `rotateY(0deg) rotateX(0deg)`;
		cards[i].style.transition = 'all 0.5s ease';

		//Popin
		title[i].style.transform = "scale(1)";
		content[i].style.transform = "scale(1)";
		contact[i].style.transform = "scale(1)";
	});
}