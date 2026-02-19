import React from 'react';
import {ThemeProvider} from 'styled-components';
import {hoagieHelperThemeConfig} from 'theme/hoagieHelper.theme';
import {WithChildren} from 'types';

export function CurrentTheme({children}: WithChildren): JSX.Element {
  const themeConfig = hoagieHelperThemeConfig;
  return <ThemeProvider theme={themeConfig}>{children}</ThemeProvider>;
}
