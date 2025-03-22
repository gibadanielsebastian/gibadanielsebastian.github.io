import { instrumentSans } from "@/app/fonts";
import Link from "next/link";

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="w-full py-3 px-4 md:px-8 md:py-2 border-t border-foreground/10">
			<div className="max-w-6xl mx-auto">
				{/* Mobile Layout - Shown on xs screens and hidden on larger screens */}
				<div className="xs:hidden">
					<div className="flex flex-wrap items-center justify-between gap-y-2">
						{/* Left section - Logo and title for mobile */}
						<div className="flex flex-col">
							<span className="font-medium text-base">Giba Daniel</span>
							<span className="text-sm opacity-60">
								Web Developer & Designer
							</span>
						</div>

						{/* Right section - Social icons for mobile */}
						<div className="flex items-center gap-4">
							<Link
								href="https://github.com/gibadanielsebastian"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="GitHub profile"
								className="text-foreground hover:text-primary transition-colors"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="18"
									height="18"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
								</svg>
							</Link>
							<Link
								href="https://linkedin.com/in/"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="LinkedIn profile"
								className="text-foreground hover:text-primary transition-colors"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="18"
									height="18"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
									<rect x="2" y="9" width="4" height="12"></rect>
									<circle cx="4" cy="4" r="2"></circle>
								</svg>
							</Link>
							<Link
								href="mailto:contact@example.com"
								aria-label="Email"
								className="text-foreground hover:text-primary transition-colors"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="18"
									height="18"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
									<polyline points="22,6 12,13 2,6"></polyline>
								</svg>
							</Link>
						</div>
					</div>

					{/* Copyright and links for mobile */}
					<div className="flex flex-col mt-2 pt-2 border-t border-foreground/5 text-xs">
						<p className="opacity-50 mb-2">
							&copy; {currentYear} Giba Daniel. All rights reserved.
						</p>

						<div className="flex gap-4">
							<Link
								href="#"
								className="opacity-50 hover:opacity-100 hover:text-primary transition-all"
							>
								Privacy Policy
							</Link>
							<span className="opacity-30">|</span>
							<Link
								href="#"
								className="opacity-50 hover:opacity-100 hover:text-primary transition-all"
							>
								Terms of Service
							</Link>
						</div>
					</div>
				</div>

				{/* Desktop Layout - Hidden on xs screens and shown on larger screens */}
				<div className="hidden xs:flex xs:justify-between xs:items-center">
					<div className="flex items-center space-x-4">
						<span className="font-medium">Giba Daniel</span>
						<span className="opacity-60">Web Developer & Designer</span>
						<span className="mx-2 opacity-30 text-xs">•</span>
						<span className="text-xs opacity-50">
							&copy; {currentYear} All rights reserved
						</span>
					</div>

					<div className="flex items-center space-x-6">
						<div className="flex space-x-3 border-r pr-4 border-foreground/10">
							<Link
								href="#"
								className="text-xs opacity-50 hover:opacity-100 hover:text-primary transition-all"
							>
								Privacy
							</Link>
							<Link
								href="#"
								className="text-xs opacity-50 hover:opacity-100 hover:text-primary transition-all"
							>
								Terms
							</Link>
						</div>

						<div className="flex items-center space-x-4">
							<Link
								href="https://github.com/gibadanielsebastian"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="GitHub profile"
								className="text-foreground hover:text-primary transition-colors"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="18"
									height="18"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
								</svg>
							</Link>
							<Link
								href="https://linkedin.com/in/"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="LinkedIn profile"
								className="text-foreground hover:text-primary transition-colors"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="18"
									height="18"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
									<rect x="2" y="9" width="4" height="12"></rect>
									<circle cx="4" cy="4" r="2"></circle>
								</svg>
							</Link>
							<Link
								href="mailto:contact@example.com"
								aria-label="Email"
								className="text-foreground hover:text-primary transition-colors"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="18"
									height="18"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
									<polyline points="22,6 12,13 2,6"></polyline>
								</svg>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
