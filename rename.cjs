const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('src', function(filePath) {
  if (filePath.endsWith('.jsx') || filePath.endsWith('.js') || filePath.endsWith('.html') || filePath.endsWith('.css')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Replace "ProMatchDarkApp" with "TinderForNerdsApp" to avoid space in identifiers
    content = content.replace(/ProMatchDarkApp/g, 'TinderForNerdsApp');
    
    // Replace "promatch.app" with "tinderfornerds.app"
    content = content.replace(/promatch\.app/g, 'tinderfornerds.app');
    
    // Replace all other occurrences of "ProMatch" with "Tinder for Nerds"
    content = content.replace(/ProMatch/g, 'Tinder for Nerds');
    
    // Replace "promatch" with "tinderfornerds" (in URLs or other lowercase contexts, excluding css classes pm-)
    // We already have "pm-" classes, let's leave them.
    content = content.replace(/promatch-dark/g, 'tinderfornerds-dark');
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated', filePath);
    }
  }
});
