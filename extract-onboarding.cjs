const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'src', 'ProMatchDarkApp.jsx');
const content = fs.readFileSync(appPath, 'utf8');

const match = content.match(/function OnboardingPage\(\) \{([\s\S]*?)\n\}/);

if (match) {
  const code = `import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { cx } from '../../../utils/helpers';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { Button, Avatar, Chip, Icon } from '../../ui';
import { Brand, SectionHeader } from '../../common';
import { onboardingSteps, skillTags, domainTags, intentTags, workStyleTags, commitmentTags, socialTypes } from '../../../data/mockData';

export function OnboardingPage() {${match[1]}
}`;
  fs.writeFileSync(path.join(__dirname, 'src', 'modules', 'onboarding', 'pages', 'OnboardingPage.jsx'), code, 'utf8');
  console.log('Extracted OnboardingPage');
} else {
  console.log('Could not find OnboardingPage');
}
