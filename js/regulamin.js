const CONTENT = {
  tag:     "Regulamin",
  heading: "Regulamin",
  sub:     "Zasady rezerwacji, realizacji i dostarczenia zdjęć obowiązujące podczas współpracy.",
  back:    "← Wróć do strony głównej",
  sections: [
    { title: "1. Rezerwacja terminu",
      paragraphs: [
        "Rezerwacja terminu następuje po uzgodnieniu daty oraz wpłacie zadatku w wysokości 150 zł w ciągu 2 dni od ustalenia terminu.",
        "Pozostała część kwoty płatna jest przelewem lub gotówką najpóźniej w dniu sesji."
      ] },
    { title: "2. Zmiana terminu i odwołanie",
      paragraphs: [
        "Zmiana terminu jest możliwa najpóźniej 3 dni przed planowaną sesją. W przypadku zdarzeń losowych lub brzydkiej pogody (przy sesjach plenerowych) ustalamy nowy, dogodny termin.",
        "W przypadku odwołania sesji przez Klienta z przyczyn leżących po Jego stronie, zadatek nie podlega zwrotowi."
      ] },
    { title: "3. Przebieg sesji",
      paragraphs: [
        "Proszę o punktualne przybycie. Spóźnienie powyżej 15 minut może skrócić czas trwania sesji.",
        "Ewentualny koszt wynajęcia studia fotograficznego lub dodatkowych biletów wstępu pokrywa Klient."
      ] },
    { title: "4. Odbiór zdjęć i obróbka",
      paragraphs: [
        "Gotowe, obrobione zdjęcia otrzymasz w formie cyfrowej w ciągu <b>21 dni</b> licząc od dnia sesji.",
        "Nie przekazuję surowych plików (RAW) ani nieobrobionych zdjęć."
      ] },
    { title: "5. Prawa autorskie i publikacja",
      paragraphs: [
        "Klient otrzymuje prawo do prywatnego użytku zdjęć (oraz publikacji na własnych profilach w mediach społecznościowych).",
        "Zgoda na publikację Twojego wizerunku w moim portfolio (Instagram, strona www) jest dobrowolna. Zawsze najpierw pytam o zgodę!"
      ] }
  ],
  footer: "© 2026 Wanessa Kistela — wszelkie prawa zastrzeżone"
};

const C = CONTENT;

/* ── HEADER ── */
document.getElementById('pBack').textContent = C.back;
document.getElementById('pTag').textContent  = C.tag;
document.getElementById('pHead').textContent = C.heading;
document.getElementById('pSub').textContent  = C.sub;
document.getElementById('foot').innerHTML    = `<a href="regulamin.html">${C.footer}</a>`;

/* ── REGULAMIN SECTIONS ── */
const regulaminList = document.getElementById('regulaminList');
C.sections.forEach((s, i) => {
  const d = ['', 'delay-1', 'delay-2'][i % 3];
  regulaminList.innerHTML += `
    <div class="regulamin-item reveal ${d}">
      <h2>${s.title}</h2>
      ${s.paragraphs.map(p => `<p>${p}</p>`).join('')}
    </div>`;
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
