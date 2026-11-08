// Small progressive enhancements: mobile drawer, scroll-spy, language switch that
// keeps the current section, and copy-to-clipboard for the citation.
(() => {
  const EIR = window.EIR || {};
  const body = document.body;
  const sidebar = document.getElementById('sidebar');
  const scrim = document.querySelector('.scrim');
  const menuBtn = document.querySelector('.menu-btn');
  const OFFSET = 96;

  // ---- Drawer (narrow screens)
  const setNav = (open) => {
    body.classList.toggle('nav-open', open);
    if (menuBtn) menuBtn.setAttribute('aria-expanded', String(open));
    if (scrim) scrim.hidden = !open;
  };
  menuBtn?.addEventListener('click', () => setNav(!body.classList.contains('nav-open')));
  scrim?.addEventListener('click', () => setNav(false));
  sidebar?.addEventListener('click', (e) => {
    if (e.target.closest('a')) setNav(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setNav(false);
  });

  // ---- Scroll-spy
  const links = new Map();
  sidebar?.querySelectorAll('a[data-id]').forEach((a) => links.set(a.dataset.id, a));
  const headings = [...document.querySelectorAll('.doc h1[id], .doc h2[id], .doc h3[id], .doc h4[id]')];
  const tocHeadings = headings.filter((h) => links.has(h.id));

  const currentOf = (list) => {
    let cur = null;
    for (const h of list) {
      if (h.getBoundingClientRect().top - OFFSET <= 0) cur = h;
      else break;
    }
    return cur;
  };

  let active = null;
  const update = () => {
    const h = currentOf(tocHeadings);
    const a = h ? links.get(h.id) : null;
    if (a === active) return;
    if (active) {
      active.classList.remove('active');
      active.removeAttribute('aria-current');
    }
    active = a;
    if (!a || !sidebar) return;
    a.classList.add('active');
    a.setAttribute('aria-current', 'location');
    const r = a.getBoundingClientRect();
    const s = sidebar.getBoundingClientRect();
    if (r.top < s.top + 48 || r.bottom > s.bottom - 48) {
      sidebar.scrollTo({ top: sidebar.scrollTop + (r.top - s.top) - s.height / 3, behavior: 'smooth' });
    }
  };
  let ticking = false;
  addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        update();
      });
    },
    { passive: true },
  );
  addEventListener('load', update);
  update();

  // ---- Language switch: jump to the same section in the other language
  document.querySelectorAll('a[data-switch]').forEach((a) =>
    a.addEventListener('click', (e) => {
      if (!EIR.altIds || !EIR.ids) return;
      const h = currentOf(headings);
      if (!h) return;
      const target = EIR.altIds[EIR.ids.indexOf(h.id)];
      if (!target) return;
      e.preventDefault();
      location.href = a.getAttribute('href') + '#' + target;
    }),
  );

  // ---- Copy citation
  document.querySelectorAll('[data-copy]').forEach((btn) =>
    btn.addEventListener('click', async () => {
      const el = document.querySelector(btn.dataset.copy);
      if (!el) return;
      try {
        await navigator.clipboard.writeText(el.textContent.trim());
        const label = btn.textContent;
        btn.textContent = btn.dataset.done || '✓';
        setTimeout(() => (btn.textContent = label), 1600);
      } catch {
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }),
  );
})();
