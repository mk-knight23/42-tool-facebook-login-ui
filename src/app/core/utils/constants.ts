export const STORAGE_KEYS = {
  SETTINGS: 'fb-clone-settings',
  STATS: 'fb-clone-stats',
} as const;

export const KEYBOARD_SHORTCUTS = [
  { key: 'Ctrl + S', action: 'Save' },
  { key: 'Escape', action: 'Close Settings' },
  { key: 'H', action: 'Toggle Help' },
  { key: '?', action: 'Show Shortcuts' },
] as const;
