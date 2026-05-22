/* ============================================================
   TAMS MUN 2026 — Main Script
   ============================================================ */

/* ── SCROLL ANIMATIONS ── */
(function initScrollAnimations() {
  const fadeEls = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );
  fadeEls.forEach(el => observer.observe(el));
})();

/* ── FAQ ACCORDION ── */
function toggleFaq(btn) {
  const ans   = btn.nextElementSibling;
  const isOpen = ans.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-q').forEach(q => q.classList.remove('open'));

  // Re-open if it was closed
  if (!isOpen) {
    ans.classList.add('open');
    btn.classList.add('open');
  }
}

/* ── REGISTRATION FORM ── */
async function handleSubmit(e) {
  e.preventDefault();

  const btn  = document.getElementById('submit-btn');
  const form = document.getElementById('reg-form');

  btn.textContent = 'Sending…';
  btn.disabled    = true;

  try {
    const res = await fetch(form.action, {
      method:  'POST',
      body:    new FormData(form),
      headers: { 'Accept': 'application/json' },
    });

    if (res.ok) {
      document.getElementById('reg-form-wrap').style.display = 'none';
      document.getElementById('success-msg').classList.add('show');
      window.scrollTo({
        top:      document.getElementById('register').offsetTop,
        behavior: 'smooth',
      });
    } else {
      throw new Error('Server error');
    }
  } catch {
    btn.textContent = 'Submit Registration';
    btn.disabled    = false;
    alert('Something went wrong. Please try again or email tams.ballot@gmail.com directly.');
  }
}

async function loadSection(id, file) {
  const res = await fetch(file);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

async function loadAllSections() {
  await loadSection("about-section", "sections/about.html");
  await loadSection("dates-section", "sections/dates.html");
  await loadSection("committees-section", "sections/committees.html");
  await loadSection("register-section", "sections/register.html");
  await loadSection("papers-section", "sections/papers.html");
  await loadSection("faq-section", "sections/faq.html");

  document.querySelectorAll('.fade-up').forEach(el => {
    el.classList.add('visible');
  });
}

loadAllSections();
