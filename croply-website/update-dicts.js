const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, 'messages');
const files = fs.readdirSync(messagesDir);

const newKeys = {
  "Chatbot": {
    "welcome": "Hello! I am your CroPly AI Assistant. You can ask me about crop diseases, farming techniques, or weather advice.",
    "title": "AI Agronomist",
    "online": "Online and ready to help",
    "placeholder": "Ask about diseases, weather, or farming tips...",
    "error": "Failed to connect to the AI server."
  },
  "DiseaseDetection": {}
};

files.forEach(file => {
  const filePath = path.join(messagesDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  // Merge new keys
  const merged = { ...data, ...newKeys };
  
  fs.writeFileSync(filePath, JSON.stringify(merged, null, 2));
});

console.log('Dictionaries updated successfully.');
