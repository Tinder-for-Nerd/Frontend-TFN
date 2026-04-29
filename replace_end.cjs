const fs = require('fs');
let code = fs.readFileSync('src/ProMatchDarkApp.jsx', 'utf8');

// The file has an unbalanced </div> around line 2193 closing AppShell
// We will replace all occurrences of `</div>\n      </div>\n    </AppShell>\n  );\n}\n\nfunction NetworkPage` 
// with `</div>\n    </AppShell>\n  );\n}\n\nfunction NetworkPage`

const target = '</div>\n      </div>\n    </AppShell>\n  );\n}\n\nfunction NetworkPage';
const replacement = '</div>\n    </AppShell>\n  );\n}\n\nfunction NetworkPage';

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/ProMatchDarkApp.jsx', code);
  console.log('Fixed exactly!');
} else {
  console.log('Target block not matched directly, using regex loop.');
  const lines = code.split('\n');
  let newLines = [];
  let found = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('</AppShell>') && lines[i-1].includes('</div>') && lines[i-2].includes('</div>') && !found) {
       // Remove lines[i-1] (the extra </div>)
       newLines.pop(); // remove the previous </div>
       newLines.push(lines[i]); // push </AppShell>
       found = true;
    } else {
       newLines.push(lines[i]);
    }
  }
  fs.writeFileSync('src/ProMatchDarkApp.jsx', newLines.join('\n'));
}
