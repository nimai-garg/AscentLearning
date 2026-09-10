/* Progressive enhancement. Header/footer markup is embedded in every page so
   navigation and SEO work without JavaScript, including when opened from disk.
   Canonical reusable copies are in partials/; copy edits into all four pages. */
'use strict';
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
// Native details/summary supplies keyboard accessibility and works without JS.
document.querySelectorAll('.faq details').forEach(detail => {
  detail.addEventListener('toggle', () => {
    if (detail.open) document.querySelectorAll('.faq details').forEach(other => { if (other !== detail) other.open = false; });
  });
});
/* FORM BACKEND SETUP:
   1. Set FORM_ENDPOINT to an HTTPS endpoint that accepts JSON via POST.
   2. Configure that service's recipient as garg82@gmail.com, allowed origin,
      server-side validation, spam protection and data retention.
   3. The endpoint must return a 2xx status ONLY after accepting the message.
   4. Test delivery and error handling before launch. Never embed API secrets here.
   Blank endpoint = validation-only demo; no data is sent or stored. */
const FORM_ENDPOINT = '';
const form = document.querySelector('#contact-form');
if (form) {
  const status = document.querySelector('#form-status');
  const submit = form.querySelector('button[type="submit"]');
  const required = [...form.querySelectorAll('[required]')];
  const errorIds = { 'parent-name': 'name-error', email: 'email-error', grade: 'grade-error', message: 'message-error' };
  function validate(field) {
    let error = '';
    if (!field.value.trim()) error = 'Please complete this field.';
    else if (!field.validity.valid) error = field.type === 'email' ? 'Please enter a valid email address.' : 'Please check this field.';
    field.setAttribute('aria-invalid', String(Boolean(error)));
    document.getElementById(errorIds[field.id]).textContent = error;
    return !error;
  }
  required.forEach(field => field.addEventListener('input', () => {
    if (field.getAttribute('aria-invalid') === 'true') validate(field);
  }));
  if (FORM_ENDPOINT) {
    document.querySelector('#form-note').textContent = 'Share your learning goals to request a free consultation. Your details will be sent to Aarushi to respond to your inquiry.';
    submit.textContent = 'Request a Free Consultation ↗';
  }
  form.addEventListener('submit', async event => {
    event.preventDefault();
    status.textContent = '';
    const invalid = required.filter(field => !validate(field));
    if (invalid.length) { status.textContent = 'Please correct the highlighted fields.'; invalid[0].focus(); return; }
    if (!FORM_ENDPOINT) {
      status.textContent = 'Your details are complete, but no message has been sent. Please email garg82@gmail.com or call (408) 821-4380 to arrange your free consultation.';
      status.focus(); return;
    }
    submit.disabled = true;
    status.textContent = 'Sending your request…';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(FORM_ENDPOINT, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form))),signal:controller.signal});
      if (!response.ok) throw new Error('Submission failed');
      status.textContent = 'Thank you. Your consultation request has been sent.';
      form.reset();
      required.forEach(field => field.removeAttribute('aria-invalid'));
    } catch (_) {
      status.textContent = 'We could not confirm delivery. Your details remain here. Please email garg82@gmail.com or call (408) 821-4380.';
    } finally { clearTimeout(timeout); submit.disabled = false; status.focus(); }
  });
}
