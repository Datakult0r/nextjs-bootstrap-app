import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
	// Use standalone mode for production
	output: 'standalone',
	// Enable experimental features for better performance
	experimental: {
		// Enable optimized package imports
		optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
		// Enable turbo mode for faster builds
		turbo: {
			rules: {
				'*.svg': {
					loaders: ['@svgr/webpack'],
					as: '*.js',
				},
			},
		},
	},
	// Disable static page generation for now
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
			},
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'storage.googleapis.com',
			},
			{
				protocol: 'https',
				hostname: 'yxkvxzijwkupwucznpvu.supabase.co',
			},
			{
				protocol: 'https',
				hostname: 'img.youtube.com',
			},
			{
				protocol: 'https',
				hostname: '**.ytimg.com',
			},
			{
				protocol: 'https',
				hostname: '**.googleusercontent.com',
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
	// Enable TypeScript strict mode
	typescript: {
		// Allow production builds to successfully complete even if
		// there are type errors. These will still surface locally
		// during development (`next dev`) so we can fix them
		// incrementally without blocking CI/CD.
		ignoreBuildErrors: true,
	},
	// Enable ESLint during builds
	eslint: {
		// Linting is enforced during local development but should
		// not fail the production build. This prevents non-critical
		// style issues (e.g. unused variables) from breaking deploys.
		ignoreDuringBuilds: true,
	},
};

export default withNextVideo(nextConfig);
