/* ============================================================
   main.js — App Init, Cursor, Scroll Effects
   MoldaStore
   ============================================================ */

/* ══════════════════════════════════════
   CUSTOM CURSOR
══════════════════════════════════════ */
const cursorDot  = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
});

/* Smooth ring follow via rAF */
function animateCursorRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
  requestAnimationFrame(animateCursorRing);
}

animateCursorRing();

/* ══════════════════════════════════════
   SCROLL EFFECTS
══════════════════════════════════════ */
const progressBar = document.getElementById('scroll-progress');
const backTopBtn  = document.getElementById('back-top');
const mainNav     = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
  const doc = document.documentElement;
  const scrolled = doc.scrollTop;
  const total    = doc.scrollHeight - doc.clientHeight;

  /* Progress bar */
  progressBar.style.width = ((scrolled / total) * 100) + '%';

  /* Sticky nav shadow */
  mainNav.classList.toggle('scrolled', scrolled > 50);

  /* Back-to-top button */
  backTopBtn.classList.toggle('visible', scrolled > 400);

  /* Scroll reveal */
  checkReveal();
});

function checkReveal() {
  document.querySelectorAll('.reveal').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 80) {
      el.classList.add('visible');
    }
  });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  /* Render product grid */
  renderProducts();

  /* Run reveal check for elements already in viewport */
  checkReveal();

  /* Attach cursor hover listeners to static elements */
  attachCursorListeners();
});
