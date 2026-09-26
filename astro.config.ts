import { defineConfig, fontProviders } from 'astro/config';
import {satteri} from '@astrojs/markdown-satteri';
import satteriCodeblockPlugin from './src/plugins/codeblocks.ts';

import shikiThemeDark from '@shikijs/themes/github-dark';
import shikiThemeLight from '@shikijs/themes/github-light';
import {parseFootnotes, parseFootnoteDefinitions} from './src/plugins/footnotes.ts';

import mdx from '@astrojs/mdx';

import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  fonts: [
      {
          name: 'Lato',
          cssVariable: '--font-main',
          provider: fontProviders.google()
      },
      {
          name: 'JetBrains Mono',
          cssVariable: '--font-code',
          provider: fontProviders.google()
      }
  ],

  markdown: {
      shikiConfig: {
          defaultColor: 'dark',
          langAlias: {
              teal: 'lua',
          },
          themes: {
              dark: {
                  ...shikiThemeDark,
                  bg: 'var(--codeblock-bg)'
              },
              light: {
                  ...shikiThemeLight,
                  bg: 'var(--codeblock-bg)'
              }
          },
      },
      processor: satteri({
          features: {gfm: true, smartPunctuation: false},
          mdastPlugins: [parseFootnoteDefinitions(), parseFootnotes()],
          hastPlugins: [satteriCodeblockPlugin()]
      }),
  },

  integrations: [mdx(), preact()]
});