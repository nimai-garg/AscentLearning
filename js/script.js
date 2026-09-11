/* Progressive enhancement. Header/footer markup is embedded in every page so
   navigation and SEO work without JavaScript, including when opened from disk.
   Canonical reusable copies are in partials/; copy edits into all four pages. */
'use strict';
// Normalize the home address without reloading or discarding query/hash data.
if (location.pathname === '/index.html') history.replaceState(null, '', '/' + location.search + location.hash);
document.documentElement.classList.add('js');
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
if (menu && navigation) {
  menu.hidden = false;
  const closeMenu = () => { navigation.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false'); };
  menu.addEventListener('click', () => {
    const opened = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(opened));
    navigation.classList.toggle('is-open', opened);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); }
  });
  navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  window.matchMedia('(min-width: 901px)').addEventListener('change', closeMenu);
}
// Native HTTPS form submission keeps provider CAPTCHA and works without JavaScript.
const form = document.querySelector('#contact-form');
if (form) {
  form.noValidate = true;
  const status = document.querySelector('#form-status');
  const required = [...form.querySelectorAll('[required]')];
  function validate(field) {
    const error = !field.value.trim() ? 'Please complete this field.' : !field.validity.valid ? 'Please enter a valid email address.' : '';
    field.setAttribute('aria-invalid', String(Boolean(error)));
    document.getElementById(field.getAttribute('aria-describedby')).textContent = error;
    return !error;
  }
  required.forEach(field => field.addEventListener('input', () => {
    if (field.getAttribute('aria-invalid') === 'true') validate(field);
  }));
  form.addEventListener('submit', event => {
    const invalid = required.filter(field => !validate(field));
    if (invalid.length) {
      event.preventDefault(); status.textContent = 'Please correct the highlighted fields.'; invalid[0].focus(); return;
    }
    status.textContent = 'Continue to the secure verification step to finish your request. If it does not load, please call (408) 821 4380 or email hello@ascentlearning.net.';
  });
  window.addEventListener('pageshow', () => { status.textContent = ''; });
}
// Entrance motion uses translate independently from interactive transforms.
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting);
    visible.forEach((entry, index) => {
      if (!motion.matches) entry.target.animate([
        { opacity: .3, translate: '0 28px' },
        { opacity: 1, translate: '0 0' }
      ], { duration: 850, delay: Math.min(index * 75, 225), easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' });
      observer.unobserve(entry.target);
    });
  }, { threshold: .08 });
  document.querySelectorAll('.hero-grid > div > *, .hero-note, .card, .tutor-grid > *, .steps li, .form-panel, .section h2, .page-intro h1, .benefit-panel, .credential-panel, .experience-panel').forEach(el => observer.observe(el));
}
// Interpolate pointer light and a small magnetic offset; stop frames at rest.
const surfaces = [];
document.querySelectorAll('.button, .card, .hero-note').forEach(surface => {
  let frame = 0, last = 0;
  let x = 50, y = 25, targetX = 50, targetY = 25;
  let dx = 0, dy = 0, targetDX = 0, targetDY = 0;
  const isButton = surface.matches('.button');
  function draw(time) {
    const blend = 1 - Math.exp(-Math.min(time - (last || time - 16), 64) / 85);
    last = time;
    x += (targetX - x) * blend; y += (targetY - y) * blend;
    dx += (targetDX - dx) * blend; dy += (targetDY - dy) * blend;
    surface.style.setProperty('--light-x', `${x}%`);
    surface.style.setProperty('--light-y', `${y}%`);
    surface.style.setProperty('--magnet-x', `${dx}px`);
    surface.style.setProperty('--magnet-y', `${dy}px`);
    const moving = Math.abs(x-targetX)+Math.abs(y-targetY)+Math.abs(dx-targetDX)+Math.abs(dy-targetDY) > .08;
    frame = moving ? requestAnimationFrame(draw) : 0;
    if (!moving) last = 0;
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(draw); }
  function reset() {
    cancelAnimationFrame(frame); frame = 0; last = 0;
    x = targetX = 50; y = targetY = 25; dx = dy = targetDX = targetDY = 0;
    ['--light-x','--light-y','--magnet-x','--magnet-y'].forEach(key => surface.style.removeProperty(key));
  }
  surfaces.push(reset);
  surface.addEventListener('pointermove', event => {
    if (motion.matches || !finePointer.matches || event.pointerType === 'touch') return;
    const bounds = surface.getBoundingClientRect();
    targetX = Math.max(0, Math.min(100, (event.clientX - bounds.left) / bounds.width * 100));
    targetY = Math.max(0, Math.min(100, (event.clientY - bounds.top) / bounds.height * 100));
    targetDX = isButton ? (targetX - 50) * .075 : 0;
    targetDY = isButton ? (targetY - 50) * .055 : 0;
    schedule();
  });
  surface.addEventListener('pointerleave', () => {
    targetX = 50; targetY = 25; targetDX = targetDY = 0;
    if (!motion.matches && finePointer.matches) schedule();
  });
});
// Preserve native details behavior without JavaScript; animate both directions when enhanced.
const accordions = [...document.querySelectorAll('.faq details')].map(detail => {
  const summary = detail.querySelector('summary');
  const answer = detail.querySelector('.faq-answer');
  let expanded = detail.open;
  let animation = null;
  function settle() {
    detail.open = expanded;
    detail.style.removeProperty('height');
    detail.style.removeProperty('overflow');
    animation = null;
  }
  function setExpanded(next) {
    const start = detail.getBoundingClientRect().height;
    if (animation) {
      animation.oncancel = null;
      animation.onfinish = null;
      animation.cancel();
    }
    expanded = next;
    detail.dataset.expanded = String(next);
    summary.setAttribute('aria-expanded', String(next));
    if (motion.matches || !detail.animate) { settle(); return; }
    detail.open = true;
    const border = 2;
    const end = summary.getBoundingClientRect().height + border + (next ? answer.getBoundingClientRect().height : 0);
    detail.style.overflow = 'hidden';
    detail.style.height = `${start}px`;
    animation = detail.animate([{height:`${start}px`}, {height:`${end}px`}], {
      duration: 420, easing: 'cubic-bezier(.22,1,.36,1)'
    });
    animation.onfinish = settle;
    animation.oncancel = settle;
  }
  summary.addEventListener('click', event => {
    event.preventDefault();
    const next = !expanded;
    if (next) accordions.forEach(other => { if (other.detail !== detail) other.close(); });
    setExpanded(next);
  });
  return { detail, close: () => { if (expanded) setExpanded(false); }, finish: () => { if (animation) animation.finish(); } };
});
window.addEventListener('resize', () => accordions.forEach(item => item.finish()));
if (menu && navigation) menu.addEventListener('click', () => {
  if (navigation.classList.contains('is-open') && !motion.matches) navigation.animate([
    {opacity:0,translate:'0 -10px'}, {opacity:1,translate:'0 0'}
  ], {duration:300,easing:'cubic-bezier(.16,1,.3,1)'});
});
function resetMotion() {
  if (motion.matches || !finePointer.matches) {
    surfaces.forEach(reset => reset());
    document.getAnimations().forEach(animation => animation.cancel());
  }
}
motion.addEventListener('change', resetMotion);
finePointer.addEventListener('change', resetMotion);
document.addEventListener('visibilitychange', () => { if (document.hidden) surfaces.forEach(reset => reset()); });
