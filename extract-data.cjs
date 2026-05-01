const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'src', 'ProMatchDarkApp.jsx');
const dataPath = path.join(__dirname, 'src', 'data', 'mockData.js');

const content = fs.readFileSync(appPath, 'utf8');
const lines = content.split('\n');

const dataLines = lines.slice(24, 609); // Line 25 to 609 (0-indexed: 24 to 609)

const exportedLines = dataLines.map(line => {
  if (line.trim().startsWith('const ')) {
    return 'export ' + line;
  }
  return line;
});

fs.writeFileSync(dataPath, exportedLines.join('\n'), 'utf8');

console.log('Extracted mock data to src/data/mockData.js');
