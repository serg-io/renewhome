import {Expand} from 'types';

/**********************
 * Theme Info
 **********************/
export type Info = {
  themeId: string;
  name: string;
};

/**********************
 * Color
 **********************/
export type Color = {
  primary: string;
  secondary: string;
  tertiary: string;
  alert: string;
  error: string;
  success: string;
  grey: string;
  contentBackground: string;
  pageBackground: string;
  buttonColor: string;
  buttonBackground: string;
};
/**********************
 * Text
 **********************/
/** All text styles */
export type Text = {
  fontFamily: string;
  color: string;
  contrastColor: string;
};

/**********************
 * Standard Theme Styles
 **********************/
export type Standard = {
  border: string;
  borderRadius: string;
  boxShadow: string;
};

/**********************
 * Final Theme Config
 **********************/
/** All theme properties in a theme config */
export type ThemeConfig = Expand<
  Info & {
    color: Color;
    text: Text;
    standard: Standard;
  }
>;
