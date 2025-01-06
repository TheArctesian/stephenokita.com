/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'fira': ['Fira Code', 'monospace'],
      },
      colors: {
        'd': {
          'bg': '#282A36',
          'fg': '#F8F8F2',
          'comment': '#6272A4',
          'selection': '#44475A',
          'cyan': '#8BE9FD',
          'green': '#50FA7B',
          'orange': '#FFB86C',
          'pink': '#FF79C6',
          'purple': '#BD93F9',
          'red': '#FF5555',
          'yellow': '#F1FA8C',
        }
      }
    },
  },
  plugins: []
};
