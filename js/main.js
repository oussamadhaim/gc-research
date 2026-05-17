/* ================================================================
   MAIN JS — Navigation, scroll, shared logic
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  setActiveNavLink();
});

/* ── Navbar scroll effect + mobile toggle ──────────────────── */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.navbar__toggle');
  const links = document.querySelector('.navbar__links');

  // Scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // Mobile toggle
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
    });

    // Close menu on link click
    links.querySelectorAll('.navbar__link').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        links.classList.remove('open');
      });
    });
  }
}

/* ── Scroll reveal (Intersection Observer) ─────────────────── */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');

  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  elements.forEach(el => observer.observe(el));
}

/* ── Active nav link ───────────────────────────────────────── */
function setActiveNavLink() {
  const path = window.location.pathname;
  const links = document.querySelectorAll('.navbar__link');

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (path.endsWith(href) || (href === '/' && (path === '/' || path.endsWith('index.html')))) {
      link.classList.add('active');
    }
  });
}
