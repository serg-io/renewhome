import * as Theme from './theme.types';
import * as Utils from './utils';

/**********************
 * Theme Info
 **********************/
const THEME_INFO: Theme.Info = {
  themeId: 'hoagieHelperStandard',
  name: 'Hoagie Helper Theme',
};

/**********************
 * Color
 **********************/
const COLOR: Theme.Color = {
  primary: Utils.formatHex('#FF0054', 1),
  secondary: Utils.formatHex('#FF5400', 1),
  tertiary: Utils.formatHex('#390099', 1),
  alert: Utils.formatHex('#ffff00', 1),
  error: Utils.formatHex('#ff0000', 1),
  success: Utils.formatHex('#00ff00', 1),
  grey: Utils.formatHex('#dddddd', 1),
  contentBackground: Utils.formatHex('#FFFFFF', 1),
  pageBackground: Utils.formatHex('#FFBD00', 1),
  buttonColor: Utils.formatHex('#FF0054', 1),
  buttonBackground: Utils.formatHex('#FF5400', 1),
};

/**********************
 * Text
 **********************/
const TEXT: Theme.Text = {
  fontFamily:
    // eslint-disable-next-line max-len
    "'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', sans-serif",
  color: Utils.formatHex('#000000', 1),
  contrastColor: Utils.formatHex('#FFFFFF', 1),
};

/**********************
 * Standard Theme Styles
 **********************/
const STANDARD: Theme.Standard = {
  border: `1px solid ${COLOR.grey}`,
  borderRadius: '12px',
  boxShadow: `0 4px 6px 0 ${Utils.formatHex('#000000', 0.4)}`,
};

/**********************
 * Final Theme Config
 **********************/
export const hoagieHelperThemeConfig: Theme.ThemeConfig = {
  ...THEME_INFO,
  color: COLOR,
  text: TEXT,
  standard: STANDARD,
};
