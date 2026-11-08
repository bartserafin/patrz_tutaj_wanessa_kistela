// Uruchom po dodaniu/usunięciu/zmianie nazwy zdjęć w którymkolwiek folderze z listy FOLDERS:
//   node scripts/generate-photo-manifests.js
// Skanuje każdy z folderów i zapisuje w nim manifest.json z listą zdjęć,
// które strony wczytują dynamicznie przez fetch() — nie trzeba edytować JS.
// Zdjęcia są sortowane po nazwie pliku (kolejność ustalisz prefiksem 01-, 02-, …).
// Podfoldery (np. _ukryte/) są pomijane — to miejsce na zdjęcia, których nie chcesz pokazywać.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const FOLDERS = [
  'contents/logo',               // logo w nawigacji — pierwszy plik
  'contents/carousel',           // karuzela na stronie głównej
  'contents/landing-portfolio',  // podgląd portfolio na stronie głównej
  'contents/opinions',           // zdjęcia opinii — n-te zdjęcie = n-ta opinia w js/index.js
  'contents/photo_of_me',        // „O mnie” i kontakt — pierwszy plik
  'contents/portfolio/biznesowe',
  'contents/portfolio/reportazowe',
  'contents/portfolio/artystyczne',
  'contents/portfolio/rodzinne'
];
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

for (const folder of FOLDERS) {
  const dir = path.join(ROOT, folder);
  fs.mkdirSync(dir, { recursive: true });

  const photos = fs.readdirSync(dir)
    .filter(name => !name.startsWith('.') && IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
    .map(name => `${folder}/${name}`);

  const manifestPath = path.join(dir, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify({ photos }, null, 2) + '\n');
  console.log(`${folder}: ${photos.length} zdjęć -> ${path.relative(ROOT, manifestPath)}`);
}
