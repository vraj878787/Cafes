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
// wait for DOM
document.addEventListener("DOMContentLoaded", function () {
  /* ---------------- NAVBAR: mobile toggle + close on link click ---------------- */
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    // close mobile menu when any mobile link clicked
    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }

  /* ---------------- REVIEWS: Show More + stars + smooth append ---------------- */
  const moreReviews = [
    { img: "http://static.photos/food/200x160/5", text: "Great value for money and welcoming staff!" },
    { img: "http://static.photos/food/200x160/6", text: "Perfect place for an evening out. Mocktails were delicious." },
    { img: "http://static.photos/food/200x160/7", text: "Busy but well-managed. Food was worth the wait." },
    { img: "http://static.photos/food/200x160/8", text: "Cozy atmosphere, fast service, top quality coffee." },
    { img: "http://static.photos/food/200x160/9", text: "A vibrant place with flavors that stand out. Five stars!" }
  ];

  const wrapper = document.getElementById("reviewsWrapper");
  const showMoreBtn = document.getElementById("showMoreBtn");

  if (showMoreBtn && wrapper) {
    showMoreBtn.addEventListener("click", () => {
      // remove the button first so appending looks neat
      showMoreBtn.remove();

      // append each extra review card
      moreReviews.forEach(r => {
        const div = document.createElement("div");
        div.className = "review-card";
        div.innerHTML = `
          <img src="${r.img}" class="review-img" loading="lazy" alt="Dish">
          <div class="stars">★★★★★</div>
          <p class="review-text">${r.text}</p>
        `;
        wrapper.appendChild(div);
      });
    });
  }

  /* ---------------- small enhancement: auto-hide mobile menu on outside click ---------------- */
  document.addEventListener("click", function (e) {
    if (!mobileMenu || !menuBtn) return;
    // If click is outside mobileMenu and not the menu button, close it
    if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
      mobileMenu.classList.add("hidden");
    }
  });
});
