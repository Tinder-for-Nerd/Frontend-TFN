import { colors, radius, spacing, typography, shadows } from './index.js';

export const tailwindTheme = {
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        'primary-container': colors.primaryContainer,
        surface: colors.surface,
        'surface-low': colors.surfaceLow,
        'surface-high': colors.surfaceHigh,
        'text-primary': colors.textPrimary,
        'text-secondary': colors.textSecondary,
        success: colors.success,
        warning: colors.warning,
        error: colors.error,
      },
      borderRadius: {
        sm: `${radius.sm}px`,
        md: `${radius.md}px`,
        lg: `${radius.lg}px`,
        xl: `${radius.xl}px`,
        full: `${radius.full}px`,
      },
      spacing: Object.fromEntries(
        Object.entries(spacing).map(([key, value]) => [key, `${value}px`]),
      ),
      fontFamily: {
        display: [typography.display, 'sans-serif'],
        body: [typography.body, 'sans-serif'],
        mono: [typography.mono, 'monospace'],
      },
      boxShadow: shadows,
    },
  },
};

export default tailwindTheme;
