const fs = require('fs');
let code = fs.readFileSync('src/ProMatchDarkApp.jsx', 'utf8');

// 1. Remove the "import React from 'react';\n" line at the very top
code = code.replace(/^import React from 'react';\n/, '');

// 2. Remove the duplicate cx at top (the arrow function form)
code = code.replace(/\nconst cx = \(\.\.\.\w+\) => \w+\.filter\(Boolean\)\.join\(' '\);\n/, '\n');

// 3. Remove the duplicate usePageMeta at top (the short version)
code = code.replace(/\nfunction usePageMeta\(title, description\) \{\n  useEffect\(\(\) => \{\n    document\.title = title;\n    const meta = document\.querySelector\('meta\[name="description"\]'\);\n    if \(meta\) meta\.setAttribute\('content', description\);\n  \}, \[title, description\]\);\n\}\n/, '\n');

fs.writeFileSync('src/ProMatchDarkApp.jsx', code);
console.log('Duplicates removed. File size:', code.length);
