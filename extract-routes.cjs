const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'src', 'ProMatchDarkApp.jsx');
const content = fs.readFileSync(appPath, 'utf8');

const routeFunctions = content.match(/function [a-zA-Z]+Route\(\) \{[\s\S]*?\n\}/g);

if (routeFunctions) {
  fs.writeFileSync(path.join(__dirname, 'src', 'data', 'extractedRoutes.js'), routeFunctions.join('\n\n'), 'utf8');
  console.log(`Extracted ${routeFunctions.length} route functions`);
} else {
  console.log('No route functions found');
}
