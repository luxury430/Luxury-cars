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