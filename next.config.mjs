/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	compress: true,
	swcMinify: true,

	// Image optimization
	images: {
		unoptimized: true, // Required for static export
	},

	// Enable static exports for GitHub Pages
	output: "export",

	// Disable the Next.js server during static export
	distDir: "out",

	// Asset prefix for GitHub Pages
	assetPrefix: process.env.NODE_ENV === "production" ? "/" : "",

	// Webpack optimization
	webpack: (config, { dev, isServer }) => {
		// Split chunks for better caching
		if (!dev && !isServer) {
			config.optimization.splitChunks = {
				chunks: "all",
				maxInitialRequests: 25,
				minSize: 20000,
			};
		}

		return config;
	},
};

export default nextConfig;
