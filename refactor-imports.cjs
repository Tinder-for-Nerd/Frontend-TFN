const fs = require('fs');
const path = require('path');

function refactorFile(filePath, depth) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  const uiRegex = /from '\.\.\/ui'/g;
  const commonRegex = /from '\.\.\/common'/g;
  const stylesRegex = /from '\.\.\/\.\.\/styles\/(.*?)'/g;

  let uiReplacement = 'from \'';
  let commonReplacement = 'from \'';
  let stylesReplacement = 'from \'';

  for (let i = 0; i < depth; i++) {
    uiReplacement += '../';
    commonReplacement += '../';
    stylesReplacement += '../';
  }
  uiReplacement += 'components/ui\'';
  commonReplacement += 'components/common\'';
  stylesReplacement += 'styles/$1\'';

  content = content.replace(uiRegex, uiReplacement);
  content = content.replace(commonRegex, commonReplacement);
  content = content.replace(stylesRegex, stylesReplacement);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Refactored ${filePath}`);
}

const publicDir = path.join(__dirname, 'src', 'modules', 'public', 'pages');
fs.readdirSync(publicDir).forEach(file => refactorFile(path.join(publicDir, file), 3));

const authDir = path.join(__dirname, 'src', 'modules', 'auth', 'pages');
fs.readdirSync(authDir).forEach(file => refactorFile(path.join(authDir, file), 3));

const dashboardDir = path.join(__dirname, 'src', 'modules', 'dashboard', 'pages');
fs.readdirSync(dashboardDir).forEach(file => refactorFile(path.join(dashboardDir, file), 3));

console.log('Done refactoring imports in moved files.');
