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
    }

  h1, h2, h3 {
    text-transform: uppercase;
    margin: 0;
  }
`;

export const VARIANTS = {
  work: {
    color: 'var(--workPrimary)',
    bgColor: 'var(--workSecondary)',
  },
  rest: {
    color: 'var(--restPrimary)',
    bgColor: 'var(--restSecondary)',
  },
  start: {
    color: 'var(--inactivePrimary)',
    bgColor: 'var(--inactiveSecondary)',
  },
  end: {
    color: 'var(--inactivePrimary)',
    bgColor: 'var(--inactiveSecondary)',
  },
  roundReset: {
    color: 'var(--inactivePrimary)',
    bgColor: 'var(--inactiveSecondary)',
  },
};
