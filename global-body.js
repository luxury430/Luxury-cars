 function togglePremiumMenu() {
    const nav = document.getElementById('sideNav');
    const btn = document.querySelector('.menu-btn');
    const blur = document.getElementById('menuBlur');

    // Toggle classes
    nav.classList.toggle('active');
    btn.classList.toggle('open');
    blur.classList.toggle('active');

    // Prevent body from scrolling when menu is open
    if(nav.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    }


function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('theme-icon');
    if (!icon) return;

    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    
    if (isLight) {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }

    try {
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    } catch (e) {
        // Leave this empty to remove the "Storage blocked" message from console
    }
}
function toggleMasterMenu() {
    const menu = document.getElementById('master-menu');
    if (!menu) return; // stop if element not found
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}
