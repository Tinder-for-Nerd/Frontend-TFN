const fs = require('fs');
let code = fs.readFileSync('src/ProMatchDarkApp.jsx', 'utf8');

// Find the Icon component content
const start = code.indexOf('function Icon(');
const end = code.indexOf('default:', start); // Roughly end of switch

if (start !== -1 && end !== -1) {
    let iconBody = code.substring(start, end);
    const lines = iconBody.split('\n');
    const newLines = [];
    const seenCases = new Set();
    let skipping = false;

    for (let i = 0; i < lines.length; i++) {
        const match = lines[i].match(/case\s+'([^']+)'\s*:/);
        if (match) {
            const caseName = match[1];
            if (seenCases.has(caseName)) {
                skipping = true;
                console.log('Skipping duplicate case:', caseName);
            } else {
                seenCases.add(caseName);
                skipping = false;
                newLines.push(lines[i]);
            }
        } else {
            if (!skipping) {
                newLines.push(lines[i]);
            } else {
                // If we are skipping, check if we reached end of case
                if (lines[i].includes(');') || lines[i].includes('break;')) {
                    // skip this line too and stop skipping
                    // but wait, we need to skip the return ( ... );
                    // actually simple skipping until next case or default
                }
            }
        }
    }
    // That logic is a bit flawed. Let's just use a simpler regex approach or manual fix.
}

// Manual fix for the known duplicates
code = code.replace(/case 'logout':[\s\S]*?case 'phone':/, "case 'logout':\n      return (\n        <svg {...common}><path d=\"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4\"/><polyline points=\"16 17 21 12 16 7\"/><line x1=\"21\" y1=\"12\" x2=\"9\" y2=\"12\"/></svg>\n      );\n    case 'phone':");

fs.writeFileSync('src/ProMatchDarkApp.jsx', code);
console.log('Duplicates removed.');
