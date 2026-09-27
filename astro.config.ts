import { defineConfig, fontProviders } from 'astro/config';
import { satteri, satteriHeadingIdsPlugin } from '@astrojs/markdown-satteri';

import shikiThemeDark from '@shikijs/themes/github-dark';
import shikiThemeLight from '@shikijs/themes/github-light';

import parseCodeblocks from './src/plugins/codeblocks.ts';
import {parseFootnotes, parseFootnoteDefinitions} from './src/plugins/footnotes.ts';
import parseHeadings from './src/plugins/headings.ts';

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
      },
      {
          name: 'Material Symbols Outlined',
          cssVariable: '--font-icons',
          provider: fontProviders.googleicons()
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
          mdastPlugins: [
              parseFootnoteDefinitions(),
              parseFootnotes()
          ],
          hastPlugins: [
              parseCodeblocks(),
              satteriHeadingIdsPlugin(),
              parseHeadings()
          ]
      }),
  },

  integrations: [mdx(), preact()]
});
