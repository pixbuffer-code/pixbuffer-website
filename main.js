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

/* ============================================================
   HERO TYPEWRITER
   ============================================================ */
(function () {
  const el = document.querySelector('.hero-headline');
  if (!el) return;

  const h = el.offsetHeight;
  el.style.minHeight = h + 'px';
  el.classList.add('visible');
  el.innerHTML = '';

  const lines = [
    { text: 'Real AI.', accent: false },
    { text: 'Custom Software.', accent: false },
    { text: 'Measurable outcomes', accent: true },
  ];

  const chars = [];
  lines.forEach((line, li) => {
    if (li > 0) chars.push({ type: 'br' });
    for (const ch of line.text) chars.push({ type: 'char', ch, accent: line.accent });
  });
  chars.push({ type: 'dot' });

  let normalNode = document.createTextNode('');
  let accentSpan = null;
  let accentTextNode = null;
  el.appendChild(normalNode);

  const interval = 2400 / chars.length;
  let i = 0;

  function typeNext() {
    if (i >= chars.length) return;
    const item = chars[i++];

    if (item.type === 'br') {
      el.appendChild(document.createElement('br'));
      normalNode = document.createTextNode('');
      el.appendChild(normalNode);
    } else if (item.type === 'char') {
      if (item.accent) {
        if (!accentSpan) {
          accentSpan = document.createElement('span');
          accentSpan.className = 'accent';
          accentTextNode = document.createTextNode('');
          accentSpan.appendChild(accentTextNode);
          el.appendChild(accentSpan);
        }
        accentTextNode.data += item.ch;
      } else {
        normalNode.data += item.ch;
      }
    } else if (item.type === 'dot') {
      const dot = document.createElement('span');
      dot.className = 'accent hero-blink-dot';
      dot.textContent = '.';
      (accentSpan || el).appendChild(dot);
    }

    setTimeout(typeNext, interval);
  }

  typeNext();
})();
