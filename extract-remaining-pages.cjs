const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'src', 'ProMatchDarkApp.jsx');
const content = fs.readFileSync(appPath, 'utf8');

const pages = [
  { name: 'SessionsPage', module: 'dashboard' },
  { name: 'EventsPage', module: 'dashboard' },
  { name: 'StudentProgressPage', module: 'student' },
  { name: 'NetworkPage', module: 'pro' },
  { name: 'ProInboxPage', module: 'pro' },
  { name: 'ProCalendarPage', module: 'pro' },
  { name: 'ProAnalyticsPage', module: 'pro' },
  { name: 'ProCompanyPage', module: 'pro' }
];

pages.forEach(page => {
  const regex = new RegExp(`function ${page.name}\\(.*?\\) \\{([\\s\\S]*?)\\n\\}`);
  const match = content.match(regex);
  if (match) {
    const imports = `import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { AppShell } from '../../../components/layout';
import { Button, Badge, Chip, Avatar } from '../../../components/ui';
import { SectionHeader, StatCard, ActivityItem } from '../../../components/common';
import { profiles, availabilityWeeks, events } from '../../../data/mockData';
`;
    
    const code = `${imports}\nexport function ${page.name}() {${match[1]}\n}`;
    const dir = path.join(__dirname, 'src', 'modules', page.module, 'pages');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, `${page.name}.jsx`), code, 'utf8');
    console.log(`Extracted ${page.name}`);
  } else {
    console.log(`Could not find ${page.name}`);
  }
});
