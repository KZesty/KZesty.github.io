export const THEMES = {
  default: {
    key: 'default',
    name: 'Default',
    background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
    accent: '#6dd5ed',
    overlay: 'none'
  },
  christmas: {
    key: 'christmas',
    name: 'Christmas',
    background: 'linear-gradient(135deg, #0b132b, #1c2541, #3a506b)',
    accent: '#c44536',
    overlay: 'snow'
  },
  valentines: {
    key: 'valentines',
    name: 'Valentine\'s',
    background: 'linear-gradient(135deg, #ff758c, #ff7eb3)',
    accent: '#ffccd5',
    overlay: 'hearts'
  }
};

export function resolveTheme() {
  const params = new URLSearchParams(window.location.search);
  const paramTheme = params.get('theme');
  if (paramTheme && THEMES[paramTheme]) {
    return THEMES[paramTheme];
  }

  const today = new Date();
  const month = today.getMonth() + 1; // 1-indexed
  const day = today.getDate();

  if (month === 12) return THEMES.christmas;
  if (month === 2 && day <= 20) return THEMES.valentines;

  return THEMES.default;
}
