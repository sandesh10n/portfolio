document.addEventListener('DOMContentLoaded', () => {
  const menu = document.getElementById('menu');
  const menuBtn = document.getElementById('menuBtn');

  function toggleMenu() {
    const open = menu.classList.toggle('show');
    menuBtn.setAttribute('aria-expanded', open);
  }

  menuBtn.addEventListener('click', toggleMenu);

  // Close when clicking outside (mobile menu open)
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !menuBtn.contains(e.target) && menu.classList.contains('show')) {
      menu.classList.remove('show');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Remove mobile menu when resizing to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && menu.classList.contains('show')) {
      menu.classList.remove('show');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Contact form handler
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);

      // Replace the endpoint below with your Formspree endpoint or other form endpoint.
      // Example: https://formspree.io/f/your_form_id
      const endpoint = 'https://formspree.io/f/YOUR_FORM_ID';

      fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      })
      .then(res => {
        if (res.ok) {
          alert('Message sent — thanks! I will respond soon.');
          form.reset();
        } else {
          res.json().then(json => {
            alert(json && json.error ? json.error : 'Sorry, there was a problem sending your message.');
          }).catch(() => {
            alert('Sorry, there was a problem sending your message.');
          });
        }
      })
      .catch(() => alert('Network error. Please try again later.'));
    });
  }
});