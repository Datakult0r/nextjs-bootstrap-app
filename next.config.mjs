import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
	// Use standalone mode for production
	output: 'standalone',
	// Disable static page generation for now
	experimental: {
		// This will make the build process more reliable
		workerThreads: false,
		cpus: 1
	},
	// Disable static page generation for specific routes
	// unstable_excludeFiles: ['src/app/page.tsx'],
	// Add this rewrites section
	async rewrites() {
		return [
			{
				source: '/overview.html',
				destination: '/overview.html'
			},
			{
				source: '/guide.html',
				destination: '/guide.html'
			}
		];
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.pexels.com',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'storage.googleapis.com',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'yxkvxzijwkupwucznpvu.supabase.co',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'img.youtube.com',
				port: '',
			},
			{
				protocol: 'https',
				hostname: '**.ytimg.com',
				port: '',
			},
			{
				protocol: 'https',
				hostname: '**.googleusercontent.com',
				port: '',
			},
		],
		formats: ['image/avif', 'image/webp'],
		dangerouslyAllowSVG: true,
		contentDispositionType: 'attachment',
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: [{ loader: "@svgr/webpack", options: { icon: true } }],
		});
		return config;
	},
};

export default withNextVideo(nextConfig);
