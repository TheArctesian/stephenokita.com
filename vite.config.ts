import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	// Honour a PORT assigned by the environment (e.g. preview tooling) so the dev
	// server can share a machine with another instance on the default port. Only
	// affects `vite dev`; the built/deployed output is unaffected.
	server: process.env.PORT ? { port: Number(process.env.PORT) } : undefined,
};

export default config;
