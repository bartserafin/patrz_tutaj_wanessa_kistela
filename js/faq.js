const CONTENT = {
  tag:     "FAQ",
  heading: "Często zadawane pytania",
  sub:     "Odpowiedzi na najczęstsze pytania dotyczące rezerwacji, cennika i przebiegu sesji zdjęciowej.",
  back:    "← Wróć do strony głównej",
  faqs: [
    { q: "Nie umiem pozować i stresuję się przed aparatem. Czy dam radę?",
      a: "Zdecydowanie tak! Większość osób, które fotografuję, mówi mi na początku dokładnie to samo. Moje sesje nie polegają na sztywnym pozowaniu. Zamiast tego stawiam na luźną atmosferę, rozmowę i naturalność. Poprowadzę Cię krok po kroku, podpowiem co zrobić z rękami i zadbam o to, aby stres minął już po pierwszych kilku minutach." },
    { q: "Jak mam się ubrać na sesję?",
      a: "Najważniejsze, żebyś czuł/a się w swoim ubraniu wygodnie i swobodnie. Najlepiej sprawdzają się kolory neutralne (beże, biele, brązy, szarości, pastele) oraz ubrania bez dużych, pstrokatych logo. Po rezerwacji sesji chętnie pomogę Ci dobrać odpowiednie stylizacje i podrzucę kilkanaście sprawdzonych inspiracji." },
    { q: "Gdzie odbywają się sesje?",
      a: "To zależy od Twoich potrzeb i pomysłu! Robię zdjęcia w plenerze (parki, miejskie uliczki, klimatyczne miejsca w Szczecinie i okolicach), w wynajętym studio fotograficznym, w kawiarniach lub w Twoim domowym wydaniu/miejscu pracy (szczególnie przy sesjach wizerunkowych)." },
    { q: "Ile trwa sesja zdjęciowa?",
      a: "Standardowa sesja trwa zazwyczaj od 1 do 1,5 godziny. To idealny czas, aby na spokojnie zrobić różnorodne ujęcia, zmienić stylizację i porozmawiać." },
    { q: "Kiedy i w jakiej formie otrzymam gotowe zdjęcia?",
      a: "Gotowy pakiet obrobionych zdjęć otrzymasz do 21 dni od momentu wyboru ujęć. Zdjęcia przekazuję w formie cyfrowej przez wygodną galerię online chronioną hasłem, z której łatwo pobierzesz je na telefon lub komputer w pełnej rozdzielczości." },
    { q: "Czy dostanę nieobrobione zdjęcia (pliki RAW)?",
      a: "Nie oddaję surowych plików RAW. Surowy plik to tylko połowa wykonanej przeze mnie pracy – autorska obróbka, światło i spójna kolorystyka stanowią kluczową część mojego stylu, za który wybierasz moje portfolio." },
    { q: "Co jeśli pogoda podczas sesji plenerowej nie dopisze?",
      a: "Śledzę prognozy na bieżąco. Jeśli w dniu sesji ma ulewnie padać lub aura będzie bardzo niesprzyjająca, po prostu bezpłatnie przekładamy spotkanie na inny, dogodny dla Ciebie termin." },
    { q: "Jak mogę zarezerwować termin?",
      a: "Wystarczy, że napiszesz do mnie wiadomość przez formularz kontaktowy, e-mail lub na Instagramie. Omówimy Twój pomysł, ustalimy dogodny termin i dogramy wszystkie szczegóły!" }
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
