const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'src', 'ProMatchDarkApp.jsx');
const content = fs.readFileSync(appPath, 'utf8');

const match = content.match(/function DiscoverPage\(\{ variant \}\) \{([\s\S]*?)\n\}/);

if (match) {
  const code = `import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { InstagramReelsFeed } from '../../common/InstagramReelsFeed';
import { Button, Badge } from '../../ui';
import { studentDiscoverProfiles, proDiscoverProfiles } from '../../../data/mockData';

export function DiscoverPage({ variant }) {${match[1]}
}`;
  fs.writeFileSync(path.join(__dirname, 'src', 'modules', 'dashboard', 'pages', 'DiscoverPage.jsx'), code, 'utf8');
  console.log('Extracted DiscoverPage');
} else {
  console.log('Could not find DiscoverPage');
}
