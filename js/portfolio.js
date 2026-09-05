const CONTENT = {
  tag:     "Portfolio",
  heading: "Chwile, które zostają na zawsze",
  sub:     "Każda sesja to osobna historia. Wybierz kategorię i odkryj moje prace.",
  categories: [
    { title: "Biznesowe",   cover: "portfolio/biznesowe/biznesowe-cover.jpg",   href: "portfolio-biznesowe.html" },
    { title: "Reportażowe", cover: "portfolio/reportazowe/reportazowe-cover.jpg", href: "portfolio-reportazowe.html" },
    { title: "Artystyczne", cover: "portfolio/artystyczne/artystyczne-cover.jpg", href: "portfolio-artystyczne.html" },
    { title: "Rodzinne",    cover: "portfolio/rodzinne/rodzinne-cover.jpg",    href: "portfolio-rodzinne.html" }
  ],
  footer: "© 2025 Wanessa Kistela — wszelkie prawa zastrzeżone"
};

const C = CONTENT;

/* ── HEADER ── */
document.getElementById('pTag').textContent  = C.tag;
document.getElementById('pHead').textContent = C.heading;
document.getElementById('pSub').textContent  = C.sub;
document.getElementById('foot').textContent  = C.footer;

/* ── CATEGORY TILES ── */
const grid = document.getElementById('grid');
C.categories.forEach((cat, i) => {
  const delay = ['', 'delay-1', 'delay-2', 'delay-3'][i];
  grid.innerHTML += `<a class="cat-tile reveal ${delay}" href="${cat.href}"
    style="background-image:url('${cat.cover}')">
    <div class="cat-tile-overlay"></div>
    <span class="cat-tile-title">${cat.title}</span>
  </a>`;
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
