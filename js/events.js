let navli = document.querySelectorAll('.navbar > ul > li > a');
navli[5].setAttribute("id", "active-link");

const cont1 = document.querySelectorAll("#ongoing > .content-list > .content-div");
const cont2 = document.querySelectorAll("#upcoming > .content-list > .content-div");
const namelist1 = document.querySelectorAll("#event > #ongoing > .list > ul > li");
const namelist2 = document.querySelectorAll("#event > #upcoming > .list > ul > li");
console.log(cont1);
console.log(cont2);
cont1[0].style.display = "flex";
cont2[0].style.display = "flex";

for (let i = 0; i < namelist1.length; i++) {
	const item = namelist1[i];
	item.addEventListener("mousedown",()=>{
		cont1.forEach((elem)=>{
			elem.style.display = "none";
		});
		cont1[i].style.display = "flex";
	});
}

for (let j = 0; j < namelist2.length; j++) {
	const item = namelist2[j];
	item.addEventListener("mousedown",()=>{
		cont2.forEach((elem)=>{
			elem.style.display = "none";
		});
		cont2[j].style.display = "flex";
	});
}
