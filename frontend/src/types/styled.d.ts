/// <reference types="styled-components/cssprop" />

import {ThemeConfig} from 'theme';
// import original module declarations
import 'styled-components';

// extend styled-components DefaultTheme module declarations
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeConfig {}
}
