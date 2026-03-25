// Check if current page is FAQ
if (document.body.dataset.page === "faq") {

  // Accordion Toggle
  document.querySelectorAll('.faq-question').forEach(button => {
      button.addEventListener('click', () => {
          const faqItem = button.parentElement;
          faqItem.classList.toggle('active');
      });
  });

  // Simple Search Functionality
  const searchInput = document.getElementById('faqSearch');
  if (searchInput) {
    searchInput.addEventListener('keyup', function() {
        let filter = this.value.toLowerCase();
        let items = document.querySelectorAll('.faq-item');
        
        items.forEach(item => {
            let text = item.innerText.toLowerCase();
            item.style.display = text.includes(filter) ? "block" : "none";
        });
    });
  }

}
// Run only on contact page
if (document.body.dataset.page === "contact") {

  const form = document.getElementById('contactForm');

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      document.body.innerHTML = `
        <div style="height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; font-family: 'Cormorant Garamond', serif;">
          <h1 style="font-size: 3rem; margin-bottom: 20px;">Thank You.</h1>
          <p style="font-family: 'Inter', sans-serif; color: black; max-width: 400px;">
            Your inquiry has been received. Marcus is reviewing your brief and will contact you shortly to discuss the next steps.
          </p>
          <a href="/" style="margin-top: 30px; text-decoration: none; color: black; font-family: 'Inter'; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 2px;">
            Return Home
          </a>
        </div>
      `;
    });
  }

}