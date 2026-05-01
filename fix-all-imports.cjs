const fs = require('fs');
const path = require('path');

function fixImports(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      fixImports(fullPath);
    } else if (file.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Fix imports based on folder depth
      const depth = fullPath.split(path.sep).length - path.join(__dirname, 'src').split(path.sep).length;
      let prefix = '../'.repeat(depth - 1);
      
      content = content.replace(/from '\.\.\/ui'/g, `from '${prefix}components/ui'`);
      content = content.replace(/from '\.\.\/common'/g, `from '${prefix}components/common'`);
      content = content.replace(/from '\.\.\/layout'/g, `from '${prefix}components/layout'`);
      content = content.replace(/from '\.\.\/\.\.\/ui'/g, `from '${prefix}components/ui'`);
      content = content.replace(/from '\.\.\/\.\.\/common'/g, `from '${prefix}components/common'`);
      content = content.replace(/from '\.\.\/\.\.\/layout'/g, `from '${prefix}components/layout'`);
      
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  });
}

fixImports(path.join(__dirname, 'src', 'modules'));
console.log('Fixed imports in modules');
