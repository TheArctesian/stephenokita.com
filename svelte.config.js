import preprocess from "svelte-preprocess";
import vercel from "@sveltejs/adapter-vercel";
import { mdsvex, escapeSvelte } from 'mdsvex'
import shiki from 'shiki'

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const highlighter = await shiki.getHighlighter({ theme: 'poimandres' })
			const html = escapeSvelte(highlighter.codeToHtml(code, { lang }))
			return `{@html \`${html}\` }`
		}
	},
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  extensions: [".svelte", ".md"],
   vite: {
      optimizeDeps: {
        include: ['lodash.get', 'lodash.isequal', 'lodash.clonedeep']
      }
    },
  preprocess: [
    preprocess({
      postcss: true,
    }),
    mdsvex(mdsvexOptions),
  ],
  kit: {
    adapter: vercel(),
  },
};

export default config;
