import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GitHubReadmeData, LinkedInCustomData, ReadmeWidget } from '../types';

export type ProfileMode = 'github-readme' | 'linkedin';
export type DashboardType = 'student' | 'professional';

const defaultWidgets: ReadmeWidget[] = [
  { id: 'w1', type: 'about', title: 'About Me', visible: true },
  { id: 'w2', type: 'stats', title: 'Coding Stats', visible: true },
  { id: 'w3', type: 'skills', title: 'Skills & Tech Stack', visible: true },
  { id: 'w4', type: 'projects', title: 'Projects', visible: true },
  { id: 'w5', type: 'github', title: 'GitHub Activity', visible: true },
  { id: 'w6', type: 'achievements', title: 'Achievements', visible: true },
  { id: 'w7', type: 'leetcode', title: 'LeetCode Stats', visible: false },
  { id: 'w8', type: 'kaggle', title: 'Kaggle Stats', visible: false },
  { id: 'w9', type: 'certifications', title: 'Certifications', visible: true },
  { id: 'w10', type: 'contributions', title: 'Open Source Contributions', visible: true },
];

const defaultMarkdown = `# Hi there 👋

Welcome to my profile! I'm a passionate developer who loves building cool stuff.

## About Me

I specialize in full-stack development with React, TypeScript, and Node.js.
I'm always eager to learn new technologies and contribute to open source.

## Coding Stats

@[stats]

## Skills

@[skills]

## My Projects

@[projects]

## GitHub Activity

@[github]

## Achievements

@[achievements]

---

*This README was generated with Tinder For Nerds - customize your profile the way you want!*
`;

const defaultGitHubReadme: GitHubReadmeData = {
  markdown: defaultMarkdown,
  widgets: defaultWidgets,
  theme: 0,
};

const defaultLinkedIn: LinkedInCustomData = {
  sections: [
    { id: 's1', type: 'experience', title: 'Experience', visible: true },
    { id: 's2', type: 'education', title: 'Education', visible: true },
    { id: 's3', type: 'skills', title: 'Skills & Endorsements', visible: true },
    { id: 's4', type: 'certifications', title: 'Licenses & Certifications', visible: true },
    { id: 's5', type: 'projects', title: 'Projects', visible: true },
    { id: 's6', type: 'recommendations', title: 'Recommendations', visible: true },
  ],
  bannerColor: 'from-blue-500 via-purple-500 to-pink-500',
  headline: '',
  openToWork: true,
};

interface ProfileState {
  profileMode: ProfileMode;
  dashboardType: DashboardType;
  githubReadme: GitHubReadmeData;
  linkedin: LinkedInCustomData;
  setProfileMode: (mode: ProfileMode) => void;
  setDashboardType: (type: DashboardType) => void;
  toggleProfileMode: () => void;
  setGitHubReadme: (data: GitHubReadmeData) => void;
  setLinkedIn: (data: LinkedInCustomData) => void;
  updateGitHubReadmeMarkdown: (markdown: string) => void;
  toggleWidget: (widgetId: string) => void;
  setTheme: (theme: number) => void;
  toggleLinkedInSection: (sectionId: string) => void;
  setBannerColor: (color: string) => void;
  setOpenToWork: (open: boolean) => void;
  setHeadline: (headline: string) => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      profileMode: 'github-readme',
      dashboardType: 'student',
      githubReadme: defaultGitHubReadme,
      linkedin: defaultLinkedIn,

      setProfileMode: (mode) => set({ profileMode: mode }),
      setDashboardType: (type) => set({ dashboardType: type }),

      toggleProfileMode: () =>
        set({
          profileMode: get().profileMode === 'github-readme' ? 'linkedin' : 'github-readme',
        }),

      setGitHubReadme: (data) => set({ githubReadme: data }),
      setLinkedIn: (data) => set({ linkedin: data }),

      updateGitHubReadmeMarkdown: (markdown) =>
        set({ githubReadme: { ...get().githubReadme, markdown } }),

      toggleWidget: (widgetId) =>
        set({
          githubReadme: {
            ...get().githubReadme,
            widgets: get().githubReadme.widgets.map(w =>
              w.id === widgetId ? { ...w, visible: !w.visible } : w
            ),
          },
        }),

      setTheme: (theme) =>
        set({ githubReadme: { ...get().githubReadme, theme } }),

      toggleLinkedInSection: (sectionId) =>
        set({
          linkedin: {
            ...get().linkedin,
            sections: get().linkedin.sections.map(s =>
              s.id === sectionId ? { ...s, visible: !s.visible } : s
            ),
          },
        }),

      setBannerColor: (bannerColor) =>
        set({ linkedin: { ...get().linkedin, bannerColor } }),

      setOpenToWork: (openToWork) =>
        set({ linkedin: { ...get().linkedin, openToWork } }),

      setHeadline: (headline) =>
        set({ linkedin: { ...get().linkedin, headline } }),
    }),
    { name: 'promatch-profile' }
  )
);
