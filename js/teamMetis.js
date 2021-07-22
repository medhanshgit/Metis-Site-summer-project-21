let navli = document.querySelectorAll('.navbar > ul > li > a');
navli[2].setAttribute("id", "active-link");

let tl = gsap.timeline({repeat: -1, yoyo:"true"});

tl.to("#circle1, #circle2, #circle3", {y: 20, duration: 1, ease:"power1.inOut()",stagger: 0.1});
// tl.to("#circle1, #circle2, #circle3", {y: 0, duration: 1, ease:"power1.inOut()",stagger: 0.1});

let tl2 = gsap.timeline({repeat: -1, yoyo: "true"});

tl2.to("svg", {y: 4, duration: 0.5,ease:"power1.inOut()"});
// tl2.to("svg", {y: 0, duration: 0.5,ease:"power1.inOut()"});