const allowedPages = ["paris", "london", "dubai", "shanghai", "new-york", "home", "exclusive"];

// Get current page from body
const currentPage = document.body.dataset.page;

// Only run the code if current page is in allowedPages
if (allowedPages.includes(currentPage)){ 
            function moveSlide(step, btn){
const frame = btn.closest(".slider-frame");
const slides = frame.querySelector(".slides");
const images = frame.querySelectorAll(".slides img");
let index = slides.dataset.index ? parseInt(slides.dataset.index) : 0;
index += step;
if(index < 0){
index = images.length - 1;
}
if(index >= images.length){
index = 0;
}
slides.style.transform = "translateX(" + (-index * 100) + "%)";
slides.dataset.index = index;
}
  function moveSmooth(btn, direction) {
  const viewport = btn.closest('.luxury-viewport');
  const wrapper = viewport.querySelector('.luxury-wrapper');
  const slides = viewport.querySelectorAll('.lux-slide');
  const totalSlides = slides.length;

  let currentIndex = parseInt(wrapper.getAttribute('data-index')) || 0;

  currentIndex += direction;

  if (currentIndex >= totalSlides) {
    currentIndex = 0;
  } else if (currentIndex < 0) {
    currentIndex = totalSlides - 1;
  }

  const percentageToMove = currentIndex * -100;
  wrapper.style.transform = `translateX(${percentageToMove}%)`;
  wrapper.setAttribute('data-index', currentIndex);
}

/* OPTIONAL: Automatic Slide Feature (Every 5 seconds) */
/* setInterval(() => {
  document.querySelectorAll('.lux-next').forEach(button => button.click());
}, 5000); 
*/
document.addEventListener("scroll", function(){

let reveals = document.querySelectorAll(".reveal");

for(let i = 0; i < reveals.length; i++){

let windowHeight = window.innerHeight;
let elementTop = reveals[i].getBoundingClientRect().top;
let elementVisible = 100;

if(elementTop < windowHeight - elementVisible){
reveals[i].classList.add("active");
}

}

});

window.addEventListener("load",()=>{
document.body.classList.add("loaded");
});
  
  const toggles = document.querySelectorAll(".brief-toggle");

toggles.forEach(toggle => {
  toggle.addEventListener("click", () => {
    
    const content = toggle.nextElementSibling;
    const arrow = toggle.querySelector(".arrow");

    if(content.style.height && content.style.height !== "0px"){
      content.style.height = "0px";
      arrow.style.transform = "rotate(0deg)";
    } else {
      content.style.height = content.scrollHeight + "px";
      arrow.style.transform = "rotate(180deg)";
    }

  });
});
const sliders = document.querySelectorAll(".luxury-wrapper");

sliders.forEach(wrapper => {

const viewport = wrapper.closest(".luxury-viewport");

const dotsContainer = viewport.querySelector(".lux-dots");

const progress = viewport.querySelector(".lux-progress-bar");

const counterCurrent = viewport.querySelector(".current");

const counterTotal = viewport.querySelector(".total");

const slides = wrapper.children;

const total = slides.length;

/* set total counter */

if(counterTotal){
counterTotal.textContent = String(total).padStart(2,'0');
}

/* create dots */

if(dotsContainer){

for(let i = 0; i < total; i++){

let dot = document.createElement("div");

dot.className = "lux-dot";

dot.onclick = () => goToSlide(i, wrapper);

if(dotsContainer){
dotsContainer.appendChild(dot);
}

}

}
updateUI(wrapper);

});


function moveSmooth(btn, dir){

const viewport = btn.closest(".luxury-viewport");

const wrapper = viewport.querySelector(".luxury-wrapper");

let index = parseInt(wrapper.dataset.index) || 0;

const total = wrapper.children.length;

index += dir;

if(index < 0) index = total - 1;

if(index >= total) index = 0;

wrapper.dataset.index = index;

wrapper.style.transform = `translateX(-${index * 100}%)`;

updateUI(wrapper);

}


function goToSlide(i, wrapper){

wrapper.dataset.index = i;

wrapper.style.transform = `translateX(-${i * 100}%)`;

updateUI(wrapper);

}


function updateUI(wrapper){

const viewport = wrapper.closest(".luxury-viewport");

const dots = viewport.querySelectorAll(".lux-dot");

const progress = viewport.querySelector(".lux-progress-bar");

const counterCurrent = viewport.querySelector(".current");

let index = parseInt(wrapper.dataset.index) || 0;

/* update dots */

dots.forEach(d => d.classList.remove("active"));

if(dots[index]) dots[index].classList.add("active");

/* update counter */

if(counterCurrent){
counterCurrent.textContent = String(index + 1).padStart(2,'0');
}

/* update progress bar */

if(progress){
progress.style.width = ((index + 1) / dots.length) * 100 + "%";
}

}
function toggleJungle(element) {
    // Finds the parent wrapper of the clicked header
    const parent = element.parentElement;
    
    // Toggles the 'active' class on that specific parent
    parent.classList.toggle('active');
}
function toggleBrief(btn) {
    const wrapper = btn.parentElement;
    wrapper.classList.toggle('active');
    
    // Smooth arrow rotation
    const arrow = btn.querySelector('.arrow');
    arrow.style.transform = wrapper.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
}
const keyToggles = document.querySelectorAll(".key-toggle");

keyToggles.forEach(toggle => {
  toggle.addEventListener("click", () => {

    const content = toggle.nextElementSibling;
    const arrow = toggle.querySelector(".arrow-2");

    if (content.style.height && content.style.height !== "0px") {
      content.style.height = "0px";
      arrow.style.transform = "rotate(0deg)";
    } else {
      content.style.height = content.scrollHeight + "px";
      arrow.style.transform = "rotate(180deg)";
    }

  });
});
// Move slider & lazy load adjacent slides
function moveSlide(step, btn) {
  const frame = btn.closest(".slider-frame");
  const slides = frame.querySelector(".slides");
  const images = slides.querySelectorAll("img");

  let index = slides.dataset.index ? parseInt(slides.dataset.index) : 0;
  index += step;

  if (index < 0) index = images.length - 1;
  if (index >= images.length) index = 0;

  slides.style.transform = "translateX(" + (-index * 100) + "%)";
  slides.dataset.index = index;

  // Lazy-load current slide
  [index, (index + 1) % images.length, (index - 1 + images.length) % images.length].forEach(i => {
    const img = images[i];
    if (img.classList.contains("lazy")) {
      img.src = img.dataset.src;
      img.classList.remove("lazy");
    }
  });
}

// Lazy-load images with IntersectionObserver
document.addEventListener("DOMContentLoaded", function() {
  const lazyImages = document.querySelectorAll("img.lazy");

  const lazyLoad = (img) => {
    img.src = img.dataset.src;
    img.classList.remove("lazy");
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          lazyLoad(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "100px" });

    lazyImages.forEach(img => observer.observe(img));
  } else {
    lazyImages.forEach(img => lazyLoad(img));
  }
});
}

const lazyImages = document.querySelectorAll(".lazy-img");

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const img = entry.target;

      img.src = img.dataset.src;

      img.onload = () => {
        img.classList.add("loaded");
      };

      obs.unobserve(img);
    }
  });
});

lazyImages.forEach(img => observer.observe(img));

window.addEventListener('load', () => {
    const loader = document.getElementById('lux-loader');
    loader.style.opacity = '0';
    loader.style.transition = 'opacity 0.8s ease';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
});