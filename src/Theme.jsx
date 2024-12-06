import { PabloThemeProvider } from '@bojagi/pablo';

const theme = {
  colors: {
    brand: {
      lightest: '#bcd8f4',
      light: '#74b7f9',
      main: '#007FFF',
      dark: '#00008B',
      darkest: '#131631',
      contrastText: '#ffffff',
      contrastTextLight: '#000000',
    },
    positive: {
      lightest: '#DFF6E6',
      light: '#82eca6',
      main: '#36c463',
      dark: '#108B36',
      darkest: '#0a4d1f',
      contrastText: '#ffffff',
      contrastTextLight: '#000000',
    },
    negative: {
      lightest: '#fc9ea9',
      light: '#fb6072',
      main: '#dc1e34',
      dark: '#9a1727',
      darkest: '#5c1019',
      contrastText: '#ffffff',
      contrastTextLight: '#000000',
    },
    neutral: {
      lightest: '#f0f0f0',
      light: '#d0d0d0',
      main: '#a0a0a0',
      dark: '#606060',
      darkest: '#303030',
      contrastText: '#ffffff',
      contrastTextLight: '#000000',
    },
    background: '#fafafa',
    common: {
      white: '#ffffff',
      black: '#000000',
      whiteContrastText: '#000000',
      blackContrastText: '#ffffff',
    },
    gray: {
      50: '#f0f0f0',
      100: '#e0e0e0',
      200: '#d0d0d0',
      300: '#b0b0b0',
      400: '#a0a0a0',
      500: '#808080',
      600: '#606060',
      700: '#505050',
      800: '#303030',
      900: '#202020',
    },
    blackOpacity: {
      50: 'rgba(0,0,0,0.05)',
      100: 'rgba(0,0,0,0.1)',
      200: 'rgba(0,0,0,0.2)',
      300: 'rgba(0,0,0,0.3)',
      400: 'rgba(0,0,0,0.4)',
      500: 'rgba(0,0,0,0.5)',
      600: 'rgba(0,0,0,0.6)',
      700: 'rgba(0,0,0,0.7)',
      800: 'rgba(0,0,0,0.8)',
      900: 'rgba(0,0,0,0.9)',
    },
    whiteOpacity: {
      50: 'rgba(255,255,255,0.05)',
      100: 'rgba(255,255,255,0.1)',
      200: 'rgba(255,255,255,0.2)',
      300: 'rgba(255,255,255,0.3)',
      400: 'rgba(255,255,255,0.4)',
      500: 'rgba(255,255,255,0.5)',
      600: 'rgba(255,255,255,0.6)',
      700: 'rgba(255,255,255,0.7)',
      800: 'rgba(255,255,255,0.8)',
      900: 'rgba(255,255,255,0.9)',
    },
    borders: {
      main: '#00000040',
      light: '#00000020',
    },
    text: {
      main: '#000000',
      info: '#00000080',
    },
  },
  typography: {
    base: {
      fontFamily: 'Barlow, sans-serif',
      fontWeight: 400,
    },
    paragraph: {
      lineHeight: '1.4em',
      fontSize: '1rem',
      marginBottom: '0.75em',
    },
    paragraphBold: {
      lineHeight: '1.4em',
      fontSize: '1rem',
      marginBottom: '0.75em',
      fontWeight: 500,
    },
    button: {
      lineHeight: '1.29em',
      fontSize: '1rem',
      marginBottom: 0,
    },
    headline: {
      lineHeight: '1.29em',
      fontSize: '1.75rem',
      marginBottom: '0.5em',
    },
    title: {
      lineHeight: '1.3333333em',
      fontSize: '1.5rem',
      marginBottom: '0.5em',
    },
    subtitle: {
      lineHeight: '1.375em',
      fontSize: '1.25rem',
      marginBottom: '0.5em',
    },
    info: {
      lineHeight: '1.5em',
      fontSize: '0.875rem',
      marginBottom: 0,
    },
    infoBold: {
      lineHeight: '1.5em',
      fontSize: '0.875rem',
      marginBottom: 0,
      fontWeight: 500,
    },
  },
  spacing: 8,
  breakpoints: ['700px', '1000px', '1200px', '1920px'],
};

export function ThemeProvider(props) {
  return (
    <PabloThemeProvider theme={theme}>{props.children}</PabloThemeProvider>
  );
}
