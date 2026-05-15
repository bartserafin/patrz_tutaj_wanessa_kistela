const CONTENT = {
  tag:        "Portfolio",
  heading:    "Chwile, które zostają na zawsze",
  sub:        "Każda sesja to osobna historia. Oto wszystkie moje prace.",
  paragraphs: [
    "Sesje portretowe, rodzinne, ciążowe, a może artystyczne?"
  ],
  photos: [
    "portfolio/065A0652-2.jpg",
    "portfolio/065A0900.jpg",
    "portfolio/065A1207-2.jpg",
    "portfolio/065A1313.jpg",
    "portfolio/065A1508.jpg",
    "portfolio/065A1592-2.jpg",
    "portfolio/065A1678-2.jpg",
    "portfolio/065A1775.jpg",
    "portfolio/065A1909.jpg",
    "portfolio/065A1952.jpg",
    "portfolio/065A2591.jpg",
    "portfolio/065A3196.jpg",
    "portfolio/065A3264.jpg",
    "portfolio/065A3320.jpg",
    "portfolio/065A3482.jpg",
    "portfolio/065A4632-2.jpg",
    "portfolio/065A5517.jpg",
    "portfolio/065A6129-2.jpg"
  ],
  footer: "© 2025 Wanessa Kistela — wszelkie prawa zastrzeżone"
};

const C = CONTENT;

/* ── HEADER ── */
document.getElementById('pTag').textContent  = C.tag;
document.getElementById('pHead').textContent = C.heading;
document.getElementById('pSub').textContent  = C.sub;
const pp = document.getElementById('pPara');
C.paragraphs.forEach(t => pp.innerHTML += `<p class="para">${t}</p>`);
document.getElementById('foot').textContent  = C.footer;

/* ── PHOTO GRID ── */
const grid = document.getElementById('grid');
C.photos.forEach((src, i) => {
  const d = ['', 'delay-1', 'delay-2'][i % 3];
  grid.innerHTML += `
    <div class="tile reveal ${d}" data-i="${i}">
      <img src="${src}" alt="Sesja ${i + 1}" loading="lazy">
      <div class="tile-overlay"></div>
    </div>`;
});

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

document.querySelectorAll('.tile').forEach(t =>
  t.addEventListener('click', () => lbOpen(+t.dataset.i))
);
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
