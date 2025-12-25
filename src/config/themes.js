import { withBasePath } from '../utils/assets';

const christmasBackdrop = [
  'radial-gradient(90px 90px at 16% 12%, rgba(230, 57, 70, 0.3), transparent 58%)',
  'radial-gradient(110px 110px at 78% 40%, rgba(233, 241, 210, 0.22), transparent 62%)',
  'linear-gradient(180deg, #0f2d11 0%, #1f5224 38%, #0f2d11 62%, #7b1212 100%)'
].join(',');

const defaultGradient = 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)';
const valentinesGradient = 'linear-gradient(135deg, #ff758c, #ff7eb3)';

export const THEMES = {
  default: {
    key: 'default',
    name: 'Default',
    backgroundImage: defaultGradient,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundAttachment: 'fixed',
    accent: '#6dd5ed',
    overlay: 'none'
  },
  christmas: {
    key: 'christmas',
    name: 'Christmas',
    backgroundImage: `${christmasBackdrop}, url(${withBasePath('photos/aurora.svg')})`,
    backgroundSize: '100% 700px, cover',
    backgroundRepeat: 'repeat-y',
    backgroundPosition: 'center top, center center',
    backgroundAttachment: 'scroll',
    accent: '#e63946',
    overlay: 'snow'
  },
  valentines: {
    key: 'valentines',
    name: "Valentine's",
    backgroundImage: valentinesGradient,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundAttachment: 'fixed',
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
