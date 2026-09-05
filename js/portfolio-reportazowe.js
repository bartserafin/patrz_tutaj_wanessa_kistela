const CONTENT = {
  tag:     "Portfolio — Reportażowe",
  heading: "Chwile, które zostają na zawsze",
  sub:     "Autentyczne chwile uchwycone w kadrze.",
  back:    "← Wróć do Portfolio",
  // Lista zdjęć wczytywana dynamicznie z portfolio/reportazowe/manifest.json (patrz niżej).
  // Aby dodać/usunąć zdjęcie: wrzuć/usuń plik w portfolio/reportazowe/ i uruchom
  // `node scripts/generate-photo-manifests.js` — nie edytuj tej tablicy ręcznie.
  photos: [],
  footer: "© 2026 Wanessa Kistela — wszelkie prawa zastrzeżone"
};

const C = CONTENT;

/* ── HEADER ── */
document.getElementById('pBack').textContent = C.back;
document.getElementById('pTag').textContent  = C.tag;
document.getElementById('pHead').textContent = C.heading;
document.getElementById('pSub').textContent  = C.sub;
document.getElementById('foot').innerHTML    = `<a href="regulamin.html">${C.footer}</a>`;

/* ── PHOTO GRID ── */
const grid = document.getElementById('grid');
function renderGrid() {
  C.photos.forEach((src, i) => {
    const d = ['', 'delay-1', 'delay-2'][i % 3];
    grid.innerHTML += `
      <div class="tile reveal ${d}" data-i="${i}">
        <img src="${src}" alt="Sesja ${i + 1}" loading="lazy">
        <div class="tile-overlay"></div>
      </div>`;
  });
  document.querySelectorAll('.tile').forEach(t =>
    t.addEventListener('click', () => lbOpen(+t.dataset.i))
  );
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el));
}
fetch('portfolio/reportazowe/manifest.json')
  .then(r => r.json())
  .then(data => { C.photos = data.photos; renderGrid(); })
  .catch(() => renderGrid());

/* ── LIGHTBOX ── */
let lbIndex = 0;
const lbEl  = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');

function lbOpen(i) {
  lbIndex = i;
  lbImg.src = C.photos[lbIndex];
  lbEl.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function lbClose() {
  lbEl.classList.remove('open');
  document.body.style.overflow = '';
}
function lbGo(dir) {
  lbIndex = (lbIndex + dir + C.photos.length) % C.photos.length;
  lbImg.src = C.photos[lbIndex];
}

document.getElementById('lb-close').onclick = lbClose;
document.getElementById('lb-prev').onclick  = () => lbGo(-1);
document.getElementById('lb-next').onclick  = () => lbGo(1);
lbEl.addEventListener('click', e => { if (e.target === lbEl) lbClose(); });
document.addEventListener('keydown', e => {
  if (!lbEl.classList.contains('open')) return;
  if (e.key === 'ArrowLeft')  lbGo(-1);
  if (e.key === 'ArrowRight') lbGo(1);
  if (e.key === 'Escape')     lbClose();
});

/* ── MOBILE NAV ── */
const mobileNav = document.getElementById('mobile-nav');
document.getElementById('nav-burger').onclick = () => mobileNav.classList.add('open');
document.getElementById('mobile-nav-close').onclick = () => mobileNav.classList.remove('open');
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));

/* ── NAV SHADOW ── */
window.addEventListener('scroll', () => {
  document.getElementById('nav').style.boxShadow =
    window.scrollY > 20 ? '0 2px 24px rgba(74,30,107,.09)' : 'none';
});

/* ── SCROLL REVEAL ── */
const ro = new IntersectionObserver(entries => {
  const visible = entries.filter(e => e.isIntersecting);
  visible.forEach((e, i) => {
    e.target.style.transitionDelay = `${i * 0.07}s`;
    e.target.classList.add('v');
    ro.unobserve(e.target);
  });
}, { threshold: 0.06 });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));
