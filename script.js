const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
menuBtn.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
  menuBtn.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  menuBtn.textContent = open ? '✕' : '☰';
});
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.setAttribute('aria-label', 'Open navigation');
  menuBtn.textContent = '☰';
}));

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  document.documentElement.classList.add('motion-ready');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }), { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}

const progress = document.querySelector('.scroll-progress');
function updateProgress() {
  const distance = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${distance > 0 ? window.scrollY / distance : 0})`;
}
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();

const heroVisual = document.querySelector('.hero-visual');
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reducedMotion.matches) {
  heroVisual.addEventListener('pointermove', event => {
    const bounds = heroVisual.getBoundingClientRect();
    heroVisual.style.setProperty('--pointer-x', `${((event.clientX - bounds.left) / bounds.width - 0.5) * 16}px`);
    heroVisual.style.setProperty('--pointer-y', `${((event.clientY - bounds.top) / bounds.height - 0.5) * 16}px`);
  });
  heroVisual.addEventListener('pointerleave', () => {
    heroVisual.style.setProperty('--pointer-x', '0px');
    heroVisual.style.setProperty('--pointer-y', '0px');
  });
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('pointermove', event => {
      const bounds = card.getBoundingClientRect();
      card.style.setProperty('--glow-x', `${event.clientX - bounds.left}px`);
      card.style.setProperty('--glow-y', `${event.clientY - bounds.top}px`);
    });
  });
}
document.getElementById('year').textContent = new Date().getFullYear();
