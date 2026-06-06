import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { useProfileStore } from '../store/profileStore';
import { mockProfiles } from '../data/mockData';
import MarkdownRenderer from '../components/profile/MarkdownRenderer';
import {
  Code2, Check, Pencil, Plus, Eye, EyeOff,
} from 'lucide-react';
import { cn } from '../lib/utils';

const themeColors = [
  { name: 'Default', bg: 'from-gray-900 to-gray-800', text: 'text-white', accent: 'bg-blue-500', card: 'bg-gray-800/50' },
  { name: 'Ocean', bg: 'from-blue-900 to-blue-800', text: 'text-white', accent: 'bg-cyan-400', card: 'bg-blue-800/50' },
  { name: 'Forest', bg: 'from-green-900 to-green-800', text: 'text-white', accent: 'bg-emerald-400', card: 'bg-green-800/50' },
  { name: 'Sunset', bg: 'from-orange-900 to-rose-800', text: 'text-white', accent: 'bg-yellow-400', card: 'bg-orange-800/50' },
  { name: 'Light', bg: 'from-gray-50 to-white', text: 'text-gray-900', accent: 'bg-blue-500', card: 'bg-white' },
];

const embedHelp = [
  { syntax: '@[stats]', label: 'Coding Stats' },
  { syntax: '@[skills]', label: 'Skills' },
  { syntax: '@[projects]', label: 'Projects' },
  { syntax: '@[github]', label: 'GitHub Activity' },
  { syntax: '@[achievements]', label: 'Achievements' },
];

export default function PortfolioProfilePage() {
  const { user } = useAuthStore();
  const profile = user ? mockProfiles[user.id] : null;
  const {
    githubReadme, setTheme, toggleWidget,
    updateGitHubReadmeMarkdown,
  } = useProfileStore();

  const [editMode, setEditMode] = useState(false);
  const [showWidgetPicker, setShowWidgetPicker] = useState(false);

  if (!profile) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-gray-400">Profile not found</p>
      </div>
    );
  }

  const theme = themeColors[githubReadme.theme];
  const isDark = githubReadme.theme < 4;

  const insertEmbed = (syntax: string) => {
    updateGitHubReadmeMarkdown(githubReadme.markdown + `\n\n${syntax}\n`);
  };

  return (
    <div className={cn('min-h-screen transition-colors duration-500', theme.bg)}>
      <div className="mx-auto max-w-4xl px-4 py-6">
        <div className="mb-6 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            {editMode ? (
              <>
                <button
                  onClick={() => setEditMode(false)}
                  className={cn('flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all', isDark ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100')}
                >
                  <Check size={16} /> Done Editing
                </button>
                <button
                  onClick={() => setShowWidgetPicker(!showWidgetPicker)}
                  className={cn('flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium', isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')}
                >
                  <Plus size={16} /> Widgets
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className={cn('flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all', isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')}
              >
                <Pencil size={16} /> Edit README
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {themeColors.map((t, i) => (
              <button
                key={t.name}
                onClick={() => setTheme(i)}
                className={cn('h-6 w-6 rounded-full', t.bg.split(' ')[0], githubReadme.theme === i ? 'ring-2 ring-offset-2 ring-blue-500' : '')}
                title={t.name}
              />
            ))}
          </div>
        </div>

        <AnimatePresence>
          {showWidgetPicker && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={cn('mb-6 rounded-2xl border p-4', isDark ? 'bg-gray-800 border-white/10' : 'bg-white border-gray-200 shadow-sm')}
            >
              <h3 className={cn('text-sm font-semibold mb-3', isDark ? 'text-white' : 'text-gray-900')}>Toggle Widgets</h3>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {githubReadme.widgets.map(w => (
                  <button
                    key={w.id}
                    onClick={() => toggleWidget(w.id)}
                    className={cn('flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-all', w.visible
                      ? (isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-50 text-blue-700')
                      : (isDark ? 'bg-white/5 text-gray-500' : 'bg-gray-100 text-gray-500')
                    )}
                  >
                    {w.visible ? <Eye size={14} /> : <EyeOff size={14} />}
                    {w.title}
                  </button>
                ))}
              </div>

              <h3 className={cn('text-sm font-semibold mt-4 mb-2', isDark ? 'text-white' : 'text-gray-900')}>Quick Insert</h3>
              <div className="flex flex-wrap gap-2">
                {embedHelp.map(e => (
                  <button
                    key={e.syntax}
                    onClick={() => insertEmbed(e.syntax)}
                    className={cn('flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-mono', isDark ? 'bg-white/10 text-gray-300 hover:bg-white/20' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')}
                  >
                    <Plus size={12} /> {e.syntax}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {editMode ? (
          <div className={cn('rounded-2xl border overflow-hidden', isDark ? 'border-white/10' : 'border-gray-200 shadow-sm')}>
            <div className={cn('flex items-center justify-between px-4 py-2.5 border-b', isDark ? 'bg-gray-900 border-white/10' : 'bg-gray-50 border-gray-200')}>
              <div className="flex items-center gap-2">
                <Code2 size={14} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                <span className={cn('text-xs font-medium', isDark ? 'text-gray-400' : 'text-gray-500')}>README.md</span>
              </div>
              <span className={cn('text-[10px]', isDark ? 'text-gray-500' : 'text-gray-400')}>Markdown supported</span>
            </div>
            <textarea
              value={githubReadme.markdown}
              onChange={(e) => updateGitHubReadmeMarkdown(e.target.value)}
              className={cn(
                'w-full min-h-[400px] resize-y border-0 p-4 text-sm font-mono leading-relaxed focus:outline-none focus:ring-0',
                isDark ? 'bg-gray-950 text-gray-200 placeholder:text-gray-600' : 'bg-white text-gray-800 placeholder:text-gray-400'
              )}
              placeholder="Write your GitHub-style README here..."
              spellCheck={false}
            />
          </div>
        ) : (
          <div className={cn('rounded-2xl border overflow-hidden', isDark ? 'bg-gray-900/50 border-white/10 backdrop-blur-sm' : 'bg-white border-gray-200 shadow-sm')}>
            <div className={cn('flex items-center gap-2 px-4 py-2.5 border-b', isDark ? 'border-white/10' : 'border-gray-200')}>
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <span className={cn('text-xs ml-2', isDark ? 'text-gray-500' : 'text-gray-400')}>README.md</span>
            </div>
            <div className="p-6">
              <MarkdownRenderer
                markdown={githubReadme.markdown}
                profile={profile}
                isDark={isDark}
              />
            </div>
          </div>
        )}

        <div className={cn('mt-8 rounded-2xl border p-6 text-center', isDark ? 'border-white/10' : 'border-gray-200')}>
          <p className={cn('text-xs', isDark ? 'text-gray-500' : 'text-gray-400')}>
            GitHub-style README profile &middot; Write markdown, embed widgets, choose your theme
          </p>
        </div>
      </div>
    </div>
  );
}
