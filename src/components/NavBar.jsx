"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { instrumentSans } from "@/app/fonts";
import { motion, AnimatePresence } from "framer-motion";

export default function NavBar() {
	const [activeHash, setActiveHash] = useState("");
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	// Check if on mobile device
	useEffect(() => {
		const checkIsMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		// Set initial value
		checkIsMobile();

		// Add event listener for window resize
		window.addEventListener("resize", checkIsMobile);

		// Cleanup event listener
		return () => window.removeEventListener("resize", checkIsMobile);
	}, []);

	// Listen for hash changes to highlight the active link
	useEffect(() => {
		const updateActiveHash = () => {
			const hash = window.location.hash.substring(1);
			setActiveHash(hash);
		};

		// Set initial value
		updateActiveHash();

		// Listen for changes
		window.addEventListener("hashchange", updateActiveHash);

		return () => {
			window.removeEventListener("hashchange", updateActiveHash);
		};
	}, []);

	// Close menu when a link is clicked or when navigating
	useEffect(() => {
		const closeMenu = () => setIsMenuOpen(false);
		window.addEventListener("hashchange", closeMenu);

		return () => window.removeEventListener("hashchange", closeMenu);
	}, []);

	const NavLinks = [
		{ name: "Home", link: "#", ariaLabel: "Go to home page" },
		{ name: "About", link: "#about", ariaLabel: "Go to about page" },
		{
			name: "Portfolio",
			link: "#portofolio",
			ariaLabel: "Go to portfolio page",
		},
		{ name: "Contact", link: "#contact", ariaLabel: "Go to contact page" },
	];

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-6 px-4 md:px-8 w-full">
			<div className="flex items-center">
				<a
					href="#"
					className={`${instrumentSans.className} text-xl font-bold`}
					aria-label="Giba Daniel Sebastian - Home"
				>
					GD
				</a>
			</div>

			{/* Desktop Navigation */}
			<div className="hidden md:flex md:items-center md:gap-8 lg:gap-16">
				{NavLinks.map((link) => {
					// Get the hash part without the # symbol
					const linkHash = link.link.substring(1);
					// Check if this is the active link
					const isActive =
						linkHash === activeHash || (linkHash === "" && activeHash === "");

					return (
						<a
							key={link.name}
							href={link.link}
							aria-label={link.ariaLabel}
							aria-current={isActive ? "page" : undefined}
							className={`text-lg font-medium transition-colors ${
								instrumentSans.className
							} 
                ${
									isActive
										? "text-primary"
										: "text-foreground hover:text-primary/70"
								}`}
							style={{
								color: isActive ? "var(--primary)" : "var(--foreground)",
							}}
						>
							{link.name}
						</a>
					);
				})}
			</div>

			{/* Mobile Menu Button */}
			<button
				className="md:hidden flex flex-col justify-center items-center w-10 h-10 relative focus:outline-none z-[990]"
				onClick={toggleMenu}
				aria-expanded={isMenuOpen}
				aria-label={isMenuOpen ? "Close menu" : "Open menu"}
			>
				<span
					className={`block w-6 h-0.5 rounded-sm bg-foreground absolute transition-all duration-300 ease-in-out ${
						isMenuOpen ? "rotate-45" : "translate-y-[-4px]"
					}`}
					style={{ backgroundColor: "var(--foreground)" }}
				/>
				<span
					className={`block w-6 h-0.5 rounded-sm bg-foreground absolute transition-all duration-300 ease-in-out ${
						isMenuOpen ? "opacity-0" : "opacity-100"
					}`}
					style={{ backgroundColor: "var(--foreground)" }}
				/>
				<span
					className={`block w-6 h-0.5 rounded-sm bg-foreground absolute transition-all duration-300 ease-in-out ${
						isMenuOpen ? "-rotate-45" : "translate-y-[4px]"
					}`}
					style={{ backgroundColor: "var(--foreground)" }}
				/>
			</button>

			{/* Mobile Menu Overlay */}
			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="fixed inset-0 z-[980] md:hidden"
					>
						<div
							className="absolute inset-0 bg-background"
							style={{ backgroundColor: "var(--background)" }}
							onClick={() => setIsMenuOpen(false)}
						/>
						<motion.nav
							className="absolute inset-0 pt-20 px-8 z-[985] flex flex-col"
							style={{ backgroundColor: "var(--background)" }}
						>
							<div className="flex flex-col gap-6">
								{NavLinks.map((link) => {
									// Get the hash part without the # symbol
									const linkHash = link.link.substring(1);
									// Check if this is the active link
									const isActive =
										linkHash === activeHash ||
										(linkHash === "" && activeHash === "");

									return (
										<a
											key={link.name}
											href={link.link}
											aria-label={link.ariaLabel}
											aria-current={isActive ? "page" : undefined}
											className={`text-xl font-medium ${
												instrumentSans.className
											} transition-colors
                        ${
													isActive
														? "text-primary"
														: "text-foreground hover:text-primary/70"
												}`}
											style={{
												color: isActive
													? "var(--primary)"
													: "var(--foreground)",
											}}
											onClick={() => setIsMenuOpen(false)}
										>
											{link.name}
										</a>
									);
								})}
							</div>

							{/* Mobile menu social links */}
							<div className="mt-auto mb-8">
								<div className="flex items-center gap-6 py-4">
									<a
										href="https://github.com/gibadanielsebastian"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="GitHub profile"
										className="text-foreground hover:text-primary transition-colors"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
										</svg>
									</a>
									<a
										href="https://linkedin.com/in/"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="LinkedIn profile"
										className="text-foreground hover:text-primary transition-colors"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
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
									</a>
								</div>
							</div>
						</motion.nav>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	);
}
