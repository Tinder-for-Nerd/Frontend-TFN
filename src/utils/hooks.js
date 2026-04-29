import { useEffect, useLayoutEffect } from 'react';

export function useLightThemeClass() {
  useLayoutEffect(() => {
    document.body.classList.add('pm-light-theme');
    return () => document.body.classList.remove('pm-light-theme');
  }, []);
}

export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title;

    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', description);
    }

    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', '#f8f4ec');
    }
  }, [description, title]);
}
