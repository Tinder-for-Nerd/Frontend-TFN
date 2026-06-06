import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { GitBranch, Code2, Star, ExternalLink } from 'lucide-react';
import type { Profile } from '../../types';

interface Props {
  markdown: string;
  profile: Profile;
  isDark: boolean;
}

function StatsWidget({ isDark }: { isDark: boolean }) {
  const stats = [
    { label: 'Commits', value: '2,847', icon: GitBranch },
    { label: 'PRs Merged', value: '456', icon: Code2 },
    { label: 'Repos', value: '89', icon: GitBranch },
    { label: 'Stars', value: '1.2k', icon: Star },
  ];
  return (
    <div className={cn('rounded-xl p-4 my-3', isDark ? 'bg-white/5' : 'bg-gray-50')}>
      <div className="grid grid-cols-2 gap-3">
        {stats.map(stat => (
          <div key={stat.label} className="flex items-center gap-2">
            <stat.icon size={14} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
            <div>
              <p className={cn('text-xs', isDark ? 'text-gray-500' : 'text-gray-400')}>{stat.label}</p>
              <p className={cn('text-lg font-bold', isDark ? 'text-white' : 'text-gray-900')}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsWidget({ profile, isDark }: { profile: Profile; isDark: boolean }) {
  return (
    <div className="flex flex-wrap gap-1.5 my-3">
      {profile.skills.map(s => (
        <span key={s} className={cn('rounded-lg px-2.5 py-1 text-xs font-medium', isDark ? 'bg-white/10 text-gray-300' : 'bg-gray-100 text-gray-700')}>
          {s}
        </span>
      ))}
    </div>
  );
}

function ProjectsWidget({ profile, isDark }: { profile: Profile; isDark: boolean }) {
  return (
    <div className="space-y-2 my-3">
      {profile.projects?.slice(0, 3).map(p => (
        <div key={p.id} className={cn('rounded-xl p-3', isDark ? 'bg-white/5' : 'bg-gray-50')}>
          <div className="flex items-start justify-between">
            <span className={cn('text-sm font-semibold', isDark ? 'text-white' : 'text-gray-900')}>{p.title}</span>
            {p.link && <ExternalLink size={12} className="text-gray-400" />}
          </div>
          <p className={cn('text-xs mt-0.5', isDark ? 'text-gray-400' : 'text-gray-500')}>{p.description}</p>
        </div>
      ))}
    </div>
  );
}

function GitHubWidget({ isDark }: { isDark: boolean }) {
  return (
    <div className="grid grid-cols-7 gap-1 my-3">
      {Array.from({ length: 35 }).map((_, i) => {
        const active = (i * 7 + i * 13 + i * 3) % 10 > 3;
        return (
          <div key={i} className={cn('aspect-square rounded-sm', active ? (isDark ? 'bg-green-500/30' : 'bg-green-400') : (isDark ? 'bg-white/5' : 'bg-gray-100'))} />
        );
      })}
    </div>
  );
}

function AchievementsWidget({ isDark }: { isDark: boolean }) {
  const items = ['🏆 Top Contributor', '⭐ 5x Hackathon Winner', '🎤 Conference Speaker', '📖 Published Author'];
  return (
    <div className="flex flex-wrap gap-2 my-3">
      {items.map(a => (
        <span key={a} className={cn('rounded-lg px-2.5 py-1 text-xs', isDark ? 'bg-white/5 text-gray-300' : 'bg-gray-50 text-gray-700')}>{a}</span>
      ))}
    </div>
  );
}

function renderEmbed(widgetType: string, profile: Profile, isDark: boolean) {
  switch (widgetType) {
    case 'stats': return <StatsWidget isDark={isDark} />;
    case 'skills': return <SkillsWidget profile={profile} isDark={isDark} />;
    case 'projects': return <ProjectsWidget profile={profile} isDark={isDark} />;
    case 'github': return <GitHubWidget isDark={isDark} />;
    case 'achievements': return <AchievementsWidget isDark={isDark} />;
    default: return null;
  }
}

function parseMarkdownLine(line: string, profile: Profile, isDark: boolean): ReactNode[] {
  const parts: ReactNode[] = [];

  const embedRegex = /@\[(\w+)\]/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = embedRegex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      parts.push(line.slice(lastIndex, match.index));
    }
    const widget = renderEmbed(match[1], profile, isDark);
    if (widget) {
      parts.push(widget);
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < line.length) {
    parts.push(line.slice(lastIndex));
  }

  return parts;
}

export default function MarkdownRenderer({ markdown, profile, isDark }: Props) {
  const lines = markdown.split('\n');
  const elements: ReactNode[] = [];
  let inCodeBlock = false;
  let codeContent: string[] = [];

  lines.forEach((line, i) => {
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <pre key={`code-${i}`} className={cn('rounded-xl p-4 my-2 text-xs overflow-x-auto', isDark ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-700')}>
            <code>{codeContent.join('\n')}</code>
          </pre>
        );
        codeContent = [];
      }
      inCodeBlock = !inCodeBlock;
      return;
    }

    if (inCodeBlock) {
      codeContent.push(line);
      return;
    }

    const trimmed = line.trim();

    if (!trimmed) {
      elements.push(<br key={`br-${i}`} />);
      return;
    }

    const parsed = parseMarkdownLine(line, profile, isDark);

    if (trimmed.startsWith('### ')) {
      elements.push(
        <h3 key={`h3-${i}`} className={cn('text-lg font-bold mt-4 mb-2', isDark ? 'text-white' : 'text-gray-900')}>
          {formatInline(trimmed.slice(4), isDark)}
        </h3>
      );
    } else if (trimmed.startsWith('## ')) {
      elements.push(
        <h2 key={`h2-${i}`} className={cn('text-xl font-bold mt-5 mb-2', isDark ? 'text-white' : 'text-gray-900')}>
          {formatInline(trimmed.slice(3), isDark)}
        </h2>
      );
    } else if (trimmed.startsWith('# ')) {
      elements.push(
        <h1 key={`h1-${i}`} className={cn('text-2xl font-bold mt-6 mb-3', isDark ? 'text-white' : 'text-gray-900')}>
          {formatInline(trimmed.slice(2), isDark)}
        </h1>
      );
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      elements.push(
        <li key={`li-${i}`} className={cn('ml-4 text-sm', isDark ? 'text-gray-300' : 'text-gray-600')}>
          {formatInline(trimmed.slice(2), isDark)}
        </li>
      );
    } else if (/^\d+\.\s/.test(trimmed)) {
      elements.push(
        <li key={`oli-${i}`} className={cn('ml-4 text-sm list-decimal', isDark ? 'text-gray-300' : 'text-gray-600')}>
          {formatInline(trimmed.replace(/^\d+\.\s/, ''), isDark)}
        </li>
      );
    } else if (trimmed.startsWith('---') || trimmed.startsWith('***')) {
      elements.push(<hr key={`hr-${i}`} className={cn('my-4 border-t', isDark ? 'border-white/10' : 'border-gray-200')} />);
    } else if (trimmed.startsWith('> ')) {
      elements.push(
        <blockquote key={`bq-${i}`} className={cn('border-l-2 pl-3 my-2 text-sm italic', isDark ? 'border-gray-600 text-gray-400' : 'border-gray-300 text-gray-500')}>
          {formatInline(trimmed.slice(2), isDark)}
        </blockquote>
      );
    } else {
      elements.push(
        <p key={`p-${i}`} className={cn('text-sm leading-relaxed', isDark ? 'text-gray-300' : 'text-gray-600')}>
          {parsed}
        </p>
      );
    }
  });

  return <div className="space-y-0.5">{elements}</div>;
}

function formatInline(text: string, isDark: boolean): ReactNode[] {
  const parts: ReactNode[] = [];
  const regex = /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(`(.+?)`)|(\[(.+?)\]\((.+?)\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[2]) {
      parts.push(<strong key={match.index} className="font-semibold">{match[2]}</strong>);
    } else if (match[4]) {
      parts.push(<em key={match.index}>{match[4]}</em>);
    } else if (match[6]) {
      parts.push(<code key={match.index} className={cn('rounded px-1 py-0.5 text-xs font-mono', isDark ? 'bg-gray-800 text-green-400' : 'bg-gray-100 text-pink-600')}>{match[6]}</code>);
    } else if (match[8] && match[9]) {
      parts.push(
        <a key={match.index} href={match[9]} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          {match[8]}
        </a>
      );
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}
