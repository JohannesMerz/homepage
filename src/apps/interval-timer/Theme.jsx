/* eslint-disable react-refresh/only-export-components */
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
      /* colors */
      --workPrimary: #1c8339;
      --workSecondary: #9ffe93;
      --restPrimary: #9f1919;
      --restSecondary: #fb8484;
      --inactivePrimary: #766118;
      --inactiveSecondary: #f9dc74;

      /* selected theme */
      --colorPrimary: ${(props) => VARIANTS[props.$variant].colorPrimary};
      --colorSecondary: ${(props) => VARIANTS[props.$variant].colorSecondary};
    }

  h1, h2, h3 {
    text-transform: uppercase;
    margin: 0;
  }

  h1 {
    font-size: 28px;
  }
`;

export const VARIANTS = {
  work: {
    colorPrimary: 'var(--workPrimary)',
    colorSecondary: 'var(--workSecondary)',
  },
  rest: {
    colorPrimary: 'var(--restPrimary)',
    colorSecondary: 'var(--restSecondary)',
  },
  start: {
    colorPrimary: 'var(--inactivePrimary)',
    colorSecondary: 'var(--inactiveSecondary)',
  },
  end: {
    colorPrimary: 'var(--inactivePrimary)',
    colorSecondary: 'var(--inactiveSecondary)',
  },
  roundReset: {
    colorPrimary: 'var(--inactivePrimary)',
    colorSecondary: 'var(--inactiveSecondary)',
  },
};
