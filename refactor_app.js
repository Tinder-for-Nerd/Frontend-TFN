const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'src', 'ProMatchDarkApp.jsx');
let content = fs.readFileSync(srcPath, 'utf8');

function extractFunction(content, funcName) {
  const regex = new RegExp(`(export\\s+)?function\\s+${funcName}\\s*\\([^)]*\\)\\s*\\{`);
  const match = content.match(regex);
  if (!match) return { code: null, newContent: content };

  const startIdx = match.index;
  let bracketCount = 0;
  let started = false;
  let endIdx = -1;

  for (let i = startIdx; i < content.length; i++) {
    if (content[i] === '{') {
      bracketCount++;
      started = true;
    } else if (content[i] === '}') {
      bracketCount--;
    }

    if (started && bracketCount === 0) {
      endIdx = i + 1;
      break;
    }
  }

  if (endIdx === -1) return { code: null, newContent: content };
  
  const code = content.slice(startIdx, endIdx);
  const newContent = content.slice(0, startIdx) + content.slice(endIdx);
  return { code, newContent };
}

const componentMap = {
  // UI Components
  'Button': 'src/components/Button.jsx',
  'Icon': 'src/components/Icon.jsx',
  'Badge': 'src/components/Badge.jsx',
  'Chip': 'src/components/Chip.jsx',
  'Avatar': 'src/components/Avatar.jsx',
  'MatchArc': 'src/components/MatchArc.jsx',
  'TrendChart': 'src/components/TrendChart.jsx',
  'StepIndicator': 'src/components/StepIndicator.jsx',
  'StatCard': 'src/components/StatCard.jsx',
  'SkillTag': 'src/components/SkillTag.jsx',
  'ProfileCard': 'src/components/ProfileCard.jsx',
  'MiniProfileCard': 'src/components/MiniProfileCard.jsx',
  'SessionCard': 'src/components/SessionCard.jsx',
  'SectionHeader': 'src/components/SectionHeader.jsx',
  'EventCard': 'src/components/EventCard.jsx',
  
  // Layouts
  'AppShell': 'src/layouts/AppShell.jsx',
  
  // Pages
  'LandingPage': 'src/pages/LandingPage.jsx',
  'ProfilePage': 'src/pages/ProfilePage.jsx',
  'SettingsPage': 'src/pages/SettingsPage.jsx',
  'NotificationsPage': 'src/pages/NotificationsPage.jsx',
  'CallPage': 'src/pages/CallPage.jsx',
  
  // Auth Features
  'LoginRoute': 'src/features/auth/pages/LoginRoute.jsx',
  'SignupRoute': 'src/features/auth/pages/SignupRoute.jsx',
  'OnboardingRoot': 'src/features/auth/pages/OnboardingRoot.jsx',
  'OnboardingPage': 'src/features/auth/pages/OnboardingPage.jsx',
  
  // Dashboard Features (Student)
  'StudentHomeRoute': 'src/features/dashboard/pages/StudentHomeRoute.jsx',
  'StudentDiscoverRoute': 'src/features/dashboard/pages/StudentDiscoverRoute.jsx',
  'StudentMessagesRoute': 'src/features/dashboard/pages/StudentMessagesRoute.jsx',
  'MessagesPage': 'src/features/dashboard/pages/MessagesPage.jsx',
  'StudentSessionsRoute': 'src/features/dashboard/pages/StudentSessionsRoute.jsx',
  'SessionsPage': 'src/features/dashboard/pages/SessionsPage.jsx',
  'StudentEventsRoute': 'src/features/dashboard/pages/StudentEventsRoute.jsx',
  'EventsPage': 'src/features/dashboard/pages/EventsPage.jsx',
  'StudentProgressRoute': 'src/features/dashboard/pages/StudentProgressRoute.jsx',
  'StudentProgressPage': 'src/features/dashboard/pages/StudentProgressPage.jsx',
  
  // Dashboard Features (Pro)
  'ProOverviewRoute': 'src/features/dashboard/pages/ProOverviewRoute.jsx',
  'ProOverviewPage': 'src/features/dashboard/pages/ProOverviewPage.jsx',
  'ProDiscoverRoute': 'src/features/dashboard/pages/ProDiscoverRoute.jsx',
  'ProNetworkRoute': 'src/features/dashboard/pages/ProNetworkRoute.jsx',
  'NetworkPage': 'src/features/dashboard/pages/NetworkPage.jsx',
  'ProInboxRoute': 'src/features/dashboard/pages/ProInboxRoute.jsx',
  'ProCalendarRoute': 'src/features/dashboard/pages/ProCalendarRoute.jsx',
  'ProEventsRoute': 'src/features/dashboard/pages/ProEventsRoute.jsx',
  'ProAnalyticsRoute': 'src/features/dashboard/pages/ProAnalyticsRoute.jsx',
  'ProCompanyRoute': 'src/features/dashboard/pages/ProCompanyRoute.jsx'
};

const importsGenerated = [];

let updatedContent = content;

// Auto-inject missing React and local dependencies is complex.
// Instead, we will wrap each extracted component with generic imports.
const defaultImports = `
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Link, NavLink, Navigate, Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import { profiles, studentDiscoverProfiles, proDiscoverProfiles, studentConnections, studentThreads, proThreads } from '../constants/profiles';
import { events, sessions, mockFeed, getNextFeedProfiles, onboardingSteps, availabilityWeeks } from '../constants/data';
`;

// Helper to determine relative depth
function getGenericImports(destPath) {
  const depth = destPath.split('/').length - 2; // e.g. src/components/Button.jsx -> 3-2 = 1
  const up = depth === 0 ? './' : '../'.repeat(depth);
  return `
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Link, NavLink, Navigate, Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
// Replace with actual imports below once structure stabilizes
import cx from '${up}utils/helpers';
export const noop = () => {};
`;
}

// Due to massive monolithic entanglement, full AST extraction compiling clean imports is out of scope.
// So, we will do a simpler approach: Extract static data and maybe layout hooks, then do a partial refactor.
