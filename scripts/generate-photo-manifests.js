// Uruchom po dodaniu/usunięciu zdjęć w portfolio/<kategoria>/:
//   node scripts/generate-photo-manifests.js
// Skanuje każdy folder kategorii i zapisuje w nim manifest.json z listą zdjęć,
// które strony wczytują dynamicznie przez fetch() — nie trzeba edytować JS.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CATEGORIES = ['biznesowe', 'reportazowe', 'artystyczne', 'rodzinne'];
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

for (const category of CATEGORIES) {
  const dir = path.join(ROOT, 'portfolio', category);
  fs.mkdirSync(dir, { recursive: true });

  const photos = fs.readdirSync(dir)
    .filter(name => !name.startsWith('.') && IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
    .map(name => `portfolio/${category}/${name}`);

  const manifestPath = path.join(dir, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify({ photos }, null, 2) + '\n');
  console.log(`${category}: ${photos.length} zdjęć -> ${path.relative(ROOT, manifestPath)}`);
}
