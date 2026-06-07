import { useEffect } from 'react';

export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    let prevMeta: HTMLMetaElement | null = null;
    if (description) {
      prevMeta = document.querySelector('meta[name="description"]');
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }

    return () => {
      document.title = prevTitle;
      if (description && prevMeta) {
        document.head.removeChild(document.querySelector('meta[name="description"]')!);
        document.head.appendChild(prevMeta);
      }
    };
  }, [title, description]);
}
