import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
      textLight: string;
      white: string;
      gray100: string;
      gray200: string;
      gray300: string;
    };
    fonts: {
      body: string;
      heading: string;
    };
    fontSizes: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
      '5xl': string;
    };
    space: {
      [key: string]: string;
    };
    radii: {
      [key: string]: string;
    };
    shadows: {
      [key: string]: string;
    };
    zIndices: {
      [key: string]: number | string;
    };
  }
}
