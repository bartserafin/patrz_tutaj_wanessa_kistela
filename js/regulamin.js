const CONTENT = {
  tag:     "Regulamin",
  heading: "Regulamin",
  sub:     "Zasady rezerwacji, realizacji i dostarczenia zdjęć obowiązujące podczas współpracy.",
  back:    "← Wróć do strony głównej",
  // Treść poniżej jest przykładowa (robocza) — podmień poszczególne punkty
  // na rzeczywiste zasady obowiązujące w Twojej działalności przed publikacją.
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
    { title: "3. Sposób i termin dostarczenia zdjęć",
      paragraphs: [
        "Gotowe, wyretuszowane zdjęcia przekazywane są w formie elektronicznej, w wysokiej rozdzielczości, poprzez link do pobrania ważny przez 30 dni od udostępnienia.",
        "Czas realizacji wynosi zwykle od 7 do 14 dni roboczych od dnia sesji, w zależności od jej rodzaju i liczby zdjęć do obróbki."
      ] },
    { title: "4. Prawa autorskie i wykorzystanie zdjęć",
      paragraphs: [
        "Autorskie prawa majątkowe do wykonanych zdjęć przysługują fotografowi. Klient otrzymuje licencję na wykorzystanie zdjęć do celów prywatnych oraz publikację w mediach społecznościowych z zachowaniem oznaczenia autora.",
        "Fotograf zastrzega sobie prawo do wykorzystania wybranych zdjęć z sesji w swoim portfolio oraz materiałach promocyjnych, chyba że Klient wyrazi sprzeciw przed sesją."
      ] },
    { title: "5. Zgoda na wizerunek",
      paragraphs: [
        "Uczestnictwo w sesji zdjęciowej jest jednoznaczne z wyrażeniem zgody na utrwalenie i przetwarzanie wizerunku w zakresie opisanym w niniejszym regulaminie.",
        "W przypadku sesji z udziałem osób niepełnoletnich wymagana jest pisemna zgoda rodzica lub opiekuna prawnego."
      ] },
    { title: "6. Reklamacje",
      paragraphs: [
        "Ewentualne reklamacje dotyczące jakości usługi należy zgłaszać w formie pisemnej (e-mail) w terminie 7 dni od otrzymania gotowych zdjęć.",
        "Reklamacje rozpatrywane są indywidualnie w terminie do 14 dni roboczych od daty zgłoszenia."
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
