import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatTime(date: string): string {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function getTimeAgo(timestamp: string): string {
  const now = new Date();
  const date = new Date(timestamp);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(timestamp);
}

export function getMatchColor(score: number): string {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-yellow-600';
  return 'text-gray-500';
}

export function getMatchBgColor(score: number): string {
  if (score >= 80) return 'bg-green-100';
  if (score >= 60) return 'bg-yellow-100';
  return 'bg-gray-100';
}

export function getSessionTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    coffee_chat: 'Coffee Chat',
    mentorship: 'Mentorship',
    resume_review: 'Resume Review',
    mock_interview: 'Mock Interview',
    webinar: 'Webinar',
  };
  return labels[type] || type;
}

export function getEventTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    hackathon: 'Hackathon',
    talk: 'Talk',
    webinar: 'Webinar',
    workshop: 'Workshop',
    networking: 'Networking',
    panel: 'Panel',
  };
  return labels[type] || type;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}
