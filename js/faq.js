const CONTENT = {
  tag:     "FAQ",
  heading: "Często zadawane pytania",
  sub:     "Odpowiedzi na najczęstsze pytania dotyczące rezerwacji, cennika i przebiegu sesji zdjęciowej.",
  back:    "← Wróć do strony głównej",
  // Treść poniżej jest przykładowa (robocza) — podmień pytania i odpowiedzi
  // na rzeczywiste informacje przed publikacją.
  faqs: [
    { q: "Jak mogę zarezerwować sesję zdjęciową?",
      a: "Najprościej skontaktuj się ze mną przez formularz kontaktowy, e-mail lub telefon podane w sekcji Kontakt. Ustalimy termin, miejsce oraz szczegóły sesji dopasowane do Twoich potrzeb." },
    { q: "Ile kosztuje sesja zdjęciowa?",
      a: "Cena zależy od rodzaju sesji, czasu jej trwania oraz liczby przekazywanych zdjęć. Napisz do mnie z krótkim opisem tego, czego szukasz — odpowiem z indywidualną wyceną." },
    { q: "Jak długo czekam na gotowe zdjęcia?",
      a: "Czas realizacji zależy od rodzaju sesji i zwykle wynosi od 7 do 14 dni roboczych. Przy większych projektach dokładny termin ustalamy przed sesją." },
    { q: "Gdzie odbywają się sesje zdjęciowe?",
      a: "Pracuję zarówno w plenerze, jak i w wybranych wnętrzach czy studiu, w zależności od charakteru sesji. Chętnie zaproponuję lokalizację lub dostosuję się do miejsca ważnego dla Ciebie." },
    { q: "Co się dzieje, jeśli muszę odwołać lub przełożyć sesję?",
      a: "Plany czasem się zmieniają — wystarczy, że poinformujesz mnie z odpowiednim wyprzedzeniem, a wspólnie ustalimy nowy termin bez dodatkowych opłat." },
    { q: "Ile zdjęć otrzymam po sesji i co jest w nią wliczone?",
      a: "Liczba zdjęć zależy od wybranego pakietu i długości sesji — szczegóły ustalamy indywidualnie przed rezerwacją. W cenę wliczona jest sesja, obróbka wybranych ujęć oraz przekazanie zdjęć w wysokiej rozdzielczości." },
    { q: "Czy mogę zamówić wydruki lub album ze zdjęciami?",
      a: "Tak, na życzenie przygotowuję również wydruki oraz albumy fotograficzne. Szczegóły i wycenę omawiamy indywidualnie po sesji." }
  ],
  footer: "© 2026 Wanessa Kistela — wszelkie prawa zastrzeżone"
};

const C = CONTENT;

/* ── HEADER ── */
document.getElementById('pBack').textContent = C.back;
document.getElementById('pTag').textContent  = C.tag;
document.getElementById('pHead').textContent = C.heading;
document.getElementById('pSub').textContent  = C.sub;
document.getElementById('foot').textContent  = C.footer;

/* ── FAQ ACCORDION ── */
const faqList = document.getElementById('faqList');
C.faqs.forEach((item, i) => {
  const d = ['', 'delay-1', 'delay-2'][i % 3];
  faqList.innerHTML += `
    <div class="faq-item reveal ${d}" data-i="${i}">
      <button class="faq-question" id="faq-q-${i}" aria-expanded="false" aria-controls="faq-a-${i}">
        <span>${item.q}</span>
        <span class="faq-icon" aria-hidden="true">+</span>
      </button>
      <div class="faq-answer-wrap" id="faq-a-${i}" role="region" aria-labelledby="faq-q-${i}">
        <div class="faq-answer"><p>${item.a}</p></div>
      </div>
    </div>`;
});

document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
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
