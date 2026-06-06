import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { useProfileStore } from '../store/profileStore';
import { mockProfiles } from '../data/mockData';
import PortfolioProfilePage from './PortfolioProfilePage';
import {
  Briefcase, MapPin, Calendar, Link as LinkIcon,
  Star, ExternalLink, Edit3, Award, GraduationCap,
  BookOpen, Code2, ThumbsUp, Users, Check, X,
  Plus, Eye, EyeOff, Palette, GripVertical,
} from 'lucide-react';
import { cn } from '../lib/utils';
import type { LinkedInSection } from '../types';

const bannerColors = [
  { name: 'Default', gradient: 'from-blue-500 via-purple-500 to-pink-500' },
  { name: 'Ocean', gradient: 'from-cyan-500 to-blue-600' },
  { name: 'Sunset', gradient: 'from-orange-500 to-rose-600' },
  { name: 'Forest', gradient: 'from-green-500 to-emerald-600' },
  { name: 'Midnight', gradient: 'from-slate-700 to-slate-900' },
  { name: 'Lavender', gradient: 'from-purple-500 to-indigo-600' },
];

const sectionIcons: Record<string, typeof Briefcase> = {
  experience: Briefcase,
  education: GraduationCap,
  skills: Code2,
  certifications: Award,
  projects: BookOpen,
  recommendations: ThumbsUp,
};

function LinkedInProfile() {
  const { user } = useAuthStore();
  const profile = user ? mockProfiles[user.id] : null;
  const {
    linkedin, setLinkedIn,
    toggleLinkedInSection, setBannerColor,
    setOpenToWork, setHeadline,
  } = useProfileStore();

  const [editMode, setEditMode] = useState(false);
  const [activeSection, setActiveSection] = useState(linkedin.sections.find(s => s.visible)?.id || 'experience');
  const [addSectionOpen, setAddSectionOpen] = useState(false);

  if (!profile) return null;

  const visibleSections = linkedin.sections.filter(s => s.visible);

  const moveSection = (id: string, direction: 'up' | 'down') => {
    const idx = linkedin.sections.findIndex(s => s.id === id);
    if (idx === -1) return;
    const newSections = [...linkedin.sections];
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= newSections.length) return;
    [newSections[idx], newSections[targetIdx]] = [newSections[targetIdx], newSections[idx]];
    setLinkedIn({ ...linkedin, sections: newSections });
  };

  const addSection = (type: LinkedInSection['type']) => {
    const id = `s-${linkedin.sections.length + 1}`;
    const label = type.charAt(0).toUpperCase() + type.slice(1);
    setLinkedIn({
      ...linkedin,
      sections: [...linkedin.sections, { id, type, title: label, visible: true }],
    });
    setAddSectionOpen(false);
  };

  const removeSection = (id: string) => {
    setLinkedIn({
      ...linkedin,
      sections: linkedin.sections.filter(s => s.id !== id),
    });
  };

  const updateSectionTitle = (id: string, title: string) => {
    setLinkedIn({
      ...linkedin,
      sections: linkedin.sections.map(s => s.id === id ? { ...s, title } : s),
    });
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <div className={cn('h-32 bg-gradient-to-r', linkedin.bannerColor)} />
        <div className="relative px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-12">
            <div className="flex items-end gap-4">
              <div className="h-24 w-24 overflow-hidden rounded-2xl border-4 border-white bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-white">
                  {profile.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
              </div>
              <div className="mt-14 sm:mt-0">
                {editMode ? (
                  <input
                    value={linkedin.headline || `${profile.title} at ${profile.company}`}
                    onChange={(e) => setHeadline(e.target.value)}
                    className="text-sm font-medium text-gray-600 bg-gray-50 rounded-lg px-2 py-1 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    placeholder="Your professional headline"
                  />
                ) : (
                  <>
                    <h1 className="text-xl font-bold text-gray-900">{profile.name}</h1>
                    <p className="text-sm text-gray-500">{linkedin.headline || `${profile.title} at ${profile.company}`}</p>
                  </>
                )}
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><MapPin size={12} />{profile.location}</span>
                  <span className="flex items-center gap-1"><Users size={12} />{profile.stats.connections} connections</span>
                </div>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 flex gap-2">
              {editMode ? (
                <button
                  onClick={() => setEditMode(false)}
                  className="rounded-xl bg-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-emerald-600 transition-all flex items-center gap-1.5"
                >
                  <Check size={16} /> Done
                </button>
              ) : (
                <button
                  onClick={() => setEditMode(true)}
                  className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-1.5"
                >
                  <Edit3 size={16} /> Customize
                </button>
              )}
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-gray-600">{profile.bio}</p>

          <div className="mt-4 flex items-center gap-4">
            {[
              { icon: Users, label: `${profile.stats.connections} connections` },
              { icon: Star, label: `${profile.rating} rating` },
              { icon: Calendar, label: `${profile.experience} years exp` },
            ].map(item => (
              <span key={item.label} className="flex items-center gap-1.5 text-xs text-gray-500">
                <item.icon size={14} className="text-gray-400" />
                {item.label}
              </span>
            ))}
          </div>

          {profile.socialLinks && profile.socialLinks.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {profile.socialLinks.map(link => (
                <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-200 transition-colors">
                  <LinkIcon size={14} />
                  {link.platform}
                  <ExternalLink size={10} />
                </a>
              ))}
            </div>
          )}

          {linkedin.openToWork && !editMode && (
            <div className="mt-3">
              <button className="rounded-xl bg-blue-500 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-600 transition-all">
                #OpenToWork
              </button>
            </div>
          )}
        </div>
      </div>

      {editMode && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
        >
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Palette size={16} /> Profile Customization
          </h3>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-2">Banner Color</label>
              <div className="flex gap-2">
                {bannerColors.map(c => (
                  <button
                    key={c.name}
                    onClick={() => setBannerColor(c.gradient)}
                    className={cn('h-8 w-8 rounded-full bg-gradient-to-r', c.gradient, linkedin.bannerColor === c.gradient ? 'ring-2 ring-offset-2 ring-blue-500' : '')}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="openToWork"
                checked={linkedin.openToWork}
                onChange={(e) => setOpenToWork(e.target.checked)}
                className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
              <label htmlFor="openToWork" className="text-sm text-gray-700">Show #OpenToWork</label>
            </div>
          </div>

          <h3 className="text-sm font-semibold text-gray-900 mt-6 mb-3">Sections</h3>
          <div className="space-y-2">
            {linkedin.sections.map((section, idx) => (
              <div key={section.id} className="flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2.5">
                <GripVertical size={14} className="text-gray-400 cursor-grab" />
                <div className="flex-1 flex items-center gap-2">
                  <button
                    onClick={() => {
                      toggleLinkedInSection(section.id);
                      if (section.visible && activeSection === section.id) {
                        const next = linkedin.sections.find(s => s.id !== section.id && s.visible);
                        if (next) setActiveSection(next.id);
                      }
                    }}
                    className={cn('p-1 rounded-lg transition-colors', section.visible ? 'text-blue-500 hover:bg-blue-50' : 'text-gray-400 hover:bg-gray-100')}
                  >
                    {section.visible ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                  {editMode ? (
                    <input
                      value={section.title}
                      onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                      className="text-sm text-gray-700 bg-transparent border-none focus:outline-none focus:ring-0 flex-1"
                    />
                  ) : (
                    <span className="text-sm text-gray-700">{section.title}</span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveSection(section.id, 'up')}
                    disabled={idx === 0}
                    className={cn('p-1 rounded-lg hover:bg-gray-200 transition-colors', idx === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500')}
                  >
                    <svg width={14} height={14} className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m18 15-6-6-6 6"/></svg>
                  </button>
                  <button
                    onClick={() => moveSection(section.id, 'down')}
                    disabled={idx === linkedin.sections.length - 1}
                    className={cn('p-1 rounded-lg hover:bg-gray-200 transition-colors', idx === linkedin.sections.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500')}
                  >
                    <svg width={14} height={14} className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
                  </button>
                  <button
                    onClick={() => removeSection(section.id)}
                    className="p-1 rounded-lg text-red-400 hover:bg-red-50 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setAddSectionOpen(!addSectionOpen)}
            className="mt-3 flex items-center gap-1.5 text-sm font-medium text-blue-500 hover:text-blue-700 transition-colors"
          >
            <Plus size={14} /> Add Section
          </button>

          <AnimatePresence>
            {addSectionOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-2 flex flex-wrap gap-2"
              >
                {['experience', 'education', 'skills', 'certifications', 'projects', 'recommendations', 'custom'].map(type => (
                  <button
                    key={type}
                    onClick={() => addSection(type as LinkedInSection['type'])}
                    className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    + {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      <div className="mt-4 flex gap-1 rounded-2xl border border-gray-100 bg-white p-1 shadow-sm overflow-x-auto">
        {visibleSections.map(s => {
          const Icon = sectionIcons[s.type] || BookOpen;
          return (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={cn(
                'flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all shrink-0',
                activeSection === s.id ? 'bg-blue-500 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <Icon size={16} />
              <span className="hidden sm:inline">{s.title}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 space-y-4">
        {activeSection === 'experience' && linkedin.sections.find(s => s.id === 'experience')?.visible && (
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Experience</h3>
            <div className="space-y-4">
              {[
                { role: 'Senior Product Designer', company: 'DesignLabs Inc.', period: '2024 - Present', desc: 'Leading design system strategy for B2B SaaS platform with 200K+ users.' },
                { role: 'Product Designer', company: 'TechCorp', period: '2022 - 2024', desc: 'Designed and shipped 15+ major features. Improved NPS by 25%.' },
                { role: 'Junior Designer', company: 'StartupXYZ', period: '2020 - 2022', desc: 'Started career designing mobile-first experiences.' },
              ].map(exp => (
                <div key={exp.role} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 font-bold text-xs">
                    {exp.company.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">{exp.role}</h4>
                    <p className="text-xs text-gray-500">{exp.company} &middot; {exp.period}</p>
                    <p className="mt-1 text-xs text-gray-600">{exp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'education' && linkedin.sections.find(s => s.id === 'education')?.visible && (
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Education</h3>
            {profile.education && (
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 font-bold text-xs">
                  U
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">{profile.education}</h4>
                  <p className="text-xs text-gray-500">Graduated 2020</p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeSection === 'skills' && linkedin.sections.find(s => s.id === 'skills')?.visible && (
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Skills & Endorsements</h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map(skill => (
                <div key={skill} className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2">
                  <span className="text-sm text-gray-700">{skill}</span>
                  <span className="text-xs text-gray-400">12</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'certifications' && linkedin.sections.find(s => s.id === 'certifications')?.visible && (
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Licenses & Certifications</h3>
            {['AWS Solutions Architect', 'Google Cloud Professional', 'Meta Frontend Developer'].map(cert => (
              <div key={cert} className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-50 text-lg">
                  🏅
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">{cert}</h4>
                  <p className="text-xs text-gray-500">Issued Jun 2025 &middot; No Expiry</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'projects' && linkedin.sections.find(s => s.id === 'projects')?.visible && (
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Projects</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {profile.projects?.map(project => (
                <div key={project.id} className="rounded-xl border border-gray-100 p-4 hover:border-gray-200 transition-colors">
                  <h4 className="text-sm font-semibold text-gray-900">{project.title}</h4>
                  <p className="mt-1 text-xs text-gray-500">{project.description}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {project.technologies.map(t => (
                      <span key={t} className="rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">{t}</span>
                    ))}
                  </div>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-blue-500 hover:text-blue-700">
                      <ExternalLink size={12} /> View
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'recommendations' && linkedin.sections.find(s => s.id === 'recommendations')?.visible && (
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Recommendations</h3>
            <div className="space-y-3">
              {profile.reviews.map(review => (
                <div key={review.id} className="rounded-xl bg-gray-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-gray-400 to-gray-500" />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">{review.userName}</h4>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={12} className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">&ldquo;{review.text}&rdquo;</p>
                  <p className="mt-1 text-xs text-gray-400">{review.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {linkedin.sections.find(s => s.id === activeSection && s.type === 'custom') && (
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              {linkedin.sections.find(s => s.id === activeSection)?.title || 'Custom Section'}
            </h3>
            <p className="text-sm text-gray-500 italic">Add your custom content here...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { profileMode, setProfileMode } = useProfileStore();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-sm text-gray-500">Choose your profile style and customize it</p>
        </div>
        <div className="flex items-center gap-1 rounded-2xl border border-gray-200 bg-gray-50 p-1">
          <button
            onClick={() => setProfileMode('github-readme')}
            className={cn(
              'flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all',
              profileMode === 'github-readme'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            <Code2 size={16} />
            <span className="hidden sm:inline">GitHub README</span>
          </button>
          <button
            onClick={() => setProfileMode('linkedin')}
            className={cn(
              'flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all',
              profileMode === 'linkedin'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            <Briefcase size={16} />
            <span className="hidden sm:inline">LinkedIn Profile</span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {profileMode === 'github-readme' ? (
          <motion.div
            key="github-readme"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <PortfolioProfilePage />
          </motion.div>
        ) : (
          <motion.div
            key="linkedin"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <LinkedInProfile />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
