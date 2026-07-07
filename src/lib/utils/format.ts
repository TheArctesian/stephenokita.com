// Formatting utilities following Unix philosophy: simple, single-purpose functions
import type { LocaleCode } from '$lib/stores/locale';

export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateShort = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatRelativeTime = (
  date: string | Date,
  locale: LocaleCode = 'en-GB'
): string => {
  const d = new Date(date);
  const now = new Date();
  const diffInMs = now.getTime() - d.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const zh = locale.startsWith('zh');
  const hant = locale === 'zh-Hant';

  if (diffInDays === 0) return zh ? '今天' : 'Today';
  if (diffInDays === 1) return zh ? '昨天' : 'Yesterday';
  if (diffInDays < 7) return zh ? `${diffInDays} 天前` : `${diffInDays} days ago`;
  if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return zh ? `${weeks} ${hant ? '週前' : '周前'}` : `${weeks} weeks ago`;
  }
  if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return zh ? `${months} ${hant ? '個月前' : '个月前'}` : `${months} months ago`;
  }
  const years = Math.floor(diffInDays / 365);
  return zh ? `${years} 年前` : `${years} years ago`;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const capitalizeWords = (text: string): string => {
  return text
    .split(' ')
    .map(word => capitalize(word))
    .join(' ');
};

export const formatTechStack = (technologies: string[]): string => {
  if (technologies.length === 0) return '';
  if (technologies.length === 1) return technologies[0];
  if (technologies.length === 2) return technologies.join(' & ');
  
  const last = technologies[technologies.length - 1];
  const rest = technologies.slice(0, -1);
  return `${rest.join(', ')} & ${last}`;
};

export const extractDomain = (url: string): string => {
  try {
    const domain = new URL(url).hostname;
    return domain.replace(/^www\./, '');
  } catch {
    return url;
  }
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};