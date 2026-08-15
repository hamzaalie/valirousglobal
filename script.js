document.getElementById('year').textContent = new Date().getFullYear();

/* Header scroll state */
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 12);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* Mobile nav */
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');
navToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});
mainNav.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') mainNav.classList.remove('open');
});

/* Reveal on scroll */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach((el) => io.observe(el));

/* Count-up stats */
const statEls = document.querySelectorAll('[data-count]');
const animateCount = (el) => {
  const target = parseInt(el.getAttribute('data-count'), 10);
  const duration = 1400;
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};
const statsIo = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      statEls.forEach(animateCount);
      statsIo.disconnect();
    }
  });
}, { threshold: 0.4 });
const statsBlock = document.querySelector('.hero-stats');
if (statsBlock) statsIo.observe(statsBlock);

/* Contact form (static demo submit) */
const form = document.getElementById('contact-form');
if (form) {
  const note = document.getElementById('form-note');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    const btnText = btn.querySelector('.btn-text');
    btnText.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
      btnText.textContent = 'Send Inquiry';
      btn.disabled = false;
      note.textContent = "Thank you — your inquiry has been received. We'll respond within one business day.";
      form.reset();
    }, 900);
  });
}
