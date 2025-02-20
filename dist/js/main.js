// select DOM items
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const menuNav = document.querySelector('.menu-nav');
const menuBranding = document.querySelector('.menu-branding');
const navItems = document.querySelectorAll('.nav-item');
const navDownBtn = document.getElementById('nav-down-btn');
const moveTo = new MoveTo();
let sections;
// const target = document.getElementById('home-about');

// set initial state of menu
let showMenu = false;

menuBtn.addEventListener('click', toggleMenu);

navDownBtn.addEventListener('click', scrollPage);

document.addEventListener("DOMContentLoaded", function(event) { 
  sections = document.getElementsByTagName('section');
});

window.onscroll = checkPosition;

function checkPosition(e){
  if(sections[sections.length - 1].getBoundingClientRect().top <= 40){
    navDownBtn.classList.add('isUpBtn');
  } else {
    navDownBtn.classList.remove('isUpBtn');
  }
}

function toggleMenu(){
  menuBtn.classList.toggle('close'); 
  menu.classList.toggle('show'); 
  menuNav.classList.toggle('show'); menuBranding.classList.toggle('show'); 
  navItems.forEach(item => item.classList.toggle('show')); showMenu = !showMenu;
}

function scrollPage() {
  if(navDownBtn.classList.contains('isUpBtn')){
    moveTo.move(document.getElementById('home'));
    return;
  }
  let target;
  // loop thru sections 
  for(var i = 0; i < sections.length; i++){
    // if section is below the top, set it as the target
    if (sections[i].getBoundingClientRect().top > 0){
      target = sections[i];
      break;
    }
  }
  moveTo.move(target);
  
}


new Glider(document.querySelector('.glider'), {
  slidesToShow: 1,
  // itemWidth: ,
  dots: '#dots',
  draggable: false,
  arrows: {
    prev: '.glider-prev',
    next: '.glider-next'
  },
  // Glider.js breakpoints are mobile-first
  responsive: [
    // tablet
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
     // Desktop
     {
      breakpoint: 915,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    },
  ]
});
