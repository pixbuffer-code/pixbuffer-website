/* ============================================================
   STICKY HEADER
   ============================================================ */
const header = document.getElementById('site-header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 8);
}, { passive: true });

/* ============================================================
   MOBILE NAV
   ============================================================ */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
let navOpen = false;

function toggleNav(force) {
  navOpen = typeof force === 'boolean' ? force : !navOpen;
  hamburger.classList.toggle('open', navOpen);
  hamburger.setAttribute('aria-expanded', String(navOpen));
  mobileNav.classList.toggle('open', navOpen);
  mobileNav.setAttribute('aria-hidden', String(!navOpen));
  document.body.style.overflow = navOpen ? 'hidden' : '';
}

hamburger.addEventListener('click', () => toggleNav());

document.querySelectorAll('.mobile-nav-link, .mobile-cta').forEach(el => {
  el.addEventListener('click', () => toggleNav(false));
});

/* ============================================================
   SMOOTH SCROLL (offset for sticky header)
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id = anchor.getAttribute('href');
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const offset = header.offsetHeight + 16;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
