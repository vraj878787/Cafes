// script.js - handles mobile menu and stagger animations
document.addEventListener('DOMContentLoaded', function() {
  // mobile menu
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
  }

  // staggered items animation
  const items = Array.from(document.querySelectorAll('.stagger-item'));
  const mobileBreakpoint = 768;

  function animateStagger() {
    items.forEach(el => {
      const order = parseInt(el.dataset.order || '0', 10);
      const dir = el.dataset.direction || (order % 2 === 0 ? 'left' : 'right');
      const delay = Math.min(0.9, 0.12 * order);

      if (window.innerWidth >= mobileBreakpoint) {
        // desktop: slide left/right using CSS animations
        el.style.animation = (dir === 'left' ? 'slideInLeft' : 'slideInRight') + ' 600ms ease ' + delay + 's forwards';
      } else {
        // mobile: fade up
        el.style.animation = 'fadeUp 500ms ease ' + delay + 's forwards';
      }
    });
  }

  window.addEventListener('load', animateStagger);
  window.addEventListener('resize', function() {
    // re-run on resize with debounce
    clearTimeout(window.__resizeTimer);
    window.__resizeTimer = setTimeout(animateStagger, 120);
  });
});
/* ----- mobile menu toggle + auto-close on link click ----- */
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

// Toggle mobile menu when hamburger clicked
menuBtn?.addEventListener('click', (e) => {
  mobileMenu.classList.toggle('hidden');
  // update aria-expanded for accessibility
  const expanded = !mobileMenu.classList.contains('hidden');
  menuBtn.setAttribute('aria-expanded', String(expanded));
});

// Close mobile menu when any link inside it is clicked
mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});

// Optional: close the menu if the user clicks/taps outside it
document.addEventListener('click', (e) => {
  if (!mobileMenu || !menuBtn) return;
  const target = e.target;
  if (!mobileMenu.contains(target) && !menuBtn.contains(target)) {
    // only hide if it's currently visible
    if (!mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  }
});

// Optional: close menu on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
    mobileMenu.classList.add('hidden');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
});
