import { instrumentSans } from "@/app/fonts";
import PathHandler from "@/components/PathHandler";
import "./globals.css";

export const metadata = {
	title: "Giba Daniel | Web Developer & Designer",
	description:
		"Personal portfolio and website showcasing web development and design projects by Giba Daniel Sebastian.",
	keywords:
		"web development, frontend developer, UI/UX designer, portfolio, Giba Daniel",
	authors: [{ name: "Giba Daniel" }],
	creator: "Giba Daniel",
	publisher: "Giba Daniel",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase: new URL("https://gibadaniel.me"),
	alternates: {
		canonical: "/",
	},
	openGraph: {
		title: "Giba Daniel | Web Developer & Designer",
		description:
			"Personal portfolio and website showcasing web development and design projects by Giba Daniel Sebastian.",
		url: "https://gibadaniel.me",
		siteName: "Giba Daniel",
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Giba Daniel | Web Developer & Designer",
		description:
			"Personal portfolio and website showcasing web development and design projects by Giba Daniel Sebastian.",
		creator: "@GibaDaniel",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className="scroll-smooth">
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
				<meta name="theme-color" content="#62ff00" />
			</head>
			<body className={`relative min-h-screen ${instrumentSans.variable}`}>
				<PathHandler />
				{children}
			</body>
		</html>
	);
}
