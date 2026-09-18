const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, 'messages');
fs.mkdirSync(messagesDir, { recursive: true });

const langs = ['en', 'hi', 'pa', 'gu', 'mr', 'bn', 'ta', 'te', 'kn', 'ml', 'or', 'as', 'ur', 'sa', 'ne'];

langs.forEach(lang => {
  let content = '{}';
  if (lang === 'en') {
    content = JSON.stringify({ HomePage: { title: 'CroPly' } }, null, 2);
  } else if (lang === 'hi') {
    content = JSON.stringify({ HomePage: { title: 'क्रॉपली' } }, null, 2);
  }
  fs.writeFileSync(path.join(messagesDir, `${lang}.json`), content);
});
console.log('Generated messages successfully!');
