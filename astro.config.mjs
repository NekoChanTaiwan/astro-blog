import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import solidJs from '@astrojs/solid-js'
import mdx from '@astrojs/mdx'
import image from '@astrojs/image'
import compress from 'astro-compress'
import m2dx from 'astro-m2dx'
import remarkToc from 'remark-toc'
import remarkReadingTime from './src/plugins/remark-reading-time'
import rehypeTwemoji from './src/plugins/rehype-twemoji'

// https://astro-m2dx.netlify.app/
/** @type {import('astro-m2dx').Options} */
const m2dxOptions = {
  frontmatter: true,
  exportComponents: true,
  autoImports: true,
  relativeImages: true,
}

/** @type {import('@astrojs/mdx').MdxOptions} */
const mdxOptions = {
  remarkPlugins: [[m2dx, m2dxOptions], remarkToc, remarkReadingTime],
  rehypePlugins: [rehypeTwemoji],
  extendPlugins: 'astroDefaults', // remark-gfm, remark-smartypants
}

/** @type {import('@astrojs/image').IntegrationOptions} */
const imageOptions = {
  serviceEntryPoint: '@astrojs/image/sharp',
}

/** @type {import('astro-compress/dist/options').Options} */
const compressOptions = {
  img: {
    webp: false,
  },
}

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), solidJs(), mdx(mdxOptions), image(imageOptions), compress(compressOptions)],
  markdown: {
    drafts: true,
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'one-dark-pro',
    },
  },
})
