/* =========================================================
   Portfolio JavaScript
   1. AOS   2. Navbar on scroll   3. Typing effect
   4. Back-to-top   5. Contact form validation   6. Footer year
   ========================================================= */

// 1. Start AOS (Animate On Scroll). "once" means each element animates only the first time.
AOS.init({ duration: 700, once: true, offset: 80 });

// Grab elements we need
const navbar = document.getElementById('mainNav');
const toTop  = document.getElementById('toTop');

// 2 & 4. One scroll listener: darken navbar and show back-to-top button after scrolling
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  toTop.classList.toggle('show', window.scrollY > 400);
});
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Close the mobile menu after a link is tapped
document.querySelectorAll('#navMenu .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const menu = document.getElementById('navMenu');
    if (menu.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(menu).hide();
  });
});

// 3. Typing effect: types a role, pauses, deletes it, then moves to the next
const roles = ['MCA Student', 'Web Developer', 'Problem Solver', 'Software Developer'];  // edit these
const typedEl = document.getElementById('typed-role');
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const current = roles[roleIndex];
  typedEl.textContent = current.substring(0, charIndex);

  if (!deleting && charIndex < current.length) { charIndex++; setTimeout(typeLoop, 90); }
  else if (!deleting)                          { deleting = true; setTimeout(typeLoop, 1500); }
  else if (charIndex > 0)                      { charIndex--; setTimeout(typeLoop, 50); }
  else { deleting = false; roleIndex = (roleIndex + 1) % roles.length; setTimeout(typeLoop, 300); }
}
typeLoop();

// 5. Contact form: validate with Bootstrap's built-in styles.
// NOTE: this has no backend. To receive real messages, connect a service such as Formspree or EmailJS.
const form   = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', (event) => {
  event.preventDefault();                        // stop the page from reloading
  status.textContent = '';

  if (!form.checkValidity()) {                   // uses the "required" and type="email" rules
    form.classList.add('was-validated');         // shows red messages under invalid fields
    return;
  }
  status.textContent = 'Thanks! Your message is ready to send once a form service is connected.';
  form.reset();
  form.classList.remove('was-validated');
});

// 6. Footer year updates itself
document.getElementById('year').textContent = new Date().getFullYear();
