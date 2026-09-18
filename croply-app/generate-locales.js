const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src', 'i18n', 'locales');
fs.mkdirSync(localesDir, { recursive: true });

const langs = ['en', 'hi', 'pa', 'gu', 'mr', 'bn', 'ta', 'te', 'kn', 'ml', 'or', 'as', 'ur', 'sa', 'ne'];

langs.forEach(lang => {
  let content = '{}';
  if (lang === 'en') {
    content = JSON.stringify({ home: { title: 'Welcome to CroPly' } }, null, 2);
  } else if (lang === 'hi') {
    content = JSON.stringify({ home: { title: 'क्रॉपली में आपका स्वागत है' } }, null, 2);
  }
  fs.writeFileSync(path.join(localesDir, `${lang}.json`), content);
});
console.log('Done!');
