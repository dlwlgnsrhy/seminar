import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Company React Baseline',
  url: 'https://dlwlgnsrhy.github.io',
  baseUrl: '/seminar/docs/',
  onBrokenLinks: 'warn',
  trailingSlash: false,
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.ts'),
        },
        blog: false,
      } satisfies Preset.Options,
    ],
  ],
};
export default config;
