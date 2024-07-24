// src/theme.d.ts
import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      primary: string;
      secondary: string;
      text: string;
      background: string;
      accent: string;
      cardBackground: string;
      cardText: string;
      buttonBackground: string;
      buttonText: string;
    };
    fonts: {
      body: string;
    };
    space: number[];
    sizes: {
      container: number;
    };
  }
}
