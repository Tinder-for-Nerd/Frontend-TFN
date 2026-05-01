const fs = require('fs');
const path = require('path');

function refactorCss(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace import '../../styles/something.css' with import '../../../styles/something.css'
  // Or if it was already modified somehow, make sure it points to src/styles
  content = content.replace(/import '\.\.\/\.\.\/styles\/(.*?)';/g, "import '../../../styles/$1';");
  
  fs.writeFileSync(filePath, content, 'utf8');
}

const publicDir = path.join(__dirname, 'src', 'modules', 'public', 'pages');
fs.readdirSync(publicDir).filter(f => f.endsWith('.jsx')).forEach(file => refactorCss(path.join(publicDir, file)));

const authDir = path.join(__dirname, 'src', 'modules', 'auth', 'pages');
fs.readdirSync(authDir).filter(f => f.endsWith('.jsx')).forEach(file => refactorCss(path.join(authDir, file)));

const dashboardDir = path.join(__dirname, 'src', 'modules', 'dashboard', 'pages');
fs.readdirSync(dashboardDir).filter(f => f.endsWith('.jsx')).forEach(file => refactorCss(path.join(dashboardDir, file)));

console.log('Done refactoring CSS imports.');
